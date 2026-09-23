import express from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API route to check if Stripe is configured
app.get('/api/stripe-config-status', (req, res) => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const isConfigured = Boolean(
    secretKey &&
    secretKey.trim().length > 0 &&
    !secretKey.includes('MY_STRIPE') &&
    !secretKey.includes('sk_test_...')
  );

  res.json({
    configured: isConfigured,
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
  });
});

// API route to create a Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { items, customerHandle, currency = 'USD', origin } = req.body;

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (
      !secretKey ||
      secretKey.trim().length === 0 ||
      secretKey.includes('MY_STRIPE') ||
      secretKey === 'sk_test_...'
    ) {
      return res.status(400).json({
        error:
          'Stripe no está configurado en el servidor. Por favor agrega tu STRIPE_SECRET_KEY en el archivo .env.',
        missingKey: true,
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío.' });
    }

    const stripe = new Stripe(secretKey);

    const clientOrigin =
      origin ||
      req.headers.origin ||
      (req.headers.referer ? new URL(req.headers.referer).origin : '') ||
      `http://localhost:${PORT}`;

    // Exchange rate LPS to USD ~ 24.7
    const EXCHANGE_RATE = 24.7;

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item: any) => {
      const itemPriceLps =
        item.isBundle && item.bundleItems
          ? item.bundleItems.reduce((sum: number, b: any) => sum + b.priceLps, 0) * 0.8
          : item.priceLps;

      // Charge in USD (universal compatibility for all Stripe accounts)
      const priceUsd = itemPriceLps / EXCHANGE_RATE;
      const unitAmountCents = Math.max(50, Math.round(priceUsd * 100)); // Minimum Stripe charge is $0.50

      const itemName = item.isBundle
        ? `Paquete Personalizado: ${item.platform}`
        : `${item.platform} - ${item.amount} ${item.service}`;

      const itemDesc = customerHandle
        ? `Cuenta / Enlace de entrega: ${customerHandle}`
        : 'Servicio de Crecimiento SMG';

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: itemName,
            description: itemDesc,
          },
          unit_amount: unitAmountCents,
        },
        quantity: item.quantity || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${clientOrigin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientOrigin}/?payment=cancelled`,
      metadata: {
        customerHandle: customerHandle || '',
        orderCount: items.length.toString(),
      },
    });

    res.json({ url: session.url, id: session.id });
  } catch (error: any) {
    console.error('Error creating Stripe Checkout Session:', error);
    res.status(500).json({
      error: error.message || 'Error al crear la sesión de pago con Stripe.',
    });
  }
});

// Setup Vite middleware in dev or static files in production
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true, hmr: false },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}`);
});

export const AGENCY_CONFIG = {
  name: "SMG - Social Media Growth",
  shortName: "SMG",
  tagline: "Agencia de Crecimiento Digital & Producción Audiovisual",
  phoneDisplay: "+504 3177-0881",
  phoneDigits: "50431770881",
  email: "itsmeserrano18@gmail.com",
  instagramUrl: "https://www.instagram.com/crecimientoenredes._/",
  locationDisplay: "Tegucigalpa, Honduras",
  exchangeRateUsdToLps: 24.70,

  // Bank accounts (placeholders preserved, ready with copyable data)
  bankAccounts: {
    bac: {
      bankName: "BAC Credomatic",
      accountNumber: "123456789",
      accountType: "Cuenta de Cheques / Ahorro (LPS)",
      beneficiary: "Social Media Growth",
      rtn: "0801199012345"
    },
    atlantida: {
      bankName: "Banco Atlántida",
      accountNumber: "987654321",
      accountType: "Cuenta de Ahorro (LPS)",
      beneficiary: "Social Media Growth",
      rtn: "0801199012345"
    },
    tengo: {
      platform: "Tengo",
      code: "12345",
      phone: "+504 3177-0881",
      instructions: "Paga en cualquier Punto Tengo o en la App Tengo usando el código 12345 o nuestro número de teléfono."
    },
    tigoMoney: {
      platform: "Tigo Money",
      phone: "+504 9999-9999",
      phoneDigits: "50499999999",
      feePercent: 6,
      instructions: "Envía el monto por billetera Tigo Money (+6% de comisión incluido)."
    }
  }
};

export function buildWhatsAppOrderUrl(params: {
  customerHandle?: string;
  items: Array<{
    platform: string;
    service: string;
    amount: string;
    priceLps: number;
    quantity: number;
    isBundle?: boolean;
    bundleItems?: any[];
  }>;
  totalLps: number;
  totalUsd: number;
  paymentMethodName?: string;
  lang?: 'es' | 'en';
}) {
  const isEs = params.lang !== 'en';

  const greeting = isEs
    ? "¡Hola SMG! 👋 Deseo confirmar mi pedido desde la página web:"
    : "Hello SMG! 👋 I'd like to confirm my order from the website:";

  const handleLine = params.customerHandle?.trim()
    ? (isEs ? `🎯 *Cuenta / Enlace:* ${params.customerHandle.trim()}` : `🎯 *Account / Link:* ${params.customerHandle.trim()}`)
    : (isEs ? `🎯 *Cuenta / Enlace:* (Se indicará por este chat)` : `🎯 *Account / Link:* (Will provide in this chat)`);

  const itemsHeader = isEs ? `📦 *Servicios seleccionados:*` : `📦 *Selected Services:*`;
  const itemsText = params.items
    .map((item) => {
      if (item.isBundle && item.bundleItems && item.bundleItems.length > 0) {
        const bundleSubItems = item.bundleItems
          .map((b) => `    ▫️ ${b.amount} ${b.service}`)
          .join("\n");
        const bundlePrice = (item.priceLps * 0.8 * item.quantity).toLocaleString();
        return `  • ${item.platform} - Paquete Especial (-20% OFF) (L ${bundlePrice}):\n${bundleSubItems}`;
      }
      const itemPrice = (item.priceLps * item.quantity).toLocaleString();
      return `  • ${item.platform} - ${item.amount} ${item.service} (L ${itemPrice})`;
    })
    .join("\n");

  const paymentLine = params.paymentMethodName?.trim()
    ? (isEs ? `💳 *Método de Pago:* ${params.paymentMethodName.trim()}` : `💳 *Payment Method:* ${params.paymentMethodName.trim()}`)
    : (isEs ? `💳 *Pago / Coordinación:* Directo por WhatsApp` : `💳 *Payment / Coordination:* Direct via WhatsApp`);

  const totalLine = isEs
    ? `💰 *Total:* L ${Math.round(params.totalLps).toLocaleString()} (~$${params.totalUsd.toFixed(2)} USD)`
    : `💰 *Total:* L ${Math.round(params.totalLps).toLocaleString()} (~$${params.totalUsd.toFixed(2)} USD)`;

  const closing = isEs
    ? "¿Me podrían confirmar para realizar el pago o verificar mi comprobante? ¡Muchas gracias!"
    : "Could you confirm so I can proceed with payment and send my receipt? Thank you!";

  const message = `${greeting}\n\n${handleLine}\n\n${itemsHeader}\n${itemsText}\n\n${paymentLine}\n${totalLine}\n\n${closing}`;

  return `https://api.whatsapp.com/send/?phone=${AGENCY_CONFIG.phoneDigits}&text=${encodeURIComponent(message)}`;
}

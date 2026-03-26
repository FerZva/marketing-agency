import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { useCart } from '@/src/contexts/CartContext';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { EXCHANGE_RATE_USD_TO_LPS } from '@/src/lib/pricingData';
import { toast } from 'sonner';

export function CartModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, totalLps, currency, setCurrency, clearCart } = useCart();
  const { t } = useLanguage();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const formatPrice = (lps: number) => {
    if (currency === 'USD') {
      return `$${(lps / EXCHANGE_RATE_USD_TO_LPS).toFixed(2)}`;
    }
    return `L ${lps.toLocaleString()}`;
  };

  const paymentMethods = [
    { id: 'stripe', label: t.cart.creditCard },
    { id: 'bac', label: t.cart.bankTransferBAC },
    { id: 'atlantida', label: t.cart.bankTransferAtlantida },
    { id: 'tengo', label: t.cart.tengo },
    { id: 'tigo_money', label: t.cart.tigoMoney },
  ];

  const handleCheckout = () => {
    if (checkoutStep === 'cart') {
      setCheckoutStep('checkout');
    } else {
      if (!paymentMethod) {
        toast.error(t.cart.selectPayment);
        return;
      }
      // Process checkout
      const selectedMethod = paymentMethods.find(m => m.id === paymentMethod);
      toast.success(`${t.cart.orderSuccess}${selectedMethod?.label || paymentMethod}!`);
      clearCart();
      onClose();
      setCheckoutStep('cart');
    }
  };

  const getFinalTotal = () => {
    let total = totalLps;
    if (paymentMethod === 'tigo_money') {
      total = total * 1.06; // 6% commission
    }
    return total;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-bold text-zinc-900">
                  {checkoutStep === 'cart' ? t.cart.title : t.cart.checkout}
                </h2>
              </div>
              <button onClick={onClose} className="p-2 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-4">
                  <ShoppingCart className="w-16 h-16 opacity-20" />
                  <p>{t.cart.empty}</p>
                  <Button variant="outline" onClick={onClose}>{t.cart.continueShopping}</Button>
                </div>
              ) : checkoutStep === 'cart' ? (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-zinc-100 rounded-xl bg-white shadow-sm">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-zinc-900">{item.platform}</h3>
                          <button onClick={() => removeItem(item.id)} className="text-zinc-400 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-zinc-600 mb-2">
                          {item.isBundle ? (
                            <div className="flex flex-col gap-1 mt-1">
                              {item.bundleItems?.map((bItem, idx) => (
                                <span key={idx} className="text-xs bg-zinc-100 px-2 py-1 rounded-md">
                                  {bItem.amount} {bItem.service}
                                </span>
                              ))}
                            </div>
                          ) : (
                            `${item.amount} ${item.service}`
                          )}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-medium text-zinc-500">
                            {item.quantity > 1 ? `Qty: ${item.quantity}` : ''}
                          </span>
                          <span className="font-bold text-violet-600">
                            {formatPrice(item.priceLps * item.quantity * (item.isBundle ? 0.8 : 1))}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-zinc-900 mb-4">{t.cart.paymentMethod}</h3>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <label key={method.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${paymentMethod === method.id ? 'border-violet-500 bg-violet-50' : 'border-zinc-200 hover:border-violet-300'}`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="text-violet-600 focus:ring-violet-500"
                          />
                          <span className="text-sm font-medium text-zinc-900">{method.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {paymentMethod && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-zinc-50 p-4 rounded-xl border border-zinc-200"
                    >
                      <h4 className="font-bold text-zinc-900 mb-2">{t.cart.paymentInstructions}</h4>
                      <p className="text-sm text-zinc-600 mb-4">
                        {paymentMethod === 'stripe' && t.cart.stripeMockMessage}
                        {paymentMethod === 'bac' && t.cart.bacDetails}
                        {paymentMethod === 'atlantida' && t.cart.atlantidaDetails}
                        {paymentMethod === 'tengo' && t.cart.tengoDetails}
                        {paymentMethod === 'tigo_money' && t.cart.tigoMoneyDetails}
                      </p>
                      {paymentMethod !== 'stripe' && (
                        <Button 
                          variant="outline" 
                          className="w-full text-sm"
                          onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                        >
                          {t.cart.confirmWhatsApp}
                        </Button>
                      )}
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t border-zinc-100 bg-zinc-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-600">{t.cart.currency}</span>
                  <div className="flex bg-zinc-200 rounded-lg p-1">
                    <button
                      onClick={() => setCurrency('LPS')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${currency === 'LPS' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
                    >
                      LPS
                    </button>
                    <button
                      onClick={() => setCurrency('USD')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${currency === 'USD' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
                    >
                      USD
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-zinc-600">
                    <span>{t.cart.subtotal}</span>
                    <span>{formatPrice(totalLps)}</span>
                  </div>
                  {paymentMethod === 'tigo_money' && (
                    <div className="flex justify-between text-sm text-orange-600">
                      <span>{t.cart.tigoFee}</span>
                      <span>{formatPrice(totalLps * 0.06)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg text-zinc-900 pt-2 border-t border-zinc-200">
                    <span>{t.cart.total}</span>
                    <span>{formatPrice(getFinalTotal())}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {checkoutStep === 'checkout' && (
                    <Button variant="outline" className="flex-1" onClick={() => setCheckoutStep('cart')}>
                      {t.cart.back}
                    </Button>
                  )}
                  <Button variant="gradient" className="flex-[2]" onClick={handleCheckout}>
                    {checkoutStep === 'cart' 
                      ? t.cart.proceedToCheckout 
                      : paymentMethod === 'stripe' 
                        ? t.cart.payWithStripe 
                        : t.cart.placeOrder}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

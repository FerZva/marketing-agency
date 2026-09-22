import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, Trash2, Copy, Check, ExternalLink, AtSign, MessageCircle } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { useCart } from '@/src/contexts/CartContext';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { EXCHANGE_RATE_USD_TO_LPS } from '@/src/lib/pricingData';
import { AGENCY_CONFIG, buildWhatsAppOrderUrl } from '@/src/lib/constants';
import { toast } from 'sonner';

export function CartModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, totalLps, currency, setCurrency, clearCart } = useCart();
  const { t, language } = useLanguage();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<string>('bac');
  const [customerHandle, setCustomerHandle] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const formatPrice = (lps: number) => {
    if (currency === 'USD') {
      return `$${(lps / EXCHANGE_RATE_USD_TO_LPS).toFixed(2)}`;
    }
    return `L ${Math.round(lps).toLocaleString()}`;
  };

  const paymentMethods = [
    { id: 'bac', label: t.cart.bankTransferBAC },
    { id: 'atlantida', label: t.cart.bankTransferAtlantida },
    { id: 'tengo', label: t.cart.tengo },
    { id: 'tigo_money', label: t.cart.tigoMoney },
    { id: 'stripe', label: t.cart.creditCard },
  ];

  const getFinalTotal = () => {
    let total = totalLps;
    if (paymentMethod === 'tigo_money') {
      total = total * 1.06; // 6% commission
    }
    return total;
  };

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    toast.success(`${t.cart.copied} (${text})`);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const launchWhatsAppOrder = () => {
    const selectedMethod = paymentMethods.find((m) => m.id === paymentMethod);
    const finalLps = getFinalTotal();
    const finalUsd = finalLps / EXCHANGE_RATE_USD_TO_LPS;

    const url = buildWhatsAppOrderUrl({
      customerHandle,
      items,
      totalLps: finalLps,
      totalUsd: finalUsd,
      paymentMethodName: selectedMethod?.label || paymentMethod,
      lang: language as 'es' | 'en',
    });

    window.open(url, '_blank');
  };

  const handleCheckout = () => {
    if (checkoutStep === 'cart') {
      setCheckoutStep('checkout');
      return;
    }

    if (!paymentMethod) {
      toast.error(t.cart.selectPayment);
      return;
    }

    if (paymentMethod === 'stripe') {
      toast.info(t.cart.stripeMockMessage);
      clearCart();
      onClose();
      setCheckoutStep('cart');
      return;
    }

    // Process local payment / bank transfer / WhatsApp dispatch
    launchWhatsAppOrder();
    toast.success(t.cart.orderSuccess);
    clearCart();
    onClose();
    setCheckoutStep('cart');
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
            {/* Header */}
            <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-bold text-zinc-900">
                  {checkoutStep === 'cart' ? t.cart.title : t.cart.checkout}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-4 py-16">
                  <ShoppingCart className="w-16 h-16 opacity-20" />
                  <p className="text-base font-medium">{t.cart.empty}</p>
                  <Button variant="outline" onClick={onClose}>
                    {t.cart.continueShopping}
                  </Button>
                </div>
              ) : checkoutStep === 'cart' ? (
                /* Step 1: Cart Items */
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border border-zinc-200/80 rounded-xl bg-white shadow-sm hover:border-violet-300 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-sm text-zinc-900 tracking-wide uppercase">
                          {item.platform}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-sm text-zinc-700 font-medium">
                        {item.isBundle ? (
                          <div className="flex flex-col gap-1 mt-1">
                            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded w-fit">
                              Bundle -20% OFF
                            </span>
                            {item.bundleItems?.map((bItem, idx) => (
                              <span key={idx} className="text-xs bg-zinc-100 text-zinc-700 px-2 py-1 rounded-md">
                                {bItem.amount} {bItem.service}
                              </span>
                            ))}
                          </div>
                        ) : (
                          `${item.amount} ${item.service}`
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-100">
                        <span className="text-xs text-zinc-500">
                          {item.quantity > 1 ? `Cantidad: ${item.quantity}` : '1 paquete'}
                        </span>
                        <span className="font-bold text-base text-violet-600">
                          {formatPrice(item.priceLps * item.quantity * (item.isBundle ? 0.8 : 1))}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Step 2: Checkout Information */
                <div className="space-y-6">
                  {/* Account / Handle Input */}
                  <div className="bg-violet-50/60 p-4 rounded-xl border border-violet-100">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-violet-950 uppercase tracking-wide mb-1.5">
                      <AtSign className="w-3.5 h-3.5 text-violet-600" />
                      {t.cart.customerHandle}
                    </label>
                    <input
                      type="text"
                      value={customerHandle}
                      onChange={(e) => setCustomerHandle(e.target.value)}
                      placeholder={t.cart.customerHandlePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-zinc-900 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all shadow-sm"
                    />
                    <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
                      {t.cart.customerHandleHint}
                    </p>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider mb-3">
                      {t.cart.paymentMethod}
                    </h3>
                    <div className="space-y-2">
                      {paymentMethods.map((method) => {
                        const isSelected = paymentMethod === method.id;
                        return (
                          <label
                            key={method.id}
                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                              isSelected
                                ? 'border-violet-600 bg-violet-50/50 shadow-sm ring-1 ring-violet-500/20'
                                : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value={method.id}
                                checked={isSelected}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="text-violet-600 focus:ring-violet-500"
                              />
                              <span className="text-sm font-medium text-zinc-900">{method.label}</span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Payment Details & Copy Buttons */}
                  {paymentMethod && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-3"
                    >
                      <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-700">
                        {t.cart.paymentInstructions}
                      </h4>

                      {/* BAC Credomatic */}
                      {paymentMethod === 'bac' && (
                        <div className="space-y-2 text-sm">
                          <p className="text-xs text-zinc-600">
                            Realiza una transferencia bancaria a nuestra cuenta:
                          </p>
                          <div className="bg-white p-3 rounded-lg border border-zinc-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-zinc-500">{t.cart.accountNumberLabel}</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-zinc-900">
                                  {AGENCY_CONFIG.bankAccounts.bac.accountNumber}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(AGENCY_CONFIG.bankAccounts.bac.accountNumber, 'bac')}
                                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md bg-zinc-100 hover:bg-violet-100 hover:text-violet-700 transition-colors"
                                  title={t.cart.copyAccountNumber}
                                >
                                  {copiedField === 'bac' ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span className="text-emerald-600">{t.cart.copied}</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>{t.cart.copyAccountNumber}</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                            <div className="text-xs text-zinc-600 flex justify-between border-t border-zinc-100 pt-1.5">
                              <span>{t.cart.beneficiaryLabel}</span>
                              <span className="font-medium text-zinc-800">
                                {AGENCY_CONFIG.bankAccounts.bac.beneficiary}
                              </span>
                            </div>
                            <div className="text-xs text-zinc-600 flex justify-between">
                              <span>{t.cart.typeLabel}</span>
                              <span className="text-zinc-700">
                                {AGENCY_CONFIG.bankAccounts.bac.accountType}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Banco Atlántida */}
                      {paymentMethod === 'atlantida' && (
                        <div className="space-y-2 text-sm">
                          <p className="text-xs text-zinc-600">
                            Realiza una transferencia bancaria a Banco Atlántida:
                          </p>
                          <div className="bg-white p-3 rounded-lg border border-zinc-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-zinc-500">{t.cart.accountNumberLabel}</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-zinc-900">
                                  {AGENCY_CONFIG.bankAccounts.atlantida.accountNumber}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(AGENCY_CONFIG.bankAccounts.atlantida.accountNumber, 'atlantida')}
                                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md bg-zinc-100 hover:bg-violet-100 hover:text-violet-700 transition-colors"
                                  title={t.cart.copyAccountNumber}
                                >
                                  {copiedField === 'atlantida' ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span className="text-emerald-600">{t.cart.copied}</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>{t.cart.copyAccountNumber}</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                            <div className="text-xs text-zinc-600 flex justify-between border-t border-zinc-100 pt-1.5">
                              <span>{t.cart.beneficiaryLabel}</span>
                              <span className="font-medium text-zinc-800">
                                {AGENCY_CONFIG.bankAccounts.atlantida.beneficiary}
                              </span>
                            </div>
                            <div className="text-xs text-zinc-600 flex justify-between">
                              <span>{t.cart.typeLabel}</span>
                              <span className="text-zinc-700">
                                {AGENCY_CONFIG.bankAccounts.atlantida.accountType}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tengo */}
                      {paymentMethod === 'tengo' && (
                        <div className="space-y-2 text-sm">
                          <p className="text-xs text-zinc-600">
                            {AGENCY_CONFIG.bankAccounts.tengo.instructions}
                          </p>
                          <div className="bg-white p-3 rounded-lg border border-zinc-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-zinc-500">Código Tengo:</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-zinc-900">
                                  {AGENCY_CONFIG.bankAccounts.tengo.code}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(AGENCY_CONFIG.bankAccounts.tengo.code, 'tengo')}
                                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md bg-zinc-100 hover:bg-violet-100 hover:text-violet-700 transition-colors"
                                >
                                  {copiedField === 'tengo' ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                  <span>{copiedField === 'tengo' ? t.cart.copied : t.cart.copyAccountNumber}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tigo Money */}
                      {paymentMethod === 'tigo_money' && (
                        <div className="space-y-2 text-sm">
                          <p className="text-xs text-zinc-600">
                            {AGENCY_CONFIG.bankAccounts.tigoMoney.instructions}
                          </p>
                          <div className="bg-white p-3 rounded-lg border border-zinc-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-zinc-500">Teléfono Tigo Money:</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-zinc-900">
                                  {AGENCY_CONFIG.bankAccounts.tigoMoney.phone}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(AGENCY_CONFIG.bankAccounts.tigoMoney.phone, 'tigo')}
                                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md bg-zinc-100 hover:bg-violet-100 hover:text-violet-700 transition-colors"
                                >
                                  {copiedField === 'tigo' ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                  <span>{copiedField === 'tigo' ? t.cart.copied : t.cart.copyAccountNumber}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Stripe mock */}
                      {paymentMethod === 'stripe' && (
                        <p className="text-xs text-zinc-600 leading-relaxed">
                          {t.cart.stripeMockMessage}
                        </p>
                      )}

                      {/* Instant WhatsApp Dispatch button */}
                      {paymentMethod !== 'stripe' && (
                        <button
                          type="button"
                          onClick={launchWhatsAppOrder}
                          className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 font-semibold text-xs transition-colors border border-[#25D366]/30"
                        >
                          <MessageCircle className="w-4 h-4 text-[#25D366]" />
                          <span>{t.cart.confirmWhatsApp}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                        </button>
                      )}
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Total & Actions Bar */}
            {items.length > 0 && (
              <div className="p-4 border-t border-zinc-100 bg-zinc-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {t.cart.currency}
                  </span>
                  <div className="flex bg-zinc-200 rounded-lg p-1">
                    <button
                      onClick={() => setCurrency('LPS')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        currency === 'LPS'
                          ? 'bg-white shadow-sm text-zinc-900 font-bold'
                          : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      LPS
                    </button>
                    <button
                      onClick={() => setCurrency('USD')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        currency === 'USD'
                          ? 'bg-white shadow-sm text-zinc-900 font-bold'
                          : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      USD
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-sm text-zinc-600">
                    <span>{t.cart.subtotal}</span>
                    <span>{formatPrice(totalLps)}</span>
                  </div>
                  {paymentMethod === 'tigo_money' && checkoutStep === 'checkout' && (
                    <div className="flex justify-between text-sm text-orange-600">
                      <span>{t.cart.tigoFee}</span>
                      <span>{formatPrice(totalLps * 0.06)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg text-zinc-900 pt-2 border-t border-zinc-200">
                    <span>{t.cart.total}</span>
                    <span className="text-violet-600">{formatPrice(getFinalTotal())}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {checkoutStep === 'checkout' && (
                    <Button variant="outline" className="flex-1" onClick={() => setCheckoutStep('cart')}>
                      {t.cart.back}
                    </Button>
                  )}
                  <Button
                    variant="gradient"
                    className="flex-[2] shadow-lg shadow-violet-500/20"
                    onClick={handleCheckout}
                  >
                    {checkoutStep === 'cart'
                      ? t.cart.proceedToCheckout
                      : paymentMethod === 'stripe'
                      ? t.cart.payWithStripe
                      : t.cart.placeOrderWhatsApp}
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

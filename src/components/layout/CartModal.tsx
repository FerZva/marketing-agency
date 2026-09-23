import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingCart,
  X,
  Trash2,
  Copy,
  Check,
  AtSign,
  MessageCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Building2,
  Phone,
  Sparkles,
  ArrowRight
} from 'lucide-react';
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
  const [customerHandle, setCustomerHandle] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showBankReference, setShowBankReference] = useState<boolean>(false);

  const formatPrice = (lps: number) => {
    if (currency === 'USD') {
      return `$${(lps / EXCHANGE_RATE_USD_TO_LPS).toFixed(2)}`;
    }
    return `L ${Math.round(lps).toLocaleString()}`;
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
    const finalLps = totalLps;
    const finalUsd = finalLps / EXCHANGE_RATE_USD_TO_LPS;

    const url = buildWhatsAppOrderUrl({
      customerHandle,
      items,
      totalLps: finalLps,
      totalUsd: finalUsd,
      lang: language as 'es' | 'en',
    });

    window.open(url, '_blank');
    toast.success(t.cart.orderSuccess);
    clearCart();
    onClose();
    setCheckoutStep('cart');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col text-zinc-900"
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-900 leading-tight">
                    {checkoutStep === 'cart' ? t.cart.title : t.cart.checkout}
                  </h2>
                  <span className="text-xs text-zinc-500">
                    {items.length} {items.length === 1 ? 'servicio' : 'servicios'}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-800 rounded-full hover:bg-zinc-200/80 transition-colors"
                aria-label="Cerrar carrito"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-4 py-16 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400">
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-zinc-800">{t.cart.empty}</p>
                    <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                      Explora nuestros paquetes de crecimiento y añade tus servicios preferidos.
                    </p>
                  </div>
                  <Button variant="outline" onClick={onClose} className="mt-2">
                    {t.cart.continueShopping}
                  </Button>
                </div>
              ) : checkoutStep === 'cart' ? (
                /* Step 1: Cart Items */
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border border-zinc-200 rounded-2xl bg-white shadow-xs hover:border-violet-300 transition-all"
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <span className="font-bold text-xs text-zinc-900 tracking-wider uppercase bg-zinc-100 px-2 py-0.5 rounded-md">
                          {item.platform}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                          aria-label="Eliminar servicio"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-sm text-zinc-800 font-medium">
                        {item.isBundle ? (
                          <div className="flex flex-col gap-1.5 mt-1">
                            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded w-fit border border-emerald-200">
                              Bundle -20% OFF
                            </span>
                            {item.bundleItems?.map((bItem, idx) => (
                              <span key={idx} className="text-xs text-zinc-600 pl-2 border-l-2 border-zinc-200">
                                {bItem.amount} {bItem.service}
                              </span>
                            ))}
                          </div>
                        ) : (
                          `${item.amount} ${item.service}`
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-zinc-100">
                        <span className="text-xs text-zinc-500">
                          {item.quantity > 1 ? `Cantidad: ${item.quantity}` : '1 paquete'}
                        </span>
                        <span className="font-bold text-base text-violet-700 font-mono">
                          {formatPrice(item.priceLps * item.quantity * (item.isBundle ? 0.8 : 1))}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Step 2: Checkout & WhatsApp Routing */
                <div className="space-y-5">
                  {/* Account / Handle Input */}
                  <div className="bg-violet-50/70 p-4 rounded-2xl border border-violet-100">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-violet-950 uppercase tracking-wide mb-1.5">
                      <AtSign className="w-3.5 h-3.5 text-violet-600" />
                      {t.cart.customerHandle}
                    </label>
                    <input
                      type="text"
                      value={customerHandle}
                      onChange={(e) => setCustomerHandle(e.target.value)}
                      placeholder={t.cart.customerHandlePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all shadow-xs"
                    />
                    <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
                      {t.cart.customerHandleHint}
                    </p>
                  </div>

                  {/* WhatsApp Direct Routing Banner */}
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-950 space-y-3 shadow-xs">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-zinc-900 leading-tight">
                            {t.cart.whatsAppCheckoutTitle}
                          </h3>
                        </div>
                        <p className="text-xs text-emerald-900/80 mt-1 leading-relaxed">
                          {t.cart.whatsAppCheckoutSubtitle}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-emerald-200/60 space-y-1.5 text-xs text-emerald-900">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{t.cart.whatsAppBullet1}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{t.cart.whatsAppBullet2}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{t.cart.whatsAppBullet3}</span>
                      </div>
                    </div>
                  </div>

                  {/* Collapsible Reference Bank Details */}
                  <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-zinc-50">
                    <button
                      type="button"
                      onClick={() => setShowBankReference(!showBankReference)}
                      className="w-full p-3.5 flex items-center justify-between text-left hover:bg-zinc-100 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Building2 className="w-4 h-4 text-zinc-600" />
                        <div>
                          <span className="text-xs font-bold text-zinc-800 uppercase tracking-wide block">
                            {t.cart.referenceBankAccounts}
                          </span>
                          <span className="text-[11px] text-zinc-500 block">
                            {t.cart.referenceBankAccountsSubtitle}
                          </span>
                        </div>
                      </div>
                      {showBankReference ? (
                        <ChevronUp className="w-4 h-4 text-zinc-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-500" />
                      )}
                    </button>

                    {showBankReference && (
                      <div className="p-3.5 border-t border-zinc-200 space-y-3 bg-white">
                        {/* BAC Credomatic */}
                        <div className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/70 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-zinc-800">BAC Credomatic</span>
                            <button
                              type="button"
                              onClick={() => handleCopy(AGENCY_CONFIG.bankAccounts.bac.accountNumber, 'bac')}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-zinc-700 hover:bg-violet-50 hover:text-violet-700 transition-colors font-medium text-[11px]"
                            >
                              {copiedField === 'bac' ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span className="text-emerald-600">{t.cart.copied}</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>{t.cart.copyAccountNumber}</span>
                                </>
                              )}
                            </button>
                          </div>
                          <div className="font-mono text-zinc-900 font-bold">
                            {AGENCY_CONFIG.bankAccounts.bac.accountNumber}
                          </div>
                          <div className="text-[11px] text-zinc-500">
                            {AGENCY_CONFIG.bankAccounts.bac.beneficiary} · {AGENCY_CONFIG.bankAccounts.bac.accountType}
                          </div>
                        </div>

                        {/* Banco Atlántida */}
                        <div className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/70 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-zinc-800">Banco Atlántida</span>
                            <button
                              type="button"
                              onClick={() => handleCopy(AGENCY_CONFIG.bankAccounts.atlantida.accountNumber, 'atlantida')}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-zinc-700 hover:bg-violet-50 hover:text-violet-700 transition-colors font-medium text-[11px]"
                            >
                              {copiedField === 'atlantida' ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span className="text-emerald-600">{t.cart.copied}</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>{t.cart.copyAccountNumber}</span>
                                </>
                              )}
                            </button>
                          </div>
                          <div className="font-mono text-zinc-900 font-bold">
                            {AGENCY_CONFIG.bankAccounts.atlantida.accountNumber}
                          </div>
                          <div className="text-[11px] text-zinc-500">
                            {AGENCY_CONFIG.bankAccounts.atlantida.beneficiary} · {AGENCY_CONFIG.bankAccounts.atlantida.accountType}
                          </div>
                        </div>

                        {/* Tengo */}
                        <div className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/70 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-zinc-800">Tengo</span>
                            <button
                              type="button"
                              onClick={() => handleCopy(AGENCY_CONFIG.bankAccounts.tengo.code, 'tengo')}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-zinc-700 hover:bg-violet-50 hover:text-violet-700 transition-colors font-medium text-[11px]"
                            >
                              {copiedField === 'tengo' ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span className="text-emerald-600">{t.cart.copied}</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>{t.cart.copyAccountNumber}</span>
                                </>
                              )}
                            </button>
                          </div>
                          <div className="font-mono text-zinc-900 font-bold">
                            Código: {AGENCY_CONFIG.bankAccounts.tengo.code}
                          </div>
                          <div className="text-[11px] text-zinc-500">
                            {AGENCY_CONFIG.bankAccounts.tengo.instructions}
                          </div>
                        </div>

                        {/* Tigo Money */}
                        <div className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/70 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-zinc-800">Tigo Money</span>
                            <button
                              type="button"
                              onClick={() => handleCopy(AGENCY_CONFIG.bankAccounts.tigoMoney.phone, 'tigo')}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-zinc-700 hover:bg-violet-50 hover:text-violet-700 transition-colors font-medium text-[11px]"
                            >
                              {copiedField === 'tigo' ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span className="text-emerald-600">{t.cart.copied}</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>{t.cart.copyAccountNumber}</span>
                                </>
                              )}
                            </button>
                          </div>
                          <div className="font-mono text-zinc-900 font-bold">
                            Tel: {AGENCY_CONFIG.bankAccounts.tigoMoney.phone}
                          </div>
                          <div className="text-[11px] text-zinc-500">
                            {AGENCY_CONFIG.bankAccounts.tigoMoney.instructions}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
                          ? 'bg-white shadow-xs text-zinc-900 font-bold'
                          : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      LPS
                    </button>
                    <button
                      onClick={() => setCurrency('USD')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        currency === 'USD'
                          ? 'bg-white shadow-xs text-zinc-900 font-bold'
                          : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      USD
                    </button>
                  </div>
                </div>

                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-sm text-zinc-600">
                    <span>{t.cart.subtotal}</span>
                    <span className="font-mono">{formatPrice(totalLps)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-zinc-900 pt-2 border-t border-zinc-200">
                    <span>{t.cart.total}</span>
                    <span className="text-violet-600 font-mono">{formatPrice(totalLps)}</span>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  {checkoutStep === 'checkout' ? (
                    <>
                      <Button
                        variant="outline"
                        className="px-4 text-xs font-semibold"
                        onClick={() => setCheckoutStep('cart')}
                      >
                        {t.cart.back}
                      </Button>
                      <button
                        type="button"
                        onClick={launchWhatsAppOrder}
                        className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>{t.cart.placeOrderWhatsApp}</span>
                      </button>
                    </>
                  ) : (
                    <Button
                      variant="gradient"
                      className="w-full py-3 shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2"
                      onClick={() => setCheckoutStep('checkout')}
                    >
                      <span>{t.cart.proceedToCheckout}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

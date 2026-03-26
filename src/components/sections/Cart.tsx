import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useTranslation, formatCurrency } from '../../lib/i18n';
import type { Language, Currency } from '../../lib/i18n';

export const Cart: React.FC<{ lang: Language; currency: Currency }> = ({ lang, currency }) => {
  const t = useTranslation(lang);
  const { items, removeItem, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [isCheckout, setIsCheckout] = useState(false);

  const commissionRate = (paymentMethod === 'tigoMoney' || paymentMethod === 'tengo') ? 0.06 : 0;
  const finalTotal = total * (1 + commissionRate);

  const handleCheckout = () => {
    // Implement actual checkout logic here based on paymentMethod
    alert(`Processing payment of ${formatCurrency(finalTotal, currency)} via ${t(paymentMethod as any)}`);
    clearCart();
    setIsCheckout(false);
  };

  if (items.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        {t('emptyCart')}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto my-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('cart')}</h2>
      
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b dark:border-gray-700 pb-4">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {t(item.platform as any)} - {t(item.service as any)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Qty: {item.quantity} {item.isBundle && '(Bundle)'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(item.price, currency)}
              </span>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      {!isCheckout ? (
        <div>
          <div className="flex justify-between items-center mb-6 text-lg font-bold text-gray-900 dark:text-white">
            <span>{t('total')}:</span>
            <span>{formatCurrency(total, currency)}</span>
          </div>
          <button
            onClick={() => setIsCheckout(true)}
            className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
          >
            {t('checkout')}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white">{t('paymentMethod')}</h3>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="stripe">{t('stripe')}</option>
            <option value="bankTransferBAC">{t('bankTransferBAC')}</option>
            <option value="bankTransferAtlantida">{t('bankTransferAtlantida')}</option>
            <option value="tengo">{t('tengo')}</option>
            <option value="tigoMoney">{t('tigoMoney')}</option>
          </select>

          <div className="flex justify-between items-center pt-4 border-t dark:border-gray-700 text-lg font-bold text-gray-900 dark:text-white">
            <span>{t('total')}:</span>
            <span>{formatCurrency(finalTotal, currency)}</span>
          </div>
          {commissionRate > 0 && (
            <p className="text-sm text-orange-500 text-right">
              Includes 6% commission
            </p>
          )}

          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => setIsCheckout(false)}
              className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
            >
              Back
            </button>
            <button
              onClick={handleCheckout}
              className="flex-1 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {t('pay')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

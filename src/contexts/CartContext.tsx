import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  platform: string;
  service: string;
  amount: string;
  priceLps: number;
  quantity: number;
  isBundle?: boolean;
  bundleItems?: CartItem[];
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalLps: number;
  currency: 'LPS' | 'USD';
  setCurrency: (currency: 'LPS' | 'USD') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('smg_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [currency, setCurrency] = useState<'LPS' | 'USD'>(() => {
    const saved = localStorage.getItem('smg_currency');
    return (saved as 'LPS' | 'USD') || 'LPS';
  });

  useEffect(() => {
    localStorage.setItem('smg_cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('smg_currency', currency);
  }, [currency]);

  const addItem = (item: Omit<CartItem, 'id'>) => {
    setItems(prev => {
      // Check if item already exists
      const existingItemIndex = prev.findIndex(
        i => i.platform === item.platform && i.service === item.service && i.amount === item.amount && i.isBundle === item.isBundle
      );

      if (existingItemIndex >= 0) {
        // Item already exists, do not increase quantity
        return prev;
      }

      return [...prev, { ...item, id: Math.random().toString(36).substring(2, 9) }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalLps = items.reduce((total, item) => {
    if (item.isBundle && item.bundleItems) {
      const bundleTotal = item.bundleItems.reduce((sum, bundleItem) => sum + bundleItem.priceLps, 0);
      return total + (bundleTotal * 0.8 * item.quantity); // 20% discount
    }
    return total + (item.priceLps * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalLps, currency, setCurrency }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

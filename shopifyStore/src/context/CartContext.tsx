import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product, ProductVariant } from '../types/shopify';
import { useStore } from './StoreContext';
import { storage } from '../services/storage';

export interface CartItem {
  id: string; // generated unique line id
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  formattedSubtotal: string;
  isLoading: boolean;
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeFromCart: (variantId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { storeId, config } = useStore();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const cartKey = `@shopify_platform_cart_${storeId}`;

  // 1. Load cart from persistent storage on mount or store change
  useEffect(() => {
    let isMounted = true;
    async function loadCart() {
      setIsLoading(true);
      try {
        const raw = await storage.getItem(cartKey);
        if (raw && isMounted) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setItems(parsed);
          }
        } else if (isMounted) {
          setItems([]);
        }
      } catch {
        if (isMounted) setItems([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadCart();
    return () => {
      isMounted = false;
    };
  }, [cartKey]);

  // 2. Persist cart to storage on change
  const persistCart = useCallback(
    async (newItems: CartItem[]) => {
      try {
        await storage.setItem(cartKey, JSON.stringify(newItems));
      } catch {
        // Safe storage write fallback
      }
    },
    [cartKey]
  );

  const addToCart = (product: Product, variant: ProductVariant, quantity = 1) => {
    if (!variant.availableForSale) {
      return; // Safeguard against adding unavailable variants
    }

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.variant.id === variant.id);
      let updated: CartItem[];
      if (existingIndex > -1) {
        updated = prev.map((item, index) =>
          index === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        const newItem: CartItem = {
          id: `line_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          product,
          variant,
          quantity,
        };
        updated = [...prev, newItem];
      }
      persistCart(updated);
      return updated;
    });
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    setItems((prev) => {
      let updated: CartItem[];
      if (quantity <= 0) {
        updated = prev.filter((item) => item.variant.id !== variantId);
      } else {
        updated = prev.map((item) =>
          item.variant.id === variantId ? { ...item, quantity } : item
        );
      }
      persistCart(updated);
      return updated;
    });
  };

  const removeFromCart = (variantId: string) => {
    setItems((prev) => {
      const updated = prev.filter((item) => item.variant.id !== variantId);
      persistCart(updated);
      return updated;
    });
  };

  const clearCart = () => {
    setItems([]);
    persistCart([]);
  };

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => {
    const unitPrice = parseFloat(item.variant.price.amount) || 0;
    return sum + unitPrice * item.quantity;
  }, 0);

  const formattedSubtotal = `${config.currencySymbol}${subtotal.toFixed(2)}`;

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        subtotal,
        formattedSubtotal,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};


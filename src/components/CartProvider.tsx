
import React, { createContext, useContext } from 'react';
import { useCart } from '@/hooks/useCart';

interface CartContextType {
  cartItems: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    category: string;
  }>;
  selectedItems: number[];
  addItem: (item: any) => void;
  removeItem: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cartHook = useCart();
  
  return (
    <CartContext.Provider value={cartHook}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

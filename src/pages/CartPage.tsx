
import React from 'react';
import Cart from './Cart';
import { useCartContext } from '@/components/CartProvider';
import { useToast } from '@/hooks/use-toast';

const CartPage = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    getTotalPrice,
    getTotalItems,
    clearCart
  } = useCartContext();

  const { toast } = useToast();

  const handleSendToKitchen = () => {
    if (cartItems.length === 0) return;
    
    toast({
      title: "Order Sent to Kitchen! 🍽️",
      description: `${getTotalItems()} items sent for preparation. Total: $${(getTotalPrice() * 1.085).toFixed(2)}`,
    });
    
    // Clear the cart after sending to kitchen
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  return (
    <Cart
      cartItems={cartItems}
      onIncrease={increaseQuantity}
      onDecrease={decreaseQuantity}
      onRemove={removeItem}
      totalPrice={getTotalPrice()}
      totalItems={getTotalItems()}
      onSendToKitchen={handleSendToKitchen}
    />
  );
};

export default CartPage;

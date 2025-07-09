
import React, { useEffect } from 'react';
import Cart from './Cart';
import { useCartContext } from '@/components/CartProvider';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useOrderUpdates } from '@/hooks/useOrderUpdates';

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
  const { orders } = useOrderUpdates(); // Real-time order updates

  // Show real-time order status updates
  useEffect(() => {
    if (orders.length > 0) {
      const latestOrder = orders[0];
      if (latestOrder.status === 'preparing') {
        toast({
          title: "Order Update! 👨‍🍳",
          description: `Order #${latestOrder.id.slice(0, 8)} is now being prepared in the kitchen.`,
        });
      } else if (latestOrder.status === 'ready') {
        toast({
          title: "Order Ready! 🎉",
          description: `Order #${latestOrder.id.slice(0, 8)} is ready for pickup!`,
        });
      }
    }
  }, [orders, toast]);

  const handleSendToKitchen = async () => {
    if (cartItems.length === 0) return;
    
    try {
      const totalAmount = getTotalPrice();
      const taxAmount = totalAmount * 0.085;
      
      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          total_amount: totalAmount,
          tax_amount: taxAmount,
          status: 'pending'
        })
        .select()
        .single();
      
      if (orderError) throw orderError;
      
      // Insert order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        menu_item_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) throw itemsError;
      
      toast({
        title: "Order Sent to Kitchen! 🍽️",
        description: `Order #${order.id.slice(0, 8)} with ${getTotalItems()} items sent for preparation. Total: $${(totalAmount + taxAmount).toFixed(2)}`,
      });
      
      // Clear the cart after sending to kitchen
      setTimeout(() => {
        clearCart();
      }, 2000);
      
    } catch (error) {
      console.error('Error sending order to kitchen:', error);
      toast({
        title: "Error",
        description: "Failed to send order to kitchen. Please try again.",
        variant: "destructive"
      });
    }
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

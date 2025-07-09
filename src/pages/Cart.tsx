
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import CartItem from '@/components/CartItem';
import { useCart } from '@/hooks/useCart';
import { ArrowDown, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartProps {
  cartItems: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
  totalPrice: number;
  totalItems: number;
  onSendToKitchen: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  onIncrease,
  onDecrease,
  onRemove,
  totalPrice,
  totalItems,
  onSendToKitchen
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pos-surface via-background to-muted p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Order Cart</h1>
            <p className="text-muted-foreground text-lg mt-1">Review and manage your order</p>
          </div>
          <Link to="/menu">
            <Button 
              variant="outline" 
              size="lg"
              className="bg-gradient-to-r from-secondary/10 to-secondary/20 hover:from-secondary/20 hover:to-secondary/30 border-secondary/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <ArrowDown className="h-5 w-5 rotate-90" />
              Back to Menu
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Items ({totalItems})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🛒</div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">Your cart is empty</h3>
                    <p className="text-gray-500">Add items from the menu to get started</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      onIncrease={onIncrease}
                      onDecrease={onDecrease}
                      onRemove={onRemove}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (8.5%)</span>
                    <span>${(totalPrice * 0.085).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(totalPrice * 1.085).toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={onSendToKitchen}
                  disabled={cartItems.length === 0}
                  className="w-full bg-gradient-to-r from-pos-success to-accent hover:from-pos-success/90 hover:to-accent/90 text-white py-4 text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Send className="h-6 w-6 mr-3" />
                  Send to Kitchen
                </Button>

                {cartItems.length > 0 && (
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      Order will be prepared in 10-15 minutes
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

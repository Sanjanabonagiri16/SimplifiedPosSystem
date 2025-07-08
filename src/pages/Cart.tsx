
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Order Cart</h1>
            <p className="text-gray-600 mt-1">Review and manage your order</p>
          </div>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowDown className="h-4 w-4 rotate-90" />
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
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <Send className="h-5 w-5 mr-2" />
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

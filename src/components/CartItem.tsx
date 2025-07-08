
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CirclePlus, CircleMinus, Trash } from 'lucide-react';

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onRemove
}) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="font-medium text-gray-800">{name}</h4>
            <p className="text-sm text-gray-600">${price.toFixed(2)} each</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDecrease(id)}
                className="h-8 w-8 p-0 rounded-full hover:bg-red-50"
              >
                <CircleMinus className="h-4 w-4" />
              </Button>
              
              <span className="font-semibold min-w-[2rem] text-center">{quantity}</span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onIncrease(id)}
                className="h-8 w-8 p-0 rounded-full hover:bg-green-50"
              >
                <CirclePlus className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRemove(id)}
              className="h-8 w-8 p-0 rounded-full hover:bg-red-50 text-red-600"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-2 text-right">
          <span className="font-bold text-lg text-gray-800">
            ${(price * quantity).toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;

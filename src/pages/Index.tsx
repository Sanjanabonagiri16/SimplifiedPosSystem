
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MenuGrid from '@/components/MenuGrid';
import { useCartContext } from '@/components/CartProvider';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';

const Index = () => {
  const {
    cartItems,
    selectedItems,
    addItem,
    getTotalPrice,
    getTotalItems
  } = useCartContext();

  const handleItemSelect = (item: any) => {
    addItem(item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Café POS</h1>
              <p className="text-gray-600 text-sm md:text-base">Select items to add to your order</p>
            </div>
            
            {/* Cart Summary */}
            <div className="flex items-center gap-4">
              {getTotalItems() > 0 && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {getTotalItems()} items
                  </p>
                  <p className="font-bold text-lg text-gray-800">
                    ${getTotalPrice().toFixed(2)}
                  </p>
                </div>
              )}
              
              <Link to="/cart">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
                  disabled={getTotalItems() === 0}
                >
                  View Cart
                  <ArrowDown className="ml-2 h-4 w-4 -rotate-90" />
                  {getTotalItems() > 0 && (
                    <span className="ml-1 bg-blue-800 text-white rounded-full px-2 py-0.5 text-xs">
                      {getTotalItems()}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto">
        <Card className="m-4 shadow-lg">
          <CardHeader className="bg-white">
            <CardTitle className="text-xl text-gray-800">Menu Items</CardTitle>
            <p className="text-gray-600">Click on items to add them to your cart</p>
          </CardHeader>
          <CardContent className="p-0 bg-gray-50">
            <MenuGrid 
              onItemSelect={handleItemSelect}
              selectedItems={selectedItems}
            />
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-gray-500">
        <p className="text-sm">
          Select items from the grid above • Total: ${getTotalPrice().toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Index;

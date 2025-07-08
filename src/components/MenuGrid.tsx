
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image?: string;
}

interface MenuGridProps {
  onItemSelect: (item: MenuItem) => void;
  selectedItems: number[];
}

const menuItems: MenuItem[] = [
  { id: 1, name: 'Espresso', price: 3.50, category: 'Coffee' },
  { id: 2, name: 'Cappuccino', price: 4.25, category: 'Coffee' },
  { id: 3, name: 'Latte', price: 4.75, category: 'Coffee' },
  { id: 4, name: 'Americano', price: 3.75, category: 'Coffee' },
  { id: 5, name: 'Croissant', price: 3.25, category: 'Pastry' },
  { id: 6, name: 'Muffin', price: 2.95, category: 'Pastry' },
  { id: 7, name: 'Bagel', price: 2.50, category: 'Pastry' },
  { id: 8, name: 'Danish', price: 3.75, category: 'Pastry' },
  { id: 9, name: 'Green Tea', price: 2.75, category: 'Tea' },
  { id: 10, name: 'Earl Grey', price: 2.75, category: 'Tea' },
  { id: 11, name: 'Chai Latte', price: 4.25, category: 'Tea' },
  { id: 12, name: 'Herbal Tea', price: 2.50, category: 'Tea' },
  { id: 13, name: 'Sandwich', price: 8.95, category: 'Food' },
  { id: 14, name: 'Salad', price: 7.50, category: 'Food' },
  { id: 15, name: 'Soup', price: 6.25, category: 'Food' },
  { id: 16, name: 'Wrap', price: 7.95, category: 'Food' }
];

const MenuGrid: React.FC<MenuGridProps> = ({ onItemSelect, selectedItems }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Coffee': return 'from-amber-100 to-amber-200 border-amber-300';
      case 'Tea': return 'from-green-100 to-green-200 border-green-300';
      case 'Pastry': return 'from-orange-100 to-orange-200 border-orange-300';
      case 'Food': return 'from-blue-100 to-blue-200 border-blue-300';
      default: return 'from-gray-100 to-gray-200 border-gray-300';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
      {menuItems.map((item) => {
        const isSelected = selectedItems.includes(item.id);
        return (
          <Card 
            key={item.id}
            className={`cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
              isSelected ? 'ring-2 ring-blue-500 shadow-lg scale-105' : ''
            }`}
            onClick={() => onItemSelect(item)}
          >
            <CardContent className={`p-4 bg-gradient-to-br ${getCategoryColor(item.category)} h-32 flex flex-col justify-between`}>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm md:text-base">{item.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{item.category}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-gray-800">${item.price.toFixed(2)}</span>
                {isSelected && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MenuGrid;

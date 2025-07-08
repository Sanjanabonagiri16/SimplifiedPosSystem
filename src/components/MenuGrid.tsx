
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

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

const MenuGrid: React.FC<MenuGridProps> = ({ onItemSelect, selectedItems }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .eq('available', true)
          .order('category', { ascending: true });
        
        if (error) throw error;
        setMenuItems(data || []);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Coffee': return 'from-amber-100 to-amber-200 border-amber-300';
      case 'Tea': return 'from-green-100 to-green-200 border-green-300';
      case 'Pastry': return 'from-orange-100 to-orange-200 border-orange-300';
      case 'Food': return 'from-blue-100 to-blue-200 border-blue-300';
      default: return 'from-gray-100 to-gray-200 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        {[...Array(16)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-4 bg-gray-200 h-32" />
          </Card>
        ))}
      </div>
    );
  }

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

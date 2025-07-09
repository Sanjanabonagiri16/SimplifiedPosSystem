
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

    // Set up real-time subscription for menu items
    const channel = supabase
      .channel('menu-items-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'menu_items'
        },
        () => {
          fetchMenuItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Coffee': return 'from-amber-50 via-amber-100 to-amber-200 border-amber-300/50 hover:from-amber-100 hover:to-amber-300';
      case 'Tea': return 'from-emerald-50 via-emerald-100 to-emerald-200 border-emerald-300/50 hover:from-emerald-100 hover:to-emerald-300';
      case 'Pastry': return 'from-orange-50 via-orange-100 to-orange-200 border-orange-300/50 hover:from-orange-100 hover:to-orange-300';
      case 'Food': return 'from-blue-50 via-blue-100 to-blue-200 border-blue-300/50 hover:from-blue-100 hover:to-blue-300';
      default: return 'from-slate-50 via-slate-100 to-slate-200 border-slate-300/50 hover:from-slate-100 hover:to-slate-300';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {[...Array(16)].map((_, index) => (
          <Card key={index} className="animate-pulse shadow-lg">
            <CardContent className="p-6 bg-gradient-to-br from-muted/50 to-muted h-36 rounded-lg" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {menuItems.map((item, index) => {
        const isSelected = selectedItems.includes(item.id);
        return (
          <Card 
            key={item.id}
            className={`cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl border-2 shadow-lg hover:shadow-2xl animate-fade-in ${
              isSelected 
                ? 'ring-4 ring-primary/30 shadow-2xl scale-105 border-primary/50' 
                : 'hover:border-accent/50'
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => onItemSelect(item)}
          >
            <CardContent className={`p-6 bg-gradient-to-br ${getCategoryColor(item.category)} h-36 flex flex-col justify-between rounded-lg backdrop-blur-sm`}>
              <div className="space-y-2">
                <h3 className="font-bold text-foreground text-lg leading-tight">{item.name}</h3>
                <p className="text-sm text-muted-foreground font-medium">{item.category}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ${item.price.toFixed(2)}
                </span>
                {isSelected && (
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg animate-scale-in">
                    <span className="text-primary-foreground text-sm font-bold">✓</span>
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

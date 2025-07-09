
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MenuGrid from '@/components/MenuGrid';
import { useCartContext } from '@/components/CartProvider';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowLeft, Users, ShoppingCart } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-pos-surface via-background to-muted">
      {/* Header */}
      <div className="bg-gradient-to-r from-card to-background shadow-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-gradient-to-r from-secondary/10 to-secondary/20 hover:from-secondary/20 hover:to-secondary/30 border-secondary/30 hover:scale-105 transition-all duration-300"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  <Users className="mr-2 h-5 w-5" />
                  Tables
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Café POS Menu
                </h1>
                <p className="text-muted-foreground text-lg">Select items to add to your order</p>
              </div>
            </div>
            
            {/* Cart Summary */}
            <div className="flex items-center gap-4">
              {getTotalItems() > 0 && (
                <div className="text-right animate-fade-in">
                  <p className="text-sm text-muted-foreground">
                    {getTotalItems()} items
                  </p>
                  <p className="font-bold text-xl bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    ${getTotalPrice().toFixed(2)}
                  </p>
                </div>
              )}
              
              <Link to="/cart">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  disabled={getTotalItems() === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  View Cart
                  {getTotalItems() > 0 && (
                    <span className="ml-2 bg-primary-foreground/20 text-primary-foreground rounded-full px-3 py-1 text-sm font-bold">
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
      <div className="max-w-7xl mx-auto p-4">
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/50">
            <CardTitle className="text-2xl text-foreground flex items-center gap-2">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Menu Items
              </span>
            </CardTitle>
            <p className="text-muted-foreground text-lg">Click on items to add them to your cart with smooth animations</p>
          </CardHeader>
          <CardContent className="p-0 bg-gradient-to-br from-pos-surface/30 to-muted/30">
            <MenuGrid 
              onItemSelect={handleItemSelect}
              selectedItems={selectedItems}
            />
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Footer with slide-up animation */}
      <div className="text-center py-8 animate-slide-up">
        <div className="bg-gradient-to-r from-card/80 to-background/80 backdrop-blur-sm rounded-lg mx-auto max-w-md py-4 px-6 shadow-lg">
          <p className="text-muted-foreground">
            Select items from the grid above
          </p>
          <p className="font-bold text-lg bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Total: ${getTotalPrice().toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

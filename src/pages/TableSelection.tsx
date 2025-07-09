import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TableGrid from '@/components/TableGrid';
import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';

const TableSelection = () => {
  const [selectedTable, setSelectedTable] = useState<number | undefined>();

  const handleTableSelect = (tableId: number) => {
    setSelectedTable(tableId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pos-surface to-muted">
      {/* Header */}
      <div className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Select a Table</h1>
                <p className="text-muted-foreground text-lg">Choose an available table to start your order</p>
              </div>
            </div>
            
            {selectedTable && (
              <Link to="/menu">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:scale-105"
                >
                  Continue to Menu
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Table Grid */}
      <div className="py-8">
        <Card className="mx-4 max-w-6xl mx-auto shadow-lg">
          <CardHeader className="bg-card border-b">
            <CardTitle className="text-xl text-foreground flex items-center gap-2">
              <span>Available Tables</span>
              {selectedTable && (
                <span className="text-primary font-normal">
                  - Table {selectedTable} Selected
                </span>
              )}
            </CardTitle>
            <p className="text-muted-foreground">
              Green border = Available • Red border = Occupied • Blue = Selected
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <TableGrid 
              onTableSelect={handleTableSelect}
              selectedTable={selectedTable}
            />
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">
          {selectedTable 
            ? `Table ${selectedTable} selected • Click "Continue to Menu" to proceed`
            : 'Select a table above to continue'
          }
        </p>
      </div>
    </div>
  );
};

export default TableSelection;
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Table {
  id: number;
  number: number;
  status: 'available' | 'occupied' | 'selected';
}

interface TableGridProps {
  onTableSelect: (tableId: number) => void;
  selectedTable?: number;
}

const tables: Table[] = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  number: i + 1,
  status: Math.random() > 0.7 ? 'occupied' : 'available'
}));

const TableGrid: React.FC<TableGridProps> = ({ onTableSelect, selectedTable }) => {
  const getTableStatus = (table: Table) => {
    if (selectedTable === table.id) return 'selected';
    return table.status;
  };

  const getTableStyles = (status: string) => {
    switch (status) {
      case 'available':
        return 'border-pos-success hover:border-pos-success/70 bg-card hover:bg-pos-surface/50';
      case 'occupied':
        return 'border-pos-warning bg-pos-warning/10 cursor-not-allowed opacity-75';
      case 'selected':
        return 'border-primary bg-primary/10 shadow-lg scale-105';
      default:
        return 'border-border bg-card';
    }
  };

  const handleTableClick = (table: Table) => {
    if (table.status !== 'occupied') {
      onTableSelect(table.id);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-6 p-6 max-w-4xl mx-auto">
      {tables.map((table) => {
        const status = getTableStatus(table);
        return (
          <Card
            key={table.id}
            className={cn(
              'aspect-square flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-in-out border-2 hover:scale-105 hover:shadow-md',
              getTableStyles(status)
            )}
            onClick={() => handleTableClick(table)}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-2">
                {table.number}
              </div>
              <div className={cn(
                'text-sm font-medium capitalize',
                status === 'available' && 'text-pos-success',
                status === 'occupied' && 'text-pos-warning',
                status === 'selected' && 'text-primary'
              )}>
                {status === 'selected' ? 'Selected' : status}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default TableGrid;
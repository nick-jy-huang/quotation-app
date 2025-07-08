'use client';

import { QuotationItem } from '@/types/quotation';
import { useMemo } from 'react';
import { toThousand } from '@/utils/toThousand';

interface TotalSectionProps {
  items: QuotationItem[];
}

export default function TotalSection({ items }: TotalSectionProps) {
  const { subtotal, total } = useMemo(() => {
    const updatedItems = items.map((item) => ({
      ...item,
      total: item.hours * item.hourlyRate,
    }));
    const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = 0;
    const total = subtotal + taxAmount;
    return { subtotal, total };
  }, [items]);

  return (
    <div className="h-24 rounded-lg bg-gray-50 p-4">
      <div className="flex items-center justify-end text-lg font-semibold">
        <span>小計：</span>
        <span>{toThousand(subtotal)}</span>
      </div>
      <div className="mt-2 flex items-center justify-end border-t pt-2 text-xl font-bold text-blue-600">
        <span>總計：</span>
        <span>{toThousand(total)}</span>
      </div>
    </div>
  );
}

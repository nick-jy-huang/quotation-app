'use client';

import { QuotationItem } from '@/types/quotation';
import { useMemo } from 'react';
import { toThousand } from '@/utils/toThousand';
import { useTranslations } from 'next-intl';

interface TotalSectionProps {
  items: QuotationItem[];
}

export default function TotalSection({ items, forceLight = false }: TotalSectionProps & { forceLight?: boolean }) {
  const t = useTranslations();
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
    <div className={forceLight
      ? "h-24 rounded-lg bg-gray-50 p-4"
      : "h-24 rounded-lg bg-gray-50 p-4 dark:bg-gray-800 dark:text-gray-100"
    }>
      <div className="flex items-center justify-end text-lg font-semibold">
        <span>{t('totalsection_subtotal')}：</span>
        <span data-testid="subtotal-amount">{toThousand(subtotal)}</span>
      </div>
      <div className="mt-2 flex items-center justify-end border-t pt-2 text-xl font-bold text-blue-700 dark:text-blue-400">
        <span>{t('totalsection_total')}：</span>
        <span data-testid="total-amount">{toThousand(total)}</span>
      </div>
    </div>
  );
}

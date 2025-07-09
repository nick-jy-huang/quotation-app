import { toThousand } from '@/utils/toThousand';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { ItemTableProps } from './types';

export default function ItemTable({ items }: ItemTableProps) {
  const t = useTranslations();
  const columns = [
    { label: t('common_item'), className: 'text-left' },
    { label: t('common_subtotal'), className: 'text-right' },
  ];
  const { itemsWithTotal } = useMemo(() => {
    const itemsWithTotal = items.map((item) => ({
      ...item,
      total: item.hours * item.hourlyRate,
    }));
    return { itemsWithTotal };
  }, [items]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            {columns.map((col) => (
              <th
                key={col.label}
                className={`border border-gray-300 px-2 py-1 text-sm font-medium text-gray-700 ${col.className}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {itemsWithTotal.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="border border-gray-300 px-2 py-1 text-xs">{item.name || t('common_not_filled')}</td>
              <td className="border border-gray-300 px-2 py-1 text-right text-xs">
                {toThousand(item.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import type { QuotationItem } from '@/types/quotation';

export interface SortableItemProps {
  item: QuotationItem & { total: number };
  index: number;
  updateItem: (id: string, field: keyof QuotationItem, value: any) => void;
  removeItem: (id: string) => void;
  itemsLength: number;
}

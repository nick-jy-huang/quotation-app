import { QuotationData, QuotationItem } from "@/types/quotation";

export interface ItemListProps {
  items: QuotationItem[];
  addItem: () => void;
  updateItem: (id: string, field: keyof QuotationItem, value: any) => void;
  removeItem: (id: string) => void;
  reorderItems: (from: number, to: number) => void;
}

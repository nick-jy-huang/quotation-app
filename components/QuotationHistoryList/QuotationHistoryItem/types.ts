import { QuotationData } from '@/types/quotation';

export interface QuotationItemProps {
  quotationHistory: QuotationData[];
  onLoad: (history: QuotationData) => void;
}

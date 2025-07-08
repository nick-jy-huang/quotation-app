import { QuotationData } from '@/types/quotation';

export interface QuotationHistoryListProps {
  quotationHistory: QuotationData[];
  onClear: () => void;
  onLoad: (history: QuotationData) => void;
}

import { QuotationData } from '@/types/quotation';

export interface BaseInfoProps {
  quotation: Pick<QuotationData, 'id' | 'date' | 'validUntil'>;
  updateQuotation: (field: keyof QuotationData, value: any) => void;
}

import { QuotationData } from '@/types/quotation';

export interface CompanyInfoProps {
  quotation: Pick<QuotationData, 'freelancer' | 'companyEmail'>;
  updateQuotation: (field: keyof QuotationData, value: any) => void;
}

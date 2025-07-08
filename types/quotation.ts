export interface QuotationItem {
  id: string;
  name: string;
  hourlyRate: number;
  hours: number;
}

export interface QuotationData {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  freelancer: string;
  companyEmail: string;
  techStack: string;
  mainWorkContent: string;
  items: QuotationItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
  notes: string;
  validUntil: string;
  fileName?: string;
  exportedAt?: string;
}

export interface QuotationStore {
  quotation: QuotationData;
  quotationHistory: QuotationData[];
  setQuotationHistory: (history: QuotationData[]) => void;
  addItem: () => void;
  updateItem: (id: string, field: keyof QuotationItem, value: any) => void;
  removeItem: (id: string) => void;
  updateQuotation: (field: keyof QuotationData, value: any) => void;
  calculateTotals: () => void;
}

import { create } from 'zustand';
import { QuotationData, QuotationItem, QuotationStore } from '@/types/quotation';
import { generateId } from '@/utils/generateId';
import dayjs from 'dayjs';

const initialQuotation: QuotationData = {
  id: generateId(),
  date: dayjs().format('YYYY-MM-DD'),
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  customerAddress: '',
  freelancer: '',
  companyEmail: '',
  techStack: '',
  mainWorkContent: '',
  items: [
    {
      id: generateId(),
      name: '',
      hourlyRate: 100,
      hours: 1,
      total: 0,
    },
  ],
  subtotal: 0,
  taxAmount: 0,
  total: 0,
  notes: '',
  validUntil: dayjs().add(30, 'day').format('YYYY-MM-DD'),
};

export const useQuotationStore = create<QuotationStore>((set, get) => ({
  quotation: initialQuotation,

  addItem: () => {
    const { quotation } = get();
    const newItem: QuotationItem = {
      id: generateId(),
      name: '',
      hourlyRate: 0,
      hours: 1,
      total: 0,
    };
    set({
      quotation: {
        ...quotation,
        items: [...quotation.items, newItem],
      },
    });
    get().calculateTotals();
  },

  updateItem: (id: string, field: keyof QuotationItem, value: any) => {
    const { quotation } = get();
    const updatedItems = quotation.items.map(item => (item.id === id ? { ...item, [field]: value } : item));
    set({
      quotation: {
        ...quotation,
        items: updatedItems,
      },
    });
    get().calculateTotals();
  },

  removeItem: (id: string) => {
    const { quotation } = get();
    const updatedItems = quotation.items.filter(item => item.id !== id);
    if (updatedItems.length === 0) {
      updatedItems.push({
        id: generateId(),
        name: '',
        hourlyRate: 100,
        hours: 1,
        total: 0,
      });
    }
    set({
      quotation: {
        ...quotation,
        items: updatedItems,
      },
    });
    get().calculateTotals();
  },

  updateQuotation: (field: keyof QuotationData, value: any) => {
    const { quotation } = get();
    set({
      quotation: {
        ...quotation,
        [field]: value,
      },
    });
  },

  calculateTotals: () => {
    const { quotation } = get();
    const updatedItems = quotation.items.map(item => ({
      ...item,
      total: item.hours * item.hourlyRate,
    }));
    const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = 0;
    const total = subtotal + taxAmount;

    set({
      quotation: {
        ...quotation,
        items: updatedItems,
        subtotal,
        taxAmount,
        total,
      },
    });
  },
}));

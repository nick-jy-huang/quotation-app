import { create } from 'zustand';
import { QuotationData, QuotationItem, QuotationStore } from '@/types/quotation';
import { generateId } from '@/utils/generateId';
import dayjs from 'dayjs';

import { handleSaveLocaleStorage } from '@/utils/saveLocaleStorage';

const newItem: QuotationItem = {
  id: generateId(),
  name: '',
  hourlyRate: 100,
  hours: 1,
};

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
  items: [newItem],
  subtotal: 0,
  taxAmount: 0,
  total: 0,
  notes: '',
  validUntil: dayjs().add(30, 'day').format('YYYY-MM-DD'),
};

export const useQuotationStore = create<QuotationStore>((set, get) => ({
  quotation: initialQuotation,
  quotationHistory: [],
  setQuotationHistory: (history: QuotationData[]) => set({ quotationHistory: history }),

  addItem: () => {
    const { quotation } = get();
    set({
      quotation: {
        ...quotation,
        items: [...quotation.items, { ...newItem, id: generateId() }],
      },
    });
    get().calculateTotals();
  },

  updateItem: (id: string, field: keyof QuotationItem, value: any) => {
    const { quotation } = get();
    const updatedItems = quotation.items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );

    const data = {
      ...quotation,
      items: updatedItems,
    };

    set({
      quotation: data,
    });

    handleSaveLocaleStorage('quotation_current', data);

    get().calculateTotals();
  },

  removeItem: (id: string) => {
    const { quotation } = get();
    const updatedItems = quotation.items.filter((item) => item.id !== id);
    if (updatedItems.length === 0) {
      updatedItems.push({
        id: generateId(),
        name: '',
        hourlyRate: 100,
        hours: 1,
      });
    }

    const data = {
      ...quotation,
      items: updatedItems,
    };

    set({
      quotation: data,
    });

    handleSaveLocaleStorage('quotation_current', data);

    get().calculateTotals();
  },

  updateQuotation: (field: keyof QuotationData, value: any) => {
    const { quotation } = get();
    const data = { ...quotation, [field]: value };
    set({
      quotation: data,
    });
    handleSaveLocaleStorage('quotation_current', data);
  },

  calculateTotals: () => {
    const { quotation } = get();
    const updatedItems = quotation.items.map((item) => ({
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

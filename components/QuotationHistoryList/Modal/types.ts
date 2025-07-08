import { ReactNode } from 'react';

export interface QuotationHistoryModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

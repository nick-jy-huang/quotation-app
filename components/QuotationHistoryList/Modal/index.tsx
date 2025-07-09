import { useEffect, useRef, useCallback } from 'react';
import { QuotationHistoryModalProps } from './types';
import Button from '@/components/prototype/Button';
import { useTranslations } from 'next-intl';

export default function QuotationHistoryModal({
  open,
  onClose,
  children,
}: QuotationHistoryModalProps) {
  const t = useTranslations();
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const trapFocus = useCallback(
    (e: KeyboardEvent) => {
      if (!open || !modalRef.current) return;
      if (e.key !== 'Tab') return;
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [open],
  );

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) onClose();
  };

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      trapFocus(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, trapFocus]);

  useEffect(() => {
    if (open && contentRef.current) {
      contentRef.current.focus();
    }
  }, [open]);

  if (!open) return null;
  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 xl:hidden"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="quotation-history-modal-title"
      aria-describedby="quotation-history-modal-desc"
      tabIndex={-1}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-80 max-w-full p-4 relative"
        ref={contentRef}
        tabIndex={-1}
        id="quotation-history-modal-desc"
      >
        <Button
          className="absolute top-1 right-0 text-gray-500 hover:text-gray-700"
          aria-label={t('quotationhistorylist_modal_close')}
          variant="ghost"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </Button>
        <h2 id="quotation-history-modal-title" className="sr-only">
          {t('quotationhistorylist_modal_title')}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}

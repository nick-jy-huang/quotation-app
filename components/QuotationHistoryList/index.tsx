import Button from '@/components/prototype/Button';
import QuotationHistoryItem from './QuotationHistoryItem';
import { QuotationHistoryListProps } from './types';
import { useTranslations } from 'next-intl';

export default function QuotationHistoryList({
  quotationHistory,
  onClear,
  onLoad,
}: QuotationHistoryListProps) {
  const t = useTranslations();
  if (!quotationHistory.length) return null;
  return (
    <>
      <div className="flex items-center justify-end">
        <Button onClick={onClear} variant="ghost" className="gap-2" size="sm">
          <i className="fa-solid fa-trash"></i> {t('quotationhistorylist_clearhistory')}
        </Button>
      </div>
      <div className="divide-y divide-gray-300">
        <div>
          <span className="text-gray-600 text-xs">{t('quotationhistorylist_exporthistory')}</span>
        </div>
        <QuotationHistoryItem quotationHistory={quotationHistory} onLoad={onLoad} />
      </div>
    </>
  );
}

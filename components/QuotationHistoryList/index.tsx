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

  const handleClean = () => {
    const check = confirm(t('quotationhistorylist_clearhistory_confirm'));
    if (check) {
      onClear();
    }
  };

  if (!quotationHistory.length) return null;
  return (
    <div className="rounded-xl bg-white p-4 dark:bg-gray-900 dark:text-gray-100">
      <div className="flex items-center justify-end">
        <Button
          onClick={handleClean}
          variant="ghost"
          className="gap-2 hover:text-red-600"
          size="sm"
        >
          <i className="fa-solid fa-trash"></i> {t('quotationhistorylist_clearhistory')}
        </Button>
      </div>
      <div className="divide-y divide-gray-300 dark:divide-gray-700">
        <div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-200">
            {t('quotationhistorylist_exporthistory')}
          </span>
        </div>
        <QuotationHistoryItem quotationHistory={quotationHistory} onLoad={onLoad} />
      </div>
    </div>
  );
}

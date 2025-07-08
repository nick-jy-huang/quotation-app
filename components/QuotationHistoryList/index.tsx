import Button from '@/components/prototype/Button';
import QuotationHistoryItem from './QuotationHistoryItem';

import type { QuotationHistoryListProps } from './types';

export default function QuotationHistoryList({
  quotationHistory,
  onClear,
  onLoad,
}: QuotationHistoryListProps) {
  if (!quotationHistory.length) return null;
  return (
    <div className="absolute top-2 left-[-4%]">
      <div className="flex items-center justify-end">
        {quotationHistory.length > 0 && (
          <Button onClick={onClear} variant="ghost" className="gap-2" size="sm">
            <i className="fa-solid fa-trash"></i> 清空歷史
          </Button>
        )}
      </div>

      <div className="divide-y divide-gray-300">
        <div>
          <span className="text-gray-600 text-xs">匯出歷史</span>
        </div>
        <QuotationHistoryItem quotationHistory={quotationHistory} onLoad={onLoad} />
      </div>
    </div>
  );
}

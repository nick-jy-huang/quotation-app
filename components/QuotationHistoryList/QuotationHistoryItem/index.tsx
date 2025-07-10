import Button from '@/components/prototype/Button';
import { useTranslations } from 'next-intl';

import { QuotationItemProps } from './types';

export default function QuotationHistoryItem({ quotationHistory, onLoad }: QuotationItemProps) {
  const t = useTranslations();
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {quotationHistory.map((history, index) => {
        const name = history.fileName || '- -';
        const displayName = name.length > 20 ? name.slice(0, 16) + '...' : name;
        return (
          <div key={index} className="flex items-center justify-between py-1">
            <i className="fa-solid fa-file mr-1 text-xs text-gray-600 dark:text-gray-200"></i>

            <span
              className="inline-block max-w-[140px] overflow-hidden align-middle text-xs text-ellipsis whitespace-nowrap text-gray-600 dark:text-gray-200"
              title={name}
            >
              {displayName}
            </span>

            <Button
              key={`${history.exportedAt}-export`}
              onClick={() => onLoad(history)}
              variant="ghost"
              size="sm"
              aria-label={t('quotationhistoryitem_load_exported_history')}
              className="hover:text-blue-600"
            >
              <i className="fa-solid fa-file-export"></i>
            </Button>
          </div>
        );
      })}
    </div>
  );
}

import { BaseInfoProps } from './types';
import Input from '@/components/prototype/Input';
import { useTranslations } from 'next-intl';

export default function BaseInfo({ quotation, updateQuotation }: BaseInfoProps) {
  const t = useTranslations();
  return (
    <div className="grid">
      <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-200">{t('baseinfo_title')}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Input
          label={t('input_label_id')}
          value={quotation.id}
          placeholder={t('input_placeholder_id')}
          onChange={(value) => updateQuotation('id', value)}
        />
        <Input
          label={t('input_label_date')}
          type="date"
          value={quotation.date}
          placeholder={t('input_placeholder_date')}
          onChange={(value) => updateQuotation('date', value)}
        />
        <Input
          label={t('input_label_valid_until')}
          type="date"
          value={quotation.validUntil}
          placeholder={t('input_placeholder_valid_until')}
          onChange={(value) => updateQuotation('validUntil', value)}
        />
      </div>
    </div>
  );
}

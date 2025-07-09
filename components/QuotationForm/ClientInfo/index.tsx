import { ClientInfoProps } from './types';
import Input from '@/components/prototype/Input';
import { useTranslations } from 'next-intl';

export default function ClientInfo({ quotation, updateQuotation }: ClientInfoProps) {
  const t = useTranslations();
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold text-gray-700">{t('clientinfo_title')}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label={t('input_label_name')}
          value={quotation.customerName}
          placeholder={t('input_placeholder_name')}
          onChange={(value) => updateQuotation('customerName', value)}
        />
        <Input
          label={t('input_label_phone')}
          type="tel"
          value={quotation.customerPhone}
          placeholder={t('input_placeholder_phone')}
          onChange={(value) => updateQuotation('customerPhone', value)}
        />
        <Input
          label={t('input_label_email')}
          type="email"
          value={quotation.customerEmail}
          placeholder={t('input_placeholder_email')}
          onChange={(value) => updateQuotation('customerEmail', value)}
        />
        <Input
          label={t('input_label_address')}
          value={quotation.customerAddress}
          placeholder={t('input_placeholder_address')}
          onChange={(value) => updateQuotation('customerAddress', value)}
        />
      </div>
    </div>
  );
}

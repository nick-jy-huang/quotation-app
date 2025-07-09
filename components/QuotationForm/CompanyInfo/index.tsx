import { CompanyInfoProps } from './types';
import Input from '@/components/prototype/Input';
import { useTranslations } from 'next-intl';

export default function CompanyInfo({ quotation, updateQuotation }: CompanyInfoProps) {
  const t = useTranslations();
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold text-gray-700">{t('companyinfo_title')}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label={t('input_label_freelancer')}
          value={quotation.freelancer}
          placeholder={t('input_placeholder_freelancer')}
          onChange={(value) => updateQuotation('freelancer', value)}
        />
        <Input
          label={t('input_label_email')}
          type="email"
          value={quotation.companyEmail}
          placeholder={t('input_placeholder_email')}
          onChange={(value) => updateQuotation('companyEmail', value)}
        />
      </div>
    </div>
  );
}

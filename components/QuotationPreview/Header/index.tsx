import { HeaderProps } from './types';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

export default function Header({ freelancer, companyEmail, id, date, validUntil }: HeaderProps) {
  const t = useTranslations();
  return (
    <div className="mb-2 flex flex-wrap items-center justify-between">
      <div className="pb-2">
        <h1 className="mb-2 text-3xl font-bold text-blue-600">{t('quotationpreview_title')}</h1>
        <div className="xs:border-b space-y-1 text-gray-600">
          <p>
            {t('common_freelancer')}: {freelancer || t('common_not_filled')}
          </p>
          <p>
            {t('common_email')}: {companyEmail || t('common_not_filled')}
          </p>
        </div>
      </div>
      <div className="xs:w-full text-left md:text-right">
        <div className="space-y-1 pr-1 text-xs text-gray-600">
          <p>No: {id}</p>
          <p>
            {t('common_date')}: {dayjs(date).format('YYYY/MM/DD')}
          </p>
          <p>
            {t('common_valid_until')}: {dayjs(validUntil).format('YYYY/MM/DD')}
          </p>
        </div>
      </div>
    </div>
  );
}

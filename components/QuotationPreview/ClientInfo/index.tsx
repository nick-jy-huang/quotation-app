import { ClientInfoProps } from './types';
import { useTranslations } from 'next-intl';
export default function ClientInfo({
  customerName,
  customerPhone,
  customerEmail,
  customerAddress,
}: ClientInfoProps) {
  const t = useTranslations();
  return (
    <div className="mb-4">
      <h2 className="mb-3 border-b pb-2 text-lg font-semibold text-gray-800">{t('clientinfo_title')}</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div>
          <p className="text-sm text-gray-600">{t('common_customer')}</p>
          <p className="font-medium">{customerName || t('common_not_filled')}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">{t('common_phone')}</p>
          <p className="font-medium">{customerPhone || t('common_not_filled')}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">{t('common_email')}</p>
          <p className="font-medium">{customerEmail || t('common_not_filled')}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">{t('common_address')}</p>
          <p className="font-medium">{customerAddress || t('common_not_filled')}</p>
        </div>
      </div>
    </div>
  );
}

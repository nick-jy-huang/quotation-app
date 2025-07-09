import Button from '@/components/prototype/Button';
import { ItemHeaderProps } from './types';
import { useTranslations } from 'next-intl';

export default function ItemHeader({ onAddItem }: ItemHeaderProps) {
  const t = useTranslations();
  return (
    <div className="mb-2 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-700">{t('itemheader_chargeitems')}</h3>
      <Button onClick={onAddItem} variant="ghost" className="gap-2">
        <i className="fa-solid fa-plus"></i> {t('itemheader_add')}
      </Button>
    </div>
  );
}

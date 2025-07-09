import { useTranslations } from 'next-intl';

export default function DragHandle({ listeners }: { listeners: any }) {
  const t = useTranslations();
  return (
    <span
      {...listeners}
      tabIndex={0}
      className="ml-2 cursor-grab text-xs text-gray-700 select-none hover:text-gray-600"
      aria-label={t('draghandle_sort')}
      role="button"
    >
      <i className="fa-solid fa-bars"></i>
    </span>
  );
}

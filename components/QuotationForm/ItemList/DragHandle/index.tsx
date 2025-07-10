import { useTranslations } from 'next-intl';

export default function DragHandle({ listeners }: { listeners: any }) {
  const t = useTranslations();
  return (
    <button
      {...listeners}
      className="cursor-move px-2 py-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
      aria-label={t('draghandle_sort')}
    >
      <i className="fa-solid fa-grip-lines"></i>
    </button>
  );
}

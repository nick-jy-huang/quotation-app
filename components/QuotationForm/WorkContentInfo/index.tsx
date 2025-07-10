import Textarea from '@/components/prototype/Textarea';
import { WorkContentInfoProps } from './types';
import { useTranslations } from 'next-intl';

export default function WorkContentInfo({
  mainWorkContent,
  techStack,
  onMainWorkContentChange,
  onTechStackChange,
}: WorkContentInfoProps) {
  const t = useTranslations();
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-200">{t('workcontentinfo_title')}</h3>
      <Textarea
        label={t('workcontentinfo_label_main')}
        value={mainWorkContent}
        onChange={onMainWorkContentChange}
        placeholder={t('workcontentinfo_placeholder_main')}
      />
      <Textarea
        label={t('workcontentinfo_label_tech')}
        value={techStack}
        onChange={onTechStackChange}
        placeholder={t('workcontentinfo_placeholder_tech')}
      />
    </div>
  );
}

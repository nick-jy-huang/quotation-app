'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Button from '@/components/prototype/Button';
import { ZH_TW, EN_US } from '@/constants/locale';

export default function LanguageSwitcher() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split('/')[1];
  const nextLocale = currentLocale === EN_US ? ZH_TW : EN_US;

  const handleLocaleSwitch = () => {
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    router.push(segments.join('/'));
  };

  return (
    <Button
      onClick={handleLocaleSwitch}
      variant="ghost"
      className="gap-1"
      aria-label={t('page_switch_language')}
    >
      <i className="fa-solid fa-language text-md"></i>
      <span>{nextLocale === EN_US ? 'EN' : '中'}</span>
    </Button>
  );
}

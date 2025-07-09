'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Button from '@/components/prototype/Button';

export default function LanguageSwitcher() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const nextLocale = currentLocale === 'en-US' ? 'zh-TW' : 'en-US';

  const handleLocaleSwitch = () => {
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    router.push(segments.join('/'));
  };
  return (
    <Button
      onClick={handleLocaleSwitch}
      variant="warning"
      className="gap-2"
      aria-label={t('page_switch_language')}
    >
      <i className="fa-solid fa-language text-md"></i>
      {nextLocale === 'en-US' ? 'EN' : '中'}
    </Button>
  );
}

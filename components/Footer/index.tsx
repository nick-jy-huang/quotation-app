import dayjs from 'dayjs';
import { version } from '@/package.json';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="sticky bottom-0 z-10 w-full space-x-2 bg-white p-4 text-center text-xs text-gray-700 shadow-sm shadow-gray-300 dark:bg-gray-900 dark:text-gray-300 dark:shadow-black/70">
      <span>
        &copy; {dayjs().year()} {t('page_footer_copyright')}
      </span>
      <span className="mt-2 text-xs text-gray-700 dark:text-gray-300">
        {t('page_footer_icons_by')}
        <a
          href="https://www.flaticon.com/"
          title="Flaticon"
          className="underline hover:text-blue-700 dark:hover:text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          Flaticon
        </a>
        、
        <a
          href="https://fontawesome.com/"
          title="fontawesome"
          className="underline hover:text-blue-700 dark:hover:text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          fontawesome
        </a>
      </span>
      <span>
        | {t('page_footer_version')} : {version}
      </span>
    </footer>
  );
}

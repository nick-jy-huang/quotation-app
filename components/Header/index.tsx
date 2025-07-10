import Button from '@/components/prototype/Button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslations } from 'next-intl';

import { HeaderProps, EDIT_TYPES } from '@/types/components';

export default function Header({ onChange, activeTab }: HeaderProps) {
  const t = useTranslations();
  return (
    <header className="z-10 flex-shrink-0 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex gap-4">
            <img src="/favicon.png" alt="logo" className="h-8 w-8 duration-300 hover:scale-125" />
            <h1 className="hidden text-2xl font-bold text-gray-900 md:block">Quotation App</h1>
          </div>

          <div id="desktop-tab-switcher" className="flex items-center gap-2">
            <div className="hidden space-x-4 sm:flex">
              <Button
                onClick={() => onChange('edit')}
                variant={activeTab === 'edit' ? 'primary' : 'secondary'}
                className="gap-2"
                id="edit-button"
                aria-label={t('page_edit_quotation')}
              >
                <i className="fa-solid fa-pen-to-square"></i>
                {t('page_edit_quotation')}
              </Button>
              <Button
                onClick={() => onChange('preview')}
                variant={activeTab === 'preview' ? 'primary' : 'secondary'}
                className="gap-2"
                id="preview-button"
                aria-label={t('page_preview_quotation')}
              >
                <i className="fa-solid fa-eye"></i>
                {t('page_preview_quotation')}
              </Button>
              <LanguageSwitcher />
            </div>
          </div>

          <div id="mobile-tab-switcher" className="flex gap-2 sm:hidden">
            <div className="relative">
              <select
                className="ease w-full cursor-pointer appearance-none rounded border border-slate-200 bg-transparent py-2 pr-8 pl-3 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-400 focus:border-slate-400 focus:shadow-md focus:outline-none"
                value={activeTab}
                onChange={(e) => onChange(e.target.value as EDIT_TYPES)}
                aria-label={t('page_tab_switch')}
              >
                <option value="edit">{t('page_edit_quotation')}</option>
                <option value="preview">{t('page_preview_quotation')}</option>
              </select>
              <i className="fa-solid fa-caret-down absolute top-1/2 right-3 -translate-y-1/2 transform"></i>
            </div>

            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}

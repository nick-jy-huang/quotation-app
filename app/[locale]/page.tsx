'use client';

import { useState } from 'react';
import QuotationForm from '@/components/QuotationForm';
import QuotationPreview from '@/components/QuotationPreview';
import Button from '@/components/prototype/Button';
import runAxeCheck from '@/utils/axe';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import QuotationHistoryList from '@/components/QuotationHistoryList';
import { useQuotationStore } from '@/stores/quotationStore';
import { QuotationData } from '@/types/quotation';
import { handleSaveLocaleStorage } from '@/utils/saveLocaleStorage';
import QuotationHistoryModal from '@/components/QuotationHistoryList/Modal';
import { version } from '@/package.json';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

type EDIT_TYPES = 'edit' | 'preview';

export default function Home() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<EDIT_TYPES>('edit');
  const [showHistory, setShowHistory] = useState(false);
  const { quotationHistory, setQuotationHistory, updateQuotation } = useQuotationStore();

  const renderComponent = {
    edit: <QuotationForm />,
    preview: <QuotationPreview />,
  };

  useEffect(() => {
    handleRunAxeCheck();
  }, []);

  const handleRunAxeCheck = async () => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      await runAxeCheck();
    }
  };

  const handleClearQuotationHistory = () => {
    setQuotationHistory([]);
    handleSaveLocaleStorage('quotation_history', []);
  };

  const handleLoadQuotation = (history: QuotationData) => {
    Object.entries(history).forEach(([key, value]) => {
      updateQuotation(key as keyof QuotationData, value);
    });
    setShowHistory(false);
  };

  const handleTabChange = (tab: EDIT_TYPES) => {
    handleRunAxeCheck();
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen flex-col ">
      <header className="z-10 flex-shrink-0 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex gap-4">
              <img src="/favicon.png" alt="logo" className="h-8 w-8" />
              <h1 className="text-2xl font-bold text-gray-900 hidden lg:block">Quotation App</h1>
            </div>

            <div id="desktop-tab-switcher" className="flex items-center gap-2">
              <div className="hidden space-x-4 sm:flex">
                <Button
                  onClick={() => handleTabChange('edit')}
                  variant={activeTab === 'edit' ? 'primary' : 'secondary'}
                  className="gap-2"
                  id="edit-button"
                  aria-label={t('page_edit_quotation')}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                  {t('page_edit_quotation')}
                </Button>
                <Button
                  onClick={() => handleTabChange('preview')}
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

            <div id="mobile-tab-switcher" className="flex sm:hidden gap-2">
              <div className="relative">
                <select
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value as EDIT_TYPES)}
                  aria-label={t('page_tab_switch')}
                >
                  <option value="edit">{t('page_edit_quotation')}</option>
                  <option value="preview">{t('page_preview_quotation')}</option>
                </select>
                <i className="absolute right-3 top-1/2 transform -translate-y-1/2 fa-solid fa-caret-down"></i>
              </div>

              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-scroll">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {quotationHistory.length > 0 && (
            <Button
              className="fixed bottom-16 left-8  xl:hidden"
              variant="primary"
              aria-label={t('page_view_export_history')}
              onClick={() => setShowHistory(true)}
            >
              <i className="fa-solid fa-clock-rotate-left text-sm"></i>
            </Button>
          )}

          <div className="relative">
            <div className="hidden xl:block absolute top-2 left-[-4%]">
              <QuotationHistoryList
                quotationHistory={quotationHistory}
                onClear={handleClearQuotationHistory}
                onLoad={handleLoadQuotation}
              />
            </div>
          </div>

          <QuotationHistoryModal open={showHistory} onClose={() => setShowHistory(false)}>
            <QuotationHistoryList
              quotationHistory={quotationHistory}
              onClear={handleClearQuotationHistory}
              onLoad={handleLoadQuotation}
            />
          </QuotationHistoryModal>

          {renderComponent[activeTab]}
        </div>
      </div>

      <footer className="sticky bottom-0 z-10 w-full space-x-2 bg-white py-4 text-center text-xs text-gray-700">
        <span>
          &copy; {dayjs().year()} {t('page_footer_copyright')}
        </span>
        <span className="mt-2 text-xs text-gray-700">
          {t('page_footer_icons_by')}
          <a
            href="https://www.flaticon.com/"
            title="Flaticon"
            className="underline hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flaticon
          </a>
          、
          <a
            href="https://fontawesome.com/"
            title="fontawesome"
            className="underline hover:text-blue-700"
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
    </div>
  );
}

'use client';

import { use, useState } from 'react';
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

type EDIT_TYPES = 'edit' | 'preview';

export default function Home() {
  const [activeTab, setActiveTab] = useState<EDIT_TYPES>('edit');
  const { quotationHistory, setQuotationHistory, updateQuotation } = useQuotationStore();

  const renderComponent = {
    edit: <QuotationForm />,
    preview: <QuotationPreview />,
  };

  useEffect(() => {
    handleRunAxeCheck();
  }, []);

  const handleRunAxeCheck = () => {
    if (process.env.NODE_ENV === 'development') {
      runAxeCheck();
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
  };

  const handleTabChange = (tab: EDIT_TYPES) => {
    handleRunAxeCheck();
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="z-10 flex-shrink-0 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex gap-4">
              <img src="/favicon.png" alt="logo" className="h-8 w-8" />
              <h1 className="text-2xl font-bold text-gray-900">Quotation Form</h1>
            </div>

            <div className="hidden space-x-4 sm:flex">
              <Button
                onClick={() => handleTabChange('edit')}
                variant={activeTab === 'edit' ? 'primary' : 'secondary'}
                className="gap-2"
                id="edit-button"
                aria-label="編輯報價單"
              >
                <i className="fa-solid fa-pen-to-square"></i>
                編輯報價單
              </Button>
              <Button
                onClick={() => handleTabChange('preview')}
                variant={activeTab === 'preview' ? 'primary' : 'secondary'}
                className="gap-2"
                id="preview-button"
                aria-label="預覽報價單"
              >
                <i className="fa-solid fa-eye"></i>
                預覽報價單
              </Button>
            </div>
            <div className="flex sm:hidden">
              <select
                className="block w-32 rounded-md border border-gray-300 bg-white py-2 pr-0 pl-2 text-sm text-gray-900 focus:border-blue-700 focus:ring-2 focus:ring-blue-700 focus:outline-none"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as EDIT_TYPES)}
                aria-label="切換頁籤"
              >
                <option value="edit">編輯報價單</option>
                <option value="preview">預覽報價單</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="relative">
            <QuotationHistoryList
              quotationHistory={quotationHistory}
              onClear={handleClearQuotationHistory}
              onLoad={handleLoadQuotation}
            />
          </div>
          {renderComponent[activeTab]}
        </div>
      </div>

      <footer className="sticky bottom-0 z-10 w-full space-x-2 bg-white py-4 text-center text-xs text-gray-700">
        <span>&copy; {dayjs().year()} Quotation Form For. All rights reserved.</span>
        <span className="mt-2 text-xs text-gray-700">
          All Icons by&nbsp;
          <a
            href="https://www.flaticon.com/"
            title="Flaticon"
            className="underline hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flaticon
          </a>
        </span>
      </footer>
    </div>
  );
}

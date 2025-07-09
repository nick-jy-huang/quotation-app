'use client';

import { useState } from 'react';
import QuotationForm from '@/components/QuotationForm';
import QuotationPreview from '@/components/QuotationPreview';
import Button from '@/components/prototype/Button';
import runAxeCheck from '@/utils/axe';
import { useEffect } from 'react';
import QuotationHistoryList from '@/components/QuotationHistoryList';
import { useQuotationStore } from '@/stores/quotationStore';
import { QuotationData } from '@/types/quotation';
import { handleSaveLocaleStorage } from '@/utils/saveLocaleStorage';
import QuotationHistoryModal from '@/components/QuotationHistoryList/Modal';
import { useTranslations } from 'next-intl';
import toast, { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { EDIT_TYPES } from '@/types/components';

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
    toast.success(t('page_clear_history_success'));
  };

  const handleLoadQuotation = (history: QuotationData) => {
    Object.entries(history).forEach(([key, value]) => {
      updateQuotation(key as keyof QuotationData, value);
    });
    setShowHistory(false);
    toast.success(t('page_load_quotation_success'));
  };

  const handleTabChange = (tab: EDIT_TYPES) => {
    handleRunAxeCheck();
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen flex-col">
      <Header onChange={handleTabChange} activeTab={activeTab} />

      <div className="flex-1 overflow-y-scroll">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {quotationHistory.length > 0 && (
            <Button
              className="fixed bottom-16 left-8 xl:hidden"
              variant="primary"
              aria-label={t('page_view_export_history')}
              onClick={() => setShowHistory(true)}
            >
              <i className="fa-solid fa-clock-rotate-left text-sm"></i>
            </Button>
          )}

          <div className="relative">
            <div className="absolute top-0 left-[-6%] hidden xl:block">
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

          <Toaster />

          {renderComponent[activeTab]}
        </div>
      </div>

      <Footer />
    </div>
  );
}

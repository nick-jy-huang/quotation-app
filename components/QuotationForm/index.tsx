import { useQuotationStore } from '@/stores/quotationStore';
import BaseInfo from '@/components/QuotationForm/BaseInfo';
import ClientInfo from '@/components/QuotationForm/ClientInfo';
import CompanyInfo from '@/components/QuotationForm/CompanyInfo';
import ItemList from '@/components/QuotationForm/ItemList';
import Textarea from '@/components/prototype/Textarea';
import TotalSection from '@/components/TotalSection';
import WorkContentInfo from '@/components/QuotationForm/WorkContentInfo';
import { useEffect } from 'react';
import { handleGetLocaleStorage } from '@/utils/saveLocaleStorage';
import { useTranslations } from 'next-intl';

export default function QuotationForm() {
  const t = useTranslations();
  const { quotation, updateQuotation, addItem, updateItem, removeItem, setQuotationHistory } =
    useQuotationStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedQuotation = handleGetLocaleStorage('quotation_current') || {};
      if (savedQuotation) {
        Object.entries(savedQuotation).forEach(([key, value]) => {
          updateQuotation(key as keyof typeof quotation, value);
        });
      }

      const history = handleGetLocaleStorage('quotation_history') || [];
      setQuotationHistory(history);
    }
  }, []);

  function reorderItems(from: number, to: number) {
    const updated = Array.from(quotation.items);
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    updateQuotation('items', updated);
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg shadow-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:shadow-black/70">
      <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">{t('quotationform_edittitle')}</h2>
      <div className="space-y-4 pt-4">
        <BaseInfo quotation={quotation} updateQuotation={updateQuotation} />
        <hr className="border-gray-200 dark:border-gray-700" />
        <CompanyInfo quotation={quotation} updateQuotation={updateQuotation} />
        <hr className="border-gray-200 dark:border-gray-700" />
        <ClientInfo quotation={quotation} updateQuotation={updateQuotation} />
        <hr className="border-gray-200 dark:border-gray-700" />
        <WorkContentInfo
          mainWorkContent={quotation.mainWorkContent}
          techStack={quotation.techStack}
          onMainWorkContentChange={(value) => updateQuotation('mainWorkContent', value)}
          onTechStackChange={(value) => updateQuotation('techStack', value)}
        />
        <hr className="border-gray-200 dark:border-gray-700" />
        <ItemList
          items={quotation.items}
          addItem={addItem}
          updateItem={updateItem}
          removeItem={removeItem}
          reorderItems={reorderItems}
        />
        <hr className="border-gray-200 dark:border-gray-700" />
        <Textarea
          label={t('quotationform_notes')}
          value={quotation.notes}
          onChange={(value) => updateQuotation('notes', value)}
          placeholder={t('quotationform_notesplaceholder')}
        />
        <hr className="border-gray-200 dark:border-gray-700" />
        <TotalSection items={quotation.items} />
      </div>
    </div>
  );
}

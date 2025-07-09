'use client';

import { useQuotationStore } from '@/stores/quotationStore';
import TotalSection from '@/components/TotalSection';
import QuotationNotes from './QuotationNotes';
import ItemTable from './ItemTable';
import ClientInfo from './ClientInfo';
import Header from './Header';
import html2canvas from 'html2canvas-pro';
import { useRef } from 'react';
import jsPDF from 'jspdf';
import Button from '@/components/prototype/Button';
import dayjs from 'dayjs';
import { handleSaveExportPDFToLocal, handleGetLocaleStorage } from '@/utils/saveLocaleStorage';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

export default function QuotationPreview() {
  const t = useTranslations();
  const {
    quotation: {
      freelancer,
      companyEmail,
      id,
      date,
      validUntil,
      customerName,
      customerPhone,
      customerEmail,
      customerAddress,
      items,
      mainWorkContent,
      techStack,
      notes,
    },
    setQuotationHistory,
  } = useQuotationStore();

  const pdfRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!pdfRef.current) return;
    const canvas = await html2canvas(pdfRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/jpeg', 0.85);
    const pdf = new jsPDF({ unit: 'px', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

    const dateStr = dayjs().format('YYYYMMDD');
    const customer = customerName || '客戶';
    const fileName = `${dateStr}-${customer}-報價單.pdf`;

    pdf.save(fileName);

    const history = {
      freelancer,
      companyEmail,
      id,
      date,
      validUntil,
      customerName,
      customerPhone,
      customerEmail,
      customerAddress,
      items,
      mainWorkContent,
      techStack,
      notes,
      fileName,
      exportedAt: Date.now(),
    };
    handleSaveExportPDFToLocal(history);

    const updatedHistory = handleGetLocaleStorage('quotation_history') || [];
    setQuotationHistory(updatedHistory);

    toast.success(t('quotationpreview_export_success'));
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="relative">
        <Button
          onClick={handleExportPDF}
          variant="warning"
          className="fixed right-8 bottom-18 w-auto gap-2 xl:hidden"
          aria-label={t('quotationpreview_export_pdf')}
        >
          <i className="fa-solid fa-download"></i>
        </Button>

        <div className="hidden xl:absolute xl:top-0 xl:right-[-16%] xl:block">
          <Button onClick={handleExportPDF} variant="warning" className="gap-2">
            <i className="fa-solid fa-download"></i> {t('quotationpreview_export_pdf')}
          </Button>
        </div>
      </div>

      <div ref={pdfRef} className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-lg">
        <Header
          freelancer={freelancer}
          companyEmail={companyEmail}
          id={id}
          date={date}
          validUntil={validUntil}
        />

        <ClientInfo
          customerName={customerName}
          customerPhone={customerPhone}
          customerEmail={customerEmail}
          customerAddress={customerAddress}
        />

        {mainWorkContent && (
          <div className="mb-4">
            <h3 className="mb-3 border-b pb-2 text-lg font-semibold text-gray-800">
              {t('quotationpreview_mainworkcontent')}
            </h3>
            <p className="whitespace-pre-wrap text-gray-700">{mainWorkContent}</p>
          </div>
        )}

        {techStack && (
          <div className="mb-4">
            <h3 className="mb-3 border-b pb-2 text-lg font-semibold text-gray-800">
              {t('quotationpreview_techstack')}
            </h3>
            <p className="whitespace-pre-wrap text-gray-700">{techStack}</p>
          </div>
        )}

        <div className="mb-4">
          <h3 className="mb-3 border-b pb-2 text-lg font-semibold text-gray-800">
            {t('quotationpreview_chargeitems')}
          </h3>
          <ItemTable items={items} />
        </div>

        {notes && (
          <div className="mb-3">
            <h3 className="mb-3 border-b pb-2 text-lg font-semibold text-gray-800">
              {t('quotationpreview_notes')}
            </h3>
            <p className="whitespace-pre-wrap text-gray-700">{notes}</p>
          </div>
        )}

        <div className="border-t pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="w-full pt-1">
              <QuotationNotes />
            </div>
            <div className="w-full space-y-2">
              <TotalSection items={items} />
            </div>
          </div>
        </div>

        <div className="mt-4 border-t pt-6 text-center text-sm text-gray-700">
          <p>{t('quotationpreview_contacthint')}</p>
        </div>
      </div>
    </div>
  );
}

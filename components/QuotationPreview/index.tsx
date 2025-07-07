"use client";

import { useQuotationStore } from "@/stores/quotationStore";
import TotalSection from "@/components/TotalSection";
import QuotationNotes from "./QuotationNotes";
import ItemTable from "./ItemTable";
import ClientInfo from "./ClientInfo";
import Header from "./Header";
import html2canvas from "html2canvas-pro";
import { useRef } from "react";
import jsPDF from "jspdf";
import Button from "@/components/prototype/Button";
import dayjs from "dayjs";

export default function QuotationPreview() {
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
  } = useQuotationStore();

  const pdfRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!pdfRef.current) return;
    const canvas = await html2canvas(pdfRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/jpeg", 0.85);
    const pdf = new jsPDF({ unit: "px", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

    const dateStr = dayjs().format("YYYYMMDD");
    const customer = customerName || "客戶";

    pdf.save(`${dateStr}-${customer}-報價單.pdf`);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="relative">
        <div className="absolute left-[-8rem]">{/* 輸出紀錄 */}</div>
        <div className="absolute right-0 md:right-[-8rem]">
          <div className="hidden md:flex">
            <Button
              onClick={handleExportPDF}
              variant="warning"
              className="gap-1"
            >
              <i className="fa-solid fa-download"></i> 匯出 PDF
            </Button>
          </div>
          <div className="flex md:hidden">
            <Button
              onClick={handleExportPDF}
              variant="warning"
              className="gap-1"
            >
              <i className="fa-solid fa-download"></i> 匯出 PDF
            </Button>
          </div>
        </div>
      </div>

      <div
        ref={pdfRef}
        className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-lg"
      >
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
              備註
            </h3>
            <p className="whitespace-pre-wrap text-gray-700">
              {mainWorkContent}
            </p>
          </div>
        )}

        {techStack && (
          <div className="mb-4">
            <h3 className="mb-3 border-b pb-2 text-lg font-semibold text-gray-800">
              備註
            </h3>
            <p className="whitespace-pre-wrap text-gray-700">{techStack}</p>
          </div>
        )}

        <div className="mb-4">
          <h3 className="mb-3 border-b pb-2 text-lg font-semibold text-gray-800">
            收費項目
          </h3>
          <ItemTable items={items} />
        </div>

        {notes && (
          <div className="mb-3">
            <h3 className="mb-3 border-b pb-2 text-lg font-semibold text-gray-800">
              備註
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
          <p>如有任何問題，歡迎隨時聯繫。</p>
        </div>
      </div>
    </div>
  );
}

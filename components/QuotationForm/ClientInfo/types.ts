import { QuotationData } from "@/types/quotation";

export interface ClientInfoProps {
  quotation: Pick<
    QuotationData,
    "customerName" | "customerPhone" | "customerEmail" | "customerAddress"
  >;
  updateQuotation: (field: keyof QuotationData, value: any) => void;
}

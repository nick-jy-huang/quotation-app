import { useQuotationStore } from "@/stores/quotationStore";
import BaseInfo from "@/components/QuotationForm/BaseInfo";
import ClientInfo from "@/components/QuotationForm/ClientInfo";
import CompanyInfo from "@/components/QuotationForm/CompanyInfo";
import ItemList from "@/components/QuotationForm/ItemList";
import Textarea from "@/components/prototype/Textarea";
import TotalSection from "@/components/TotalSection";
import WorkContentInfo from "@/components/QuotationForm/WorkContentInfo";

export default function QuotationForm() {
  const { quotation, updateQuotation, addItem, updateItem, removeItem } =
    useQuotationStore();

  function reorderItems(from: number, to: number) {
    const updated = Array.from(quotation.items);
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    updateQuotation("items", updated);
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <h2 className="text-3xl font-bold text-blue-600">編輯報價單</h2>
      <div className="space-y-4 pt-4">
        <BaseInfo quotation={quotation} updateQuotation={updateQuotation} />

        <CompanyInfo quotation={quotation} updateQuotation={updateQuotation} />

        <ClientInfo quotation={quotation} updateQuotation={updateQuotation} />

        <WorkContentInfo
          mainWorkContent={quotation.mainWorkContent}
          techStack={quotation.techStack}
          onMainWorkContentChange={(value) =>
            updateQuotation("mainWorkContent", value)
          }
          onTechStackChange={(value) => updateQuotation("techStack", value)}
        />

        <ItemList
          items={quotation.items}
          addItem={addItem}
          updateItem={updateItem}
          removeItem={removeItem}
          reorderItems={reorderItems}
        />

        <Textarea
          label="備註"
          value={quotation.notes}
          onChange={(value) => updateQuotation("notes", value)}
          placeholder="請輸入備註..."
        />

        <TotalSection items={quotation.items} />
      </div>
    </div>
  );
}

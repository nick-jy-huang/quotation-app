import { CompanyInfoProps } from "./types";
import Input from "@/components/prototype/Input";

export default function CompanyInfo({
  quotation,
  updateQuotation,
}: CompanyInfoProps) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold text-gray-700">接案人資訊</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="接案人"
          value={quotation.freelancer}
          placeholder="請輸入接案人..."
          onChange={(value) => updateQuotation("freelancer", value)}
        />
        <Input
          label="信箱"
          type="email"
          value={quotation.companyEmail}
          placeholder="請輸入信箱..."
          onChange={(value) => updateQuotation("companyEmail", value)}
        />
      </div>
    </div>
  );
}

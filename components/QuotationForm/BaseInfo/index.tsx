import { BaseInfoProps } from './types';
import Input from '@/components/prototype/Input';

export default function BaseInfo({ quotation, updateQuotation }: BaseInfoProps) {
  return (
    <div className="grid">
      <h3 className="mb-2 text-lg font-semibold text-gray-700">報價單信息</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Input
          label="報價單編號"
          value={quotation.id}
          placeholder="請輸入報價單編號..."
          onChange={(value) => updateQuotation('id', value)}
        />
        <Input
          label="報價日期"
          type="date"
          value={quotation.date}
          placeholder="請輸入報價日期..."
          onChange={(value) => updateQuotation('date', value)}
        />
        <Input
          label="有效期至"
          type="date"
          value={quotation.validUntil}
          placeholder="請輸入有效期至..."
          onChange={(value) => updateQuotation('validUntil', value)}
        />
      </div>
    </div>
  );
}

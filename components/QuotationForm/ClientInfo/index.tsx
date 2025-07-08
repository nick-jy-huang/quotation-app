import { ClientInfoProps } from './types';
import Input from '@/components/prototype/Input';

export default function ClientInfo({ quotation, updateQuotation }: ClientInfoProps) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold text-gray-700">客戶資訊</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="名稱"
          value={quotation.customerName}
          placeholder="請輸入名稱..."
          onChange={(value) => updateQuotation('customerName', value)}
        />
        <Input
          label="電話"
          type="tel"
          value={quotation.customerPhone}
          placeholder="請輸入電話..."
          onChange={(value) => updateQuotation('customerPhone', value)}
        />
        <Input
          label="信箱"
          type="email"
          value={quotation.customerEmail}
          placeholder="請輸入信箱..."
          onChange={(value) => updateQuotation('customerEmail', value)}
        />
        <Input
          label="地址"
          value={quotation.customerAddress}
          placeholder="請輸入地址..."
          onChange={(value) => updateQuotation('customerAddress', value)}
        />
      </div>
    </div>
  );
}

import { ClientInfoProps } from "./types";
export default function ClientInfo({
  customerName,
  customerPhone,
  customerEmail,
  customerAddress,
}: ClientInfoProps) {
  return (
    <div className="mb-4">
      <h3 className="mb-3 border-b pb-2 text-lg font-semibold text-gray-800">
        客戶資訊
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div>
          <p className="text-sm text-gray-600">客戶</p>
          <p className="font-medium">{customerName || "未填寫"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">電話</p>
          <p className="font-medium">{customerPhone || "未填寫"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">信箱</p>
          <p className="font-medium">{customerEmail || "未填寫"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">地址</p>
          <p className="font-medium">{customerAddress || "未填寫"}</p>
        </div>
      </div>
    </div>
  );
}

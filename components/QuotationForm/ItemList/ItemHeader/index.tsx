import Button from "@/components/prototype/Button";

import { ItemHeaderProps } from "./types";

export default function ItemHeader({ onAddItem }: ItemHeaderProps) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-700">收費項目</h3>
      <Button onClick={onAddItem} variant="primary" size="sm" className="gap-2">
        <i className="fa-solid fa-plus"></i> 新增
      </Button>
    </div>
  );
}

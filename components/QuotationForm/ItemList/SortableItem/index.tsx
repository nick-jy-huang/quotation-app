import Input from '@/components/prototype/Input';
import Button from '@/components/prototype/Button';
import { toThousand } from '@/utils/toThousand';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragHandle from '@/components/QuotationForm/ItemList/DragHandle';

import { SortableItemProps } from './types';

export default function SortableItem({
  item,
  index,
  updateItem,
  removeItem,
  itemsLength,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: isDragging ? '#f3f4f6' : undefined,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      role={undefined}
      tabIndex={undefined}
      className="border-t border-gray-200 px-4 py-2"
    >
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-5">
        <div className="md:col-span-2">
          <Input
            label={`項目 ${index + 1}`}
            value={item.name}
            size="sm"
            placeholder="請輸入項目..."
            onChange={(value) => updateItem(item.id, 'name', value)}
            data-testid={`item-name-${index}`}
          />
        </div>
        <Input
          label="時薪"
          type="number"
          size="sm"
          step={1}
          min={0}
          value={item.hourlyRate}
          placeholder="請輸入時薪..."
          onChange={(value) => updateItem(item.id, 'hourlyRate', value)}
        />
        <Input
          label="時數"
          type="number"
          step={1}
          min={0}
          size="sm"
          value={item.hours}
          placeholder="請輸入時數..."
          onChange={(value) => updateItem(item.id, 'hours', value)}
        />
        <div className="text-mx flex items-center justify-end pt-6 text-right font-medium text-gray-700">
          <div className="pr-4 text-xs">{toThousand(item.total)}</div>
          {itemsLength > 1 && (
            <Button onClick={() => removeItem(item.id)} variant="ghost" size="sm" aria-label="刪除">
              <i className="fa-solid fa-trash text-red-500"></i>
            </Button>
          )}
          <DragHandle listeners={listeners} />
        </div>
      </div>
    </div>
  );
}

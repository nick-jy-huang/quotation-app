import { ItemListProps } from './types';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import ClientOnly from '@/components/ClientOnly';
import SortableItem from './SortableItem';
import ItemHeader from './ItemHeader';
import { useMemo } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';

export default function ItemList({ items, addItem, updateItem, removeItem, reorderItems }: ItemListProps) {
  const itemsWithTotal = useMemo(
    () =>
      items?.map(item => ({
        ...item,
        total: item.hours * item.hourlyRate,
      })),
    [items]
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex(i => i.id === active.id);
    const newIndex = items.findIndex(i => i.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      reorderItems(oldIndex, newIndex);
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));
  const ids = items.map(i => i.id);
  return (
    <ClientOnly>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <ItemHeader onAddItem={addItem} />
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {itemsWithTotal.map((item, index) => (
            <SortableItem
              key={item.id}
              item={item}
              index={index}
              updateItem={updateItem}
              removeItem={removeItem}
              itemsLength={items.length}
            />
          ))}
        </SortableContext>
      </DndContext>
    </ClientOnly>
  );
}

export default function DragHandle({ listeners }: { listeners: any }) {
  return (
    <span
      {...listeners}
      tabIndex={0}
      className="ml-2 cursor-grab text-xs text-gray-700 select-none hover:text-gray-600"
      aria-label="拖曳排序"
      role="button"
    >
      <i className="fa-solid fa-bars"></i>
    </span>
  );
}

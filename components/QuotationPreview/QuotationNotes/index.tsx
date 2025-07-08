const notes = [
  '額外支援和維護需另開報價單。',
  '如途中有重大需求改變時，時程須另外計算。',
  '確定開案日期後，需先支付報價 30% 訂金。',
  '剩餘尾款在第一次驗收時要結清或是拆次匯款需在合約上註明。',
];

export default function QuotationNotes() {
  return (
    <div className="space-y-1 divide-gray-200 text-xs text-gray-600 pt-2">
      {notes.map((note, idx) => (
        <p key={idx}>
          {idx + 1}. {note}
        </p>
      ))}
    </div>
  );
}

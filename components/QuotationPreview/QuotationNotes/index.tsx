import { useTranslations } from 'next-intl';

const notes = [
  'quotationnotes_note1',
  'quotationnotes_note2',
  'quotationnotes_note3',
  'quotationnotes_note4',
];

export default function QuotationNotes() {
  const t = useTranslations();

  return (
    <div className="space-y-1 divide-gray-200 text-xs text-gray-600 pt-2">
      {notes.map((note, idx) => (
        <p key={idx}>
          {idx + 1}. {t(note)}
        </p>
      ))}
    </div>
  );
}

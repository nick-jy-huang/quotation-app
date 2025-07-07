import Textarea from '@/components/prototype/Textarea';
import { WorkContentInfoProps } from './types';

export default function WorkContentInfo({
  mainWorkContent,
  techStack,
  onMainWorkContentChange,
  onTechStackChange,
}: WorkContentInfoProps) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold text-gray-700">工作內容</h3>
      <Textarea
        label="主要工作內容"
        value={mainWorkContent}
        onChange={onMainWorkContentChange}
        placeholder="請輸入主要工作內容..."
      />
      <Textarea label="技術要求" value={techStack} onChange={onTechStackChange} placeholder="請輸入技術要求..." />
    </div>
  );
}

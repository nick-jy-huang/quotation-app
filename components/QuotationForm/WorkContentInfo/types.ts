export interface WorkContentInfoProps {
  mainWorkContent: string;
  techStack: string;
  onMainWorkContentChange: (value: string) => void;
  onTechStackChange: (value: string) => void;
}

import { EDIT_TYPES } from '@/types/components';

export type HeaderProps = {
  onChange: (tab: EDIT_TYPES) => void;
  activeTab: EDIT_TYPES;
};

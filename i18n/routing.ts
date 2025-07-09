import { defineRouting } from 'next-intl/routing';
import { EN_US, ZH_TW } from '@/constants/locale';

export const routing = defineRouting({
  locales: [EN_US, ZH_TW],
  defaultLocale: ZH_TW,
});

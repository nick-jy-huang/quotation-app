import { defineRouting } from 'next-intl/routing';

export const LOCALES = ['zh-TW', 'en-US'] as const;
export const DEFAULT_LOCALE = 'zh-TW' as const;

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});

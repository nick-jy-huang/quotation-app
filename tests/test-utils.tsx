import { NextIntlClientProvider } from 'next-intl';
import zhMessages from '@/messages/zh-TW.json';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

export function renderWithIntl(
  ui: ReactElement,
  {
    locale = 'zh-TW',
    messages = zhMessages,
    ...options
  }: { locale?: string; messages?: any } & RenderOptions = {},
) {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>,
    options,
  );
}

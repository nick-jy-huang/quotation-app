import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import '@/styles/globals.css';
import SplashScreen from '@/components/SplashScreen';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'og' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      type: 'website',
      title: t('title'),
      description: t('description'),
      url: 'https://quotation-app-zeta.vercel.app/',
      images: [
        {
          url: 'https://quotation-app-zeta.vercel.app/image.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
    icons: {
      icon: 'https://quotation-app-zeta.vercel.app/favicon.png',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SplashScreen />
      {children}
    </NextIntlClientProvider>
  );
}

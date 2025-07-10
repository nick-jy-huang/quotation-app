import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import SplashScreen from '@/components/SplashScreen';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-grid flex min-h-screen flex-col bg-gray-100`}
      >
        <SplashScreen />
        <main>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}

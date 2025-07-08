import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quotation Form",
  description: "Make quotations easily.",
  openGraph: {
    title: "Quotation Form",
    description: "Make quotations easily.",
    url: "https://quotation-app-zeta.vercel.app/",
    images: [
      {
        url: "https://quotation-app-zeta.vercel.app/image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: "https://quotation-app-zeta.vercel.app/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <main>{children}</main>
      </body>
    </html>
  );
}

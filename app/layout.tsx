import type { Metadata } from "next";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';
import { quicksand } from "./ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio - Billot",
  description: "Antonin's portfolio, made with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={`${quicksand.className} antialiased`}
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

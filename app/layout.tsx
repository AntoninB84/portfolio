import type { Metadata } from "next";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';
import { quicksand } from "./fonts";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/theme-toggle-button";
import { LocaleToggle } from "@/components/ui/locale-toggle-button";

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
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${quicksand.className} antialiased`}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="absolute right-3 top-[70px] sm:top-[3px] md:top-3">
              <div className="flex gap-2">
                <ModeToggle></ModeToggle>
                <LocaleToggle></LocaleToggle>
              </div>
            </div>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

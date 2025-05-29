import type { Metadata } from "next";
import { quicksand } from "./ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio - Billot",
  description: "Antonin's portfolio, made with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

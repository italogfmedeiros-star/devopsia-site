import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devopsia - Desenvolvimento de sites, apps e sistemas sob medida",
  description:
    "A Devopsia projeta e constroi sites, aplicativos e sistemas sob medida para empresas que precisam de software confiavel, do primeiro rascunho ao ar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div aria-hidden="true" className="app-backdrop" />
        <CursorSpotlight />
        {children}
      </body>
    </html>
  );
}

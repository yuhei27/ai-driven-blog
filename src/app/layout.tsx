import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AbemaBlog - 最新のトレンドと情報をお届け",
  description: "最新のトレンドと興味深い情報をお届けするブログです。日々更新される記事をお楽しみください。",
  keywords: "ブログ, トレンド, 情報, ニュース, 記事",
  authors: [{ name: "AbemaBlog Team" }],
  creator: "AbemaBlog",
  publisher: "AbemaBlog",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "AbemaBlog - 最新のトレンドと情報をお届け",
    description: "最新のトレンドと興味深い情報をお届けするブログです。日々更新される記事をお楽しみください。",
    url: '/',
    siteName: 'AbemaBlog',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AbemaBlog - 最新のトレンドと情報をお届け",
    description: "最新のトレンドと興味深い情報をお届けするブログです。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          
        </body>
      </html>
    </ClerkProvider>
  );
}

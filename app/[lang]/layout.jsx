
import { Geist, Geist_Mono } from "next/font/google";
import { Roboto } from 'next/font/google';
import Providers from "./providers"
import "../globals.css";


const roboto = Roboto({
  subsets: ['latin'],


  weight: ['400', '700'],
  style: ['normal', 'italic'],


  variable: '--font-roboto',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'MasterHub - Find a Master' : 'MasterHub - Pronađi Majstora',
    description: lang === 'en' ? 'Find reliable masters for your needs.' : 'Pronađite pouzdane majstore za vaše potrebe.',
  };
}

export default async function RootLayout({
  children,
  params
}) {
  const { lang } = await params;
  return (
    <html lang={lang || "en"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

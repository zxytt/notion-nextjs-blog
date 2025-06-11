import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { GeistSans } from 'geist/font/sans';
import Header from '@/components/shared/header';
import { Inter } from 'next/font/google';
import Blob from '@/components/blob';
import Footer from '@/components/shared/footer';
import { footer } from '@/data/footer';
import MobileMenu from '@/components/shared/mobile-menu';
import { getDictionary } from './dictionaries';
import { supportedLocales } from '@/data/site/supportedLocales';
import { cookies } from 'next/headers';
import Circles from '@/components/circles';
import { Suspense } from 'react';

export const metadata: Metadata = {
  alternates: {
    canonical: `/en`,
    languages: {
      en: '/en',
      bn: '/bn',
      es: '/es',
    },
  },
};

export default async function RootLayout({
  params: { lang },
  children,
}: {
  params: { lang: string };
  children: React.ReactNode;
}) {
  const supportedLang = supportedLocales.includes(lang)
    ? lang
    : cookies().get('lang')?.value ?? 'en';
  const { header } = supportedLang && (await getDictionary(supportedLang));
  return (
    <div className="w-full max-w-[70rem] px-4 md:px-0">
      <MobileMenu data={header} />
      <main className="md:px-4 md:overflow-x-hidden" >
        <Header data={header} className="md:hidden sticky top-4 z-100" />
        <Blob
          y="80px"
          className="left-[200px] lg:left-[50px] lg:h-[100px] lg:w-[100px] z-0"
        />
        <Blob
          className="right-[200px] top-[130px] lg:right-[32px] lg:h-[100px] lg:w-[100px] z-0"
          type="blob2"
          fill="#22C55E"
        />
        <Blob
          className="right-[300px] top-[440px] lg:right-[100px] lg:h-[100px] lg:w-[100px] z-0 opacity-40"
          type="blob3"
          fill="#A855F7"
        />
        {/* <Circles /> */}
        <Suspense>
          <div className="flex-grow min-h-screen md:overflow-x-hidden">
            {children}
          </div>
        </Suspense>
        <Footer text={footer.text} socials={footer.socials} />
      </main>
    </div>
  );
}

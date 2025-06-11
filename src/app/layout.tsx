import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { GeistSans } from 'geist/font/sans';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  creator: 'Jason Zhang',
  category: 'technology',
  applicationName: 'Jason Zhang',
  description: `Discover the portfolio of Jason Zhang (Arbizen), a talented JavaScript developer with expertise in React.js, Next.js, TypeScript, Supabase, Figma, and more. Explore a range of projects showcasing Arbizen's skills in web development, blogs, liked images and more.`,
  keywords: [
    'Portfolio',
    'Jason Zhang',
    'Jason Zhang Portfolio',
    'Jason Zhang Blog',
    'Jason Zhang Website',
    'Jason Zhang Personal Website',
    'Jason Zhang Projects',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL!),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(GeistSans.className, 'flex flex-col items-center sm:overflow-x-hidden')}>
        <ThemeProvider
          defaultTheme="light"
          enableSystem
          attribute="class"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

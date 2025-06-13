import Image from 'next/image';
import Link from 'next/link';
import HeaderItem from './header-item';
import { cn } from '@/lib/utils';

import ClientAnimatePresence from '../client-animate-presence';
import LanguageSelector from './language-selector';

export default function Header({
  className,
  data,
}: {
  className?: string;
  data: any;
}) {
  return (
    <header
      className={cn(
        'px-4 py-2 border border-blue-100 rounded-xl flex items-center justify-between bg-transparent backdrop-blur-2xl shadow-sm shadow-blue-100/50 sm:px-8 sm:py-6 sm:rounded-none sm:shadow-none sm:border-none sm:bg-white/90 sm:backdrop-blur-none',
        className,
      )}
    >
      <div className="flex gap-4 items-center">
        <Image
          className="rounded-full"
          src="/arb.png"
          alt="A professional potrait of Jason Zhang"
          height={50}
          width={50}
        />
        <h1 className="font-medium text-2xl leading-tight sm:text-xl">
          <Link href={data.siteName.url}>{data.siteName.text}</Link>
        </h1>
      </div>
      <menu className="flex mx-4 gap-8 sm:hidden">
        <ClientAnimatePresence>
          {data.nav.map((item: any) => (
            <HeaderItem key={item.url} route={item.url} name={item.name} />
          ))}
        </ClientAnimatePresence>
      </menu>
      {/* <menu className="flex gap-8">
        <LanguageSelector />
      </menu> */}
    </header>
  );
}

import Card from '@/components/card';
import PageInfo from '@/components/shared/page-info';
import SubTitle from '@/components/shared/sub-title';
import Badge from '@/components/ui/badge';
import { Activity } from '@/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Home — Find everything about me',
  description: 'This is the home page',
};

export const dynamic = 'force-dynamic';

export default async function Home() {

  return (
    <div>
      <PageInfo
        header={
          <div>
            <h1 className="font-black text-[40px] sm:text-[36px]">
              I <span className="text-blue-500">code.</span>
            </h1>
          </div>
        }
        description={`These are some of the best poems I’ve read so far. The list updates really frequently as I love reading poems a lot.`}
        footer={
          <Link
            className="flex gap-1 items-center text-blue-500 font-bold text-[14px]"
            href="/about"
          >
            Read more on about page <ArrowRight size={16} />
          </Link>
        }
      />
    </div>
  );
}

import Card from '@/components/card';
import PageInfo from '@/components/shared/page-info';
import SubTitle from '@/components/shared/sub-title';
import Badge from '@/components/ui/badge';
import { Activity, Blog as BlogType, ImageType, Feedback } from '@/types';
import { ArrowRight, Download, Subtitles } from 'lucide-react';
import Link from 'next/link';
import { getDictionary } from './dictionaries';
import Breadcumb from '@/components/shared/breadcumb';
import Pagination from '@/lib/Pagination';
// @ts-ignore
import dateformat from 'dateformat';
import PageAnimation from '@/components/page-animation';
import Script from 'next/script';
import { supportedLocales } from '@/data/site/supportedLocales';
import { cookies } from 'next/headers';
import Blog from '@/components/blogs/blog';
import Image from 'next/image';
import Circles from '@/components/circles';
import { SkillBeam } from '@/components/skill-beam';
import CustomImage from '@/components/gallery-image';
import { Client } from '@notionhq/client';
import PublicFeedbackList from '@/components/feedback/public-feedback-list';
import Project from './projects/project'

export const metadata = {
  title: `Home — Arb Rahim Badsa's Activities and Portfolio`,
  description: `Discover the portfolio of Arb Rahim Badsa (Arbizen), a talented JavaScript developer with expertise in React.js, Next.js, TypeScript, Supabase, Figma, and more. Explore a range of projects showcasing Arbizen's skills in web development, blogs, liked images and more.`,
};

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Arbizen',
  alternateName: ['Arb', 'Arb Rahim Badsa'],
  url: process.env.NEXT_PUBLIC_API_URL!,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${process.env.NEXT_PUBLIC_API_URL}/en/blogs?category={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export const dynamic = 'force-dynamic';

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {

  const pageName = `projects`;
  const pagination = new Pagination({ limit: 3 }, pageName);
  const data = await pagination.getCurrentPageData('desc');

  const projects = data[pageName]?.data;

  const blogs = 'blogs';
  const paginationBlogs = new Pagination({ limit: 3 }, blogs);
  const dataBlogs = await paginationBlogs.getCurrentPageData('desc');
  const blogsData: BlogType[] = dataBlogs[blogs]?.data;

  const supportedLang = supportedLocales.includes(lang)
    ? lang
    : (cookies().get('lang')?.value ?? 'en');

  const dictionary = await getDictionary(supportedLang);

  return (
    <PageAnimation>
      <div className="flex items-start w-full sm:flex-wrap">
        <PageInfo
          breadcumb={
            <Breadcumb
              firstNav={{
                name: dictionary.page.home.name.third,
                url: `/${lang}`,
              }}
            />
          }
          header={
            <div>
              <h1 className="font-black text-[40px] sm:text-[36px]">
                {dictionary.page.home.name.first}{' '}
                <span className="text-blue-500">
                  {dictionary.page.home.name.second}
                </span>
              </h1>
            </div>
          }
          description={dictionary.page.home.description}
          footer={
            <div className="flex flex-row gap-4 sm:gap-4">
              <Link
                className="flex gap-1 items-center text-blue-500 font-bold text-[14px]"
                href="/about"
              >
                {dictionary.page.home.knowMoreAboutMe} <ArrowRight size={16} />
              </Link>
              <Link
                className="flex gap-1 items-center text-green-600 font-bold text-[14px]"
                href="/arbizen-cv.pdf"
                target="_blank"
                download
              >
                {dictionary.page.home.downloadCV} <Download size={16} />
              </Link>
            </div>
          }
        />
        <div className="w-full">
          <SkillBeam />
        </div>
      </div>

      <div className="mt-4">
        <SubTitle
          title={dictionary.page.home.recentBlogs}
          seeMoreText={dictionary.page.home.allBlogs}
          seeMoreLink={`/${lang}/blogs`}
        />
      </div>
      <div className="mt-4 w-full">
        <div className="grid grid-cols-1 gap-4">
          {blogsData?.map((blog: BlogType) => {
            if (blog.isPublished === false) return null;
            return (
              <Blog
                id={blog.id}
                slug={blog.slug}
                title={blog.title}
                categories={blog.categories}
                date={blog.date}
                description={blog.description}
                image={blog.image}
                key={blog.id}
                readTime={blog.readTime}
                lang={lang}
                page={dictionary.page}
              />
            );
          })}
        </div>
      </div>

      <div className='mt-8'>
        <SubTitle
          title={dictionary.page.home.recentProjects}
          seeMoreText={dictionary.page.home.allProjects}
        />
      </div>
      <div className="mt-4 w-full">
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project: any) => (
            <Project key={project.id} {...project} lang={lang} />
          ))}
        </div>
      </div>

      <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-blue-700 mb-1">
              Want to ask a question or give feedback?
            </h2>
            <p className="text-slate-700">
              I&apos;m always here to help you or answer your questions.
            </p>
          </div>
          <Link
            href={`/${lang}/feedback`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors"
          >
            Give Feedback <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <Script
        id="json-ld-site"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />
    </PageAnimation>
  );
}

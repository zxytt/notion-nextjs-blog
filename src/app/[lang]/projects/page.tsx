import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Link from 'next/link';
import { Project as ProjectType } from '@/types';
// @ts-ignore
import { Tag, TagContainer } from '@/components/tag';
import { getDictionary } from '../dictionaries';
import Breadcumb from '@/components/shared/breadcumb';
import Pagination from '@/lib/Pagination';
import PaginationNavigation from '@/components/shared/pagination-navigation';
import PageAnimation from '@/components/page-animation';
import { supportedLocales } from '@/data/site/supportedLocales';
import { cookies } from 'next/headers';
import Project from '@/components/Projects/project';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Projects — Best selection of my recent projects',
  description: 'This is the project page',
};

export default async function Blogs({
  params,
  searchParams,
}: {
  params: { slug: string; lang: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const category = searchParams?.category || '';
  const pageNumber = searchParams?.page || 1;

  const pageName = `projects`;
  const pagination = new Pagination(searchParams, pageName);
  const data = await pagination.getCurrentPageData('desc');

  const projects: ProjectType[] = data[pageName]?.data;
  const nextPageUrl = pagination.nextPageUrl(data);

  const supportedLang = supportedLocales.includes(params.lang)
    ? params.lang
    : cookies().get('lang')?.value ?? 'en';

  const { page: dictionaryPage } = await getDictionary(supportedLang);

  const tagsWithLink = [
    { name: 'All', path: 'All' },
    { name: 'Next.js', path: 'NextJs' },
    { name: 'React.js', path: 'React' },
  ];

  return (
    <PageAnimation>
      <PageInfo
        breadcumb={
          <Breadcumb
            firstNav={{
              name: dictionaryPage.home.name.third,
              url: `/${params.lang}`,
            }}
            secondNav={{
              name: dictionaryPage.projects.name,
              url: `/${params.lang}/projects`,
            }}
          />
        }
        header={<PageTitle title={dictionaryPage.projects.name} />}
        description={dictionaryPage.projects.description}
        itemsLength={projects.length}
        footer={
          <>
            <TagContainer>
              {tagsWithLink.map((tag) => (
                <Link
                  href={`/${params.lang}/${pageName}?${
                    pageNumber ? `page=${pageNumber}` : ''
                  }&category=${tag.path}`}
                  key={tag.name}
                >
                  <Tag
                    className={
                      category === tag.name
                        ? 'border-slate-800'
                        : 'border-slate-200'
                    }
                  >
                    {tag.name}
                  </Tag>
                </Link>
              ))}
            </TagContainer>
          </>
        }
      />
      <section className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <Project key={project.id} {...project} lang={params.lang} />
        ))}

        {projects.length > 24 && (
          <PaginationNavigation nextPageLink={nextPageUrl} />
        )}

        {projects.length === 0 && (
          <div className="w-full h-[200px] flex items-center justify-center">
            <p className="text-slate-500 text-base">
              Looks like it&apos;s too empty here!
            </p>
          </div>
        )}
      </section>
    </PageAnimation>
  );
}

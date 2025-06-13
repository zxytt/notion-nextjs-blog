import { notionManager } from '@/lib/NotionManager';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';
import CodeBlock from '@/components/markdown/Code';
import Pre from '@/components/markdown/Pre';
import Image from '@/components/markdown/Image';
import Paragraph from '@/components/markdown/Paragraph';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Badge from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Metadata, ResolvingMetadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from "next/link";

// @ts-ignore
import dateformat from 'dateformat';
import { notFound } from 'next/navigation';
import PageAnimation from '@/components/page-animation';

export const dynamic = 'force-dynamic';

type Props = {
  params: { slug: string; lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const decodedSlug = decodeURIComponent(params.slug);
  const id = decodedSlug.split('#')?.[1] || (searchParams?.id as string);

  if (!id) {
    return {
      title: 'Blog',
      description: 'Description',
      openGraph: {
        title: 'Blog',
        description: 'Description',
        images: [
          'https://source.unsplash.com/a-person-standing-on-top-of-a-mountain-nMzbnMzMjYU',
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Blog',
        description: 'Description',
        creator: '@arbizzen',
        images: [
          'https://source.unsplash.com/a-person-standing-on-top-of-a-mountain-nMzbnMzMjYU',
        ], // Must be an absolute URL
      },
    };
  }

  const pageInfo = await notionManager.getPageById(id);

  const coverUrl =
    (pageInfo as any)?.cover?.external?.url ||
    (pageInfo as any).cover?.file?.url ||
    'https://source.unsplash.com/a-person-standing-on-top-of-a-mountain-nMzbnMzMjYU';
  const title =
    (pageInfo as any)?.properties?.title?.title[0]?.plain_text || 'Blog';
  const description =
    (pageInfo as any)?.properties?.description?.rich_text[0]?.plain_text ||
    'Description';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [coverUrl],
      url:
        process.env.NEXT_PUBLIC_API_URL +
        `/${params.lang}/blogs/${params.slug}?id=${id}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@arbizzen',
      images: [coverUrl], // Must be an absolute URL
    },
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: { slug: string; lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = searchParams?.id as string;
  const decodedSlug = decodeURIComponent(params.slug);

  const extractedId = decodedSlug.split('#')?.[1];

  if (!extractedId && !id) {
    return notFound();
  }

  const mdString = await notionManager.getMdStringById(id || extractedId);
  const pageInfo = await notionManager.getPageById(id || extractedId);
  const coverUrl =
    (pageInfo as any)?.cover?.external?.url ||
    (pageInfo as any).cover?.file?.url ||
    'https://source.unsplash.com/a-person-standing-on-top-of-a-mountain-nMzbnMzMjYU';
  const title =
    (pageInfo as any)?.properties?.title?.title[0]?.plain_text || 'Blog';
  const description =
    (pageInfo as any)?.properties?.description?.rich_text[0]?.plain_text ||
    'Description';
  const categories =
    'multi_select' in (pageInfo as any)?.properties.category
      ? (pageInfo as any)?.properties.category.multi_select.map(
          (tag: any) => tag.name,
        )
      : [];
  const readTime = (pageInfo as any)?.properties?.readTime?.number || 0;
  const date = (pageInfo as any)?.properties?.createdAt?.created_time || '';

  

  const customComponents = {
    code: CodeBlock,
    pre: Pre,
    img: Image,
    p: Paragraph,
  };

  return (
    <PageAnimation>
      <Link
        href={`/${params.lang}/blogs`}
      >
        <Button 
          variant="outline" 
          size="sm"
          className="mt-8 self-start bg-background/80 backdrop-blur-sm animate-slide-in transition-all duration-200 hover:scale-105 hover:shadow-md"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />Back
        </Button>
      </Link>
      <PageInfo
        header={<PageTitle title={title} />}
        description={description}
        footer={
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-orange-100 text-orange-500">
              {dateformat(date, 'ddS mmmm, yyyy')}
            </Badge>
            <Badge className="bg-blue-100 text-blue-500">
              {readTime} min read
            </Badge>
            {categories.map((category: string) => (
              <Badge key={category} className="bg-red-100 text-red-500">
                {category}
              </Badge>
            ))}
          </div>
        }
      />
      <div className="flex flex-col relative z-50">
        <Image
          src={coverUrl}
          alt={title}
          className="max-h-[450px] object-cover rounded-xl"
          quality={60}
        />
        <article className="flex justify-center mt-16 min-w-[800px] sm:min-w-full">
          <Markdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeAutolinkHeadings]}
            components={customComponents}
            className="prose w-full min-w-[800px] sm:min-w-full"
          >
            {typeof mdString === 'string' ? mdString : JSON.stringify(mdString)}
          </Markdown>
        </article>  
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            image: coverUrl,
            datePublished: date,
            description,
            author: {
              '@type': 'Person',
              name: 'Jason Zhang',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Arbizen',
              logo: {
                '@type': 'ImageObject',
                url: 'https://avatars.githubusercontent.com/u/34975329?v=4',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id':
                process.env.NEXT_PUBLIC_API_URL +
                `/${params.lang}/blogs/${params.slug}`,
            },
          }),
        }}
      />
    </PageAnimation>
  );
}

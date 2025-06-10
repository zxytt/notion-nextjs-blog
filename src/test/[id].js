import { getPage, getPageContent } from "../../lib/notion";
import ReactMarkdown from "react-markdown";
import { NotionRenderer } from "react-notion-x";
import { TableOfContents } from "react-notion-x";

export async function getStaticPaths() {
  const posts = await getDatabase(process.env.NOTION_DATABASE_ID);
  
  const paths = posts.map((post) => ({
    params: { id: post.id.replace(/-/g, "") },
  }));
  
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const pageId = context.params.id;
  const page = await getPage(pageId);
  const content = await getPageContent(pageId);
  
  return {
    props: {
      page,
      content,
    },
    revalidate: 60 * 60, // 1小时重新验证
  };
}

export default function Post({ page, content }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {page.properties.Name.title[0]?.plain_text || '无标题'}
          </h1>
          <div className="flex items-center text-gray-500 mb-6">
            <span>{page.properties.Date.date?.start || '未知日期'}</span>
          </div>
        </header>
        
        <div className="prose prose-lg max-w-none">
          <NotionRenderer blockMap={content} />
        </div>
      </article>
    </div>
  );
}  
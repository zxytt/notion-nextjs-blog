import { getDatabase } from "../lib/notion";
import Link from "next/link";

export async function getStaticProps() {
  const posts = await getDatabase(process.env.NOTION_DATABASE_ID);
  
  return {
    props: {
      posts,
    },
    revalidate: 60 * 15, // 15分钟重新验证
  };
}

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Notion博客</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">
                <Link href={`/posts/${post.id}`}>
                  <a>{post.properties.Name.title[0]?.plain_text || '无标题'}</a>
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">
                {post.properties.Description.rich_text[0]?.plain_text || '无描述'}
              </p>
              <div className="text-sm text-gray-500">
                {post.properties.Date.date?.start || '未知日期'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}  
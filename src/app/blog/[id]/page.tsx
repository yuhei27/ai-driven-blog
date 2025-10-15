import { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlogDetail from '../../components/BlogDetail';
import StructuredData from '../../components/StructuredData';

interface BlogPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const id = params.id;
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog/${id}`, {
      cache: 'no-store'
    });
    const data = await response.json();
    
    if (data.message === 'Success' && data.post) {
      return {
        title: `${data.post.title} | AbemaBlog`,
        description: data.post.description,
        openGraph: {
          title: data.post.title,
          description: data.post.description,
          type: 'article',
          publishedTime: data.post.date,
        },
      };
    }
  } catch (error) {
    console.error('Error fetching post for metadata:', error);
  }
  
  return {
    title: '記事が見つかりません | AbemaBlog',
    description: 'お探しの記事が見つかりませんでした。',
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData type="article" data={{ id: params.id }} />
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BlogDetail id={params.id} />
      </main>

      <Footer />
    </div>
  );
}

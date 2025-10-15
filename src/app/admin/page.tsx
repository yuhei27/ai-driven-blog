import { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdminPanel from '../../components/AdminPanel';

export const metadata: Metadata = {
  title: '管理画面 | AbemaBlog',
  description: 'ブログ記事の管理画面です。記事の投稿、編集、削除ができます。',
  robots: 'noindex, nofollow', // 管理画面は検索エンジンにインデックスしない
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">管理画面</h1>
          <div className="w-24 h-1 bg-red-600"></div>
        </div>
        
        <AdminPanel />
      </main>

      <Footer />
    </div>
  );
}

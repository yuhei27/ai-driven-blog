import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogList from '../components/BlogList';
import StructuredData from '../components/StructuredData';

export default function Home(){
  return(
    <div className="min-h-screen bg-gray-50">
      <StructuredData type="website" data={{}} />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-red-600">AbemaBlog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            最新のトレンドと興味深い情報をお届けします。
            日々更新される記事をお楽しみください。
          </p>
        </section>

        {/* Blog Posts */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">最新記事</h2>
            <div className="w-24 h-1 bg-red-600"></div>
          </div>
          
          <BlogList />
        </section>
      </main>

      <Footer />
    </div>
  )
}
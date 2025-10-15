'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface BlogDetailProps {
  id: string;
}

export default function BlogDetail({ id }: BlogDetailProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/${id}`);
      const data = await response.json();
      
      if (data.message === 'Success' && data.post) {
        setPost(data.post);
      } else if (data.message === 'Not Found') {
        setError('記事が見つかりませんでした');
      } else {
        setError('記事の取得に失敗しました');
      }
    } catch (err) {
      setError('記事の取得中にエラーが発生しました');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">{error}</div>
        <Link 
          href="/"
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 inline-block"
        >
          ホームに戻る
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">記事が見つかりません</div>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Article Header */}
      <div className="p-8 border-b border-gray-200">
        <div className="text-sm text-gray-500 mb-4">
          {formatDate(post.date)}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex items-center space-x-4">
          <Link 
            href="/"
            className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
          >
            ← 一覧に戻る
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <div className="p-8">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.description}
          </div>
        </div>
      </div>

      {/* Article Footer */}
      <div className="p-8 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            投稿日: {formatDate(post.date)}
          </div>
          
          <div className="flex space-x-4">
            <Link 
              href="/"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

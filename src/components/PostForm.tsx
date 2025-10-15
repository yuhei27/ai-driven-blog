'use client';

import { useState } from 'react';

interface Post {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface PostFormProps {
  post?: Post | null;
  onSuccess: () => void;
}

export default function PostForm({ post, onSuccess }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [description, setDescription] = useState(post?.description || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = post ? `/api/blog/${post.id}` : '/api/blog';
      const method = post ? 'PUT' : 'POST';

      console.log('Sending request:', { url, method, title, descriptionLength: description.length });
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && data.message === 'Success') {
        alert(post ? '記事を更新しました' : '記事を投稿しました');
        onSuccess();
      } else {
        setError(data.error || (post ? '記事の更新に失敗しました' : '記事の投稿に失敗しました'));
      }
    } catch (err) {
      console.error('Error submitting post:', err);
      console.error('Error details:', {
        url,
        method,
        title,
        description: description.substring(0, 100) + '...',
        error: err
      });
      setError(post ? '記事の更新中にエラーが発生しました' : '記事の投稿中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          タイトル *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-600 focus:border-red-600"
          placeholder="記事のタイトルを入力してください"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          本文 *
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={12}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-600 focus:border-red-600"
          placeholder="記事の本文を入力してください"
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? '処理中...' : (post ? '更新' : '投稿')}
        </button>
        
        <button
          type="button"
          onClick={onSuccess}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}

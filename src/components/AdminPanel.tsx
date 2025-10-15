'use client';

import { useState, useEffect } from 'react';
import BlogList from './BlogList';
import PostForm from './PostForm';

interface Post {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'list' | 'create' | 'edit'>('list');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostCreated = () => {
    setActiveTab('list');
    setRefreshKey(prev => prev + 1);
  };

  const handlePostUpdated = () => {
    setActiveTab('list');
    setEditingPost(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setActiveTab('edit');
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm('この記事を削除してもよろしいですか？')) {
      return;
    }

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('記事を削除しました');
        setRefreshKey(prev => prev + 1);
      } else {
        alert('記事の削除に失敗しました');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('記事の削除中にエラーが発生しました');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab('list')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'list'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            記事一覧
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'create'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            新規投稿
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'list' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">記事一覧</h2>
              <AdminBlogList 
                key={refreshKey}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
              />
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">新規記事の投稿</h2>
            <PostForm onSuccess={handlePostCreated} />
          </div>
        )}

        {activeTab === 'edit' && editingPost && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">記事の編集</h2>
            <PostForm 
              post={editingPost} 
              onSuccess={handlePostUpdated}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Admin-specific blog list with edit/delete actions
function AdminBlogList({ onEdit, onDelete }: { 
  onEdit: (post: Post) => void; 
  onDelete: (id: number) => void; 
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      
      if (data.message === 'Success') {
        setPosts(data.posts);
      } else {
        setError('記事の取得に失敗しました');
      }
    } catch (err) {
      setError('記事の取得中にエラーが発生しました');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">{error}</div>
        <button 
          onClick={fetchPosts}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          再試行
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">記事がありません</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{post.description}</p>
              <div className="text-xs text-gray-500">{formatDate(post.date)}</div>
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => onEdit(post)}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors duration-200"
              >
                編集
              </button>
              <button
                onClick={() => onDelete(post.id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors duration-200"
              >
                削除
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

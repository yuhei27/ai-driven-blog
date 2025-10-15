import Link from 'next/link';

interface BlogCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function BlogCard({ id, title, description, date }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <Link href={`/blog/${id}`}>
        <div className="p-6">
          {/* Date */}
          <div className="text-sm text-gray-500 mb-2">
            {formatDate(date)}
          </div>
          
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-red-600 transition-colors duration-200">
            {title}
          </h2>
          
          {/* Description */}
          <p className="text-gray-600 line-clamp-3 leading-relaxed">
            {description}
          </p>
          
          {/* Read more indicator */}
          <div className="mt-4 text-red-600 text-sm font-medium">
            続きを読む →
          </div>
        </div>
      </Link>
    </article>
  );
}

interface StructuredDataProps {
  type: 'website' | 'article';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "AbemaBlog",
          "description": "最新のトレンドと興味深い情報をお届けするブログです。",
          "url": process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        };

      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": data.title,
          "description": data.description,
          "datePublished": data.date,
          "dateModified": data.date,
          "author": {
            "@type": "Organization",
            "name": "AbemaBlog Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "AbemaBlog",
            "logo": {
              "@type": "ImageObject",
              "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/logo.png`
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blog/${data.id}`
          }
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}

"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Tag, ArrowRight, Loader2 } from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  category: string;
  imageURL: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  message: string;
  response: Blog[];
}

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      setBlogs(data.response || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150): string => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  const handleReadMore = (blog: Blog): void => {
    setSelectedBlog(blog);
  };

  const closeBlogModal = (): void => {
    setSelectedBlog(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-yellow-400 animate-spin mx-auto mb-4" />
          <p className="text-yellow-400 text-xl font-medium">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-black text-2xl font-bold">!</span>
          </div>
          <h2 className="text-yellow-400 text-2xl font-bold mb-2">Oops!</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={fetchBlogs}
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-black via-gray-900 to-black   border-yellow-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl pb-1 font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4 animate-fade-in">
              Blogs
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-slide-up">
              Discover amazing stories, insights, and ideas that inspire and inform
            </p>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Blog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Tag className="w-12 h-12 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">No blogs found</h3>
            <p className="text-gray-500">Check back later for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <article 
                key={blog._id}
                className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-yellow-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/10"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={blog.imageURL} 
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSIjZmZkNzAwIiBmb250LXNpemU9IjE4IiBmb250LWZhbWlseT0iQXJpYWwiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                      <Tag className="w-3 h-3 mr-1" />
                      {blog.category}
                    </span>
                    <span className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(blog.createdAt)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h2>

                  {/* Content Preview */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {truncateContent(blog.content)}
                  </p>

                  {/* Read More Button */}
                  <button 
                    onClick={() => handleReadMore(blog)}
                    className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-300 group-hover:translate-x-1 transform"
                  >
                    Read More 
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Blog Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-yellow-400/30 animate-slide-up">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                  {selectedBlog.category}
                </span>
                <span className="text-gray-400 text-sm flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(selectedBlog.createdAt)}
                </span>
              </div>
              <button 
                onClick={closeBlogModal}
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200"
              >
                <span className="text-gray-400 text-xl">×</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <img 
                src={selectedBlog.imageURL} 
                alt={selectedBlog.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSIjZmZkNzAwIiBmb250LXNpemU9IjE4IiBmb250LWZhbWlseT0iQXJpYWwiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+';
                }}
              />
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {selectedBlog.title}
              </h1>
              <div className="prose prose-invert prose-yellow max-w-none">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedBlog.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.2s both;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        article {
          animation: slide-up 0.6s ease-out both;
        }
        
        .prose-yellow a {
          color: #ffd700;
        }
        
        .prose-yellow a:hover {
          color: #ffed4e;
        }
      `}</style>
    </div>
  );
};

export default BlogPage;
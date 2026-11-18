import React, { useState, useMemo } from 'react';
import { Filter, ArrowUpDown, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { useBlog } from '../context/useBlog';
import { ArticleCard } from '../components/ArticleCard';
import { SearchBar } from '../components/SearchBar';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';

export const Articles: React.FC = () => {
  const {
    posts,
    users,
    isLoading,
    error,
    refreshData,
    getUserById,
    getCommentsForPost,
    getCategoryForPost,
    getReadingTime,
    getDateForPost,
  } = useBlog();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'id-asc' | 'id-desc' | 'title'>('id-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // Filter & sort
  const filteredPosts = useMemo(() => {
    const result = posts.filter((post) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.body.toLowerCase().includes(q);

      const matchesAuthor =
        selectedAuthor === 'all' || post.userId === Number(selectedAuthor);

      const matchesCategory =
        selectedCategory === 'all' ||
        getCategoryForPost(post.id) === selectedCategory;

      return matchesSearch && matchesAuthor && matchesCategory;
    });

    result.sort((a, b) => {
      if (sortBy === 'id-desc') return b.id - a.id;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return a.id - b.id;
    });

    return result;
  }, [posts, searchQuery, selectedAuthor, selectedCategory, sortBy, getCategoryForPost]);

  const totalPages = Math.ceil(filteredPosts.length / pageSize) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, currentPage, pageSize]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedAuthor('all');
    setSelectedCategory('all');
    setSortBy('id-asc');
    setCurrentPage(1);
  };

  if (isLoading && posts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Loading message="Fetching the complete library of articles..." count={9} />
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ErrorMessage message={error} onRetry={refreshData} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pb-6 border-b border-[#D5D0C7]">
        <span className="text-xs font-mono uppercase tracking-widest text-[#123F40] font-semibold">
          The Full Archive
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#242A29]">
          All Articles
        </h1>
        <p className="text-sm sm:text-base text-[#777873] leading-relaxed font-sans">
          Browse through {posts.length} independent pieces on culture, philosophy, technology, and design.
        </p>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="bg-[#FAF9F6] border border-[#D5D0C7] rounded-lg p-5 sm:p-6 space-y-4 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search bar */}
          <div className="md:col-span-6">
            <SearchBar
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                setCurrentPage(1);
              }}
              placeholder="Search by title, subject, or keywords..."
            />
          </div>

          {/* Author filter */}
          <div className="md:col-span-3">
            <div className="relative">
              <select
                value={selectedAuthor}
                onChange={(e) => {
                  setSelectedAuthor(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter articles by author"
                className="w-full bg-[#FAF9F6] text-[#242A29] text-xs font-medium rounded-md px-3.5 py-3 border border-[#D5D0C7] focus:border-[#123F40] focus:ring-1 focus:ring-[#123F40] focus:outline-none appearance-none cursor-pointer"
              >
                <option value="all">All Authors ({users.length})</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#777873] pointer-events-none" />
            </div>
          </div>

          {/* Sorting */}
          <div className="md:col-span-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'id-asc' | 'id-desc' | 'title')
                }
                aria-label="Sort articles"
                className="w-full bg-[#FAF9F6] text-[#242A29] text-xs font-medium rounded-md px-3.5 py-3 border border-[#D5D0C7] focus:border-[#123F40] focus:ring-1 focus:ring-[#123F40] focus:outline-none appearance-none cursor-pointer"
              >
                <option value="id-asc">Sort by ID: Ascending</option>
                <option value="id-desc">Sort by ID: Descending</option>
                <option value="title">Sort by Title: A &ndash; Z</option>
              </select>
              <ArrowUpDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#777873] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results Counter & Reset */}
        <div className="pt-3 border-t border-[#D5D0C7]/70 flex flex-wrap items-center justify-between gap-3 text-xs text-[#777873]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-[#123F40]" />
            <span>
              Showing <strong className="text-[#242A29]">{filteredPosts.length}</strong> of{' '}
              <strong className="text-[#242A29]">{posts.length}</strong> articles
            </span>
          </div>

          {(searchQuery || selectedAuthor !== 'all' || selectedCategory !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="text-[#123F40] hover:underline font-medium cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Grid of Articles */}
      {filteredPosts.length === 0 ? (
        <div className="bg-[#FAF9F6] border border-dashed border-[#D5D0C7] rounded-lg p-12 text-center max-w-lg mx-auto space-y-4">
          <h3 className="font-editorial text-2xl font-semibold text-[#242A29]">
            No Articles Found
          </h3>
          <p className="text-sm text-[#777873]">
            No publications matched your search terms or author filter.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded bg-[#123F40] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#245C5A] transition-all cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {paginatedPosts.map((post) => (
            <ArticleCard
              key={post.id}
              post={post}
              author={getUserById(post.userId)}
              category={getCategoryForPost(post.id)}
              readingTime={getReadingTime(post.body)}
              date={getDateForPost(post.id)}
              commentsCount={getCommentsForPost(post.id).length}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {filteredPosts.length > pageSize && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#D5D0C7] text-xs text-[#777873]">
          <span>
            Page <strong className="text-[#242A29]">{currentPage}</strong> of{' '}
            <strong className="text-[#242A29]">{totalPages}</strong>
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-3 py-2 rounded bg-[#FAF9F6] border border-[#D5D0C7] text-[#242A29] hover:bg-[#F0ECE5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="hidden sm:flex items-center gap-1 px-2">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                // Only show around current page
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded text-xs font-medium transition-colors cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-[#123F40] text-[#FAF9F6]'
                          : 'bg-[#FAF9F6] text-[#777873] border border-[#D5D0C7] hover:bg-[#F0ECE5]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
                  return (
                    <span key={pageNum} className="px-1 text-[#777873]">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 px-3 py-2 rounded bg-[#FAF9F6] border border-[#D5D0C7] text-[#242A29] hover:bg-[#F0ECE5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

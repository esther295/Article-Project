import React, { useState, useMemo } from 'react';
import {
  FileText,
  LayoutGrid,
  List,
  Filter,
  UserCheck,
} from 'lucide-react';
import { useApiData } from '../../context/useApiData';
import type { Post, ViewMode } from '../../types/api';
import { SearchInput } from '../common/SearchInput';
import { PostCard } from './PostCard';
import { PostTable } from './PostTable';
import { PostDetailsModal } from './PostDetailsModal';
import { Pagination } from '../common/Pagination';
import { EmptyState } from '../common/EmptyState';
import { PostCardSkeleton } from '../common/LoadingSkeleton';
import { ErrorAlert } from '../common/ErrorAlert';
import { Badge } from '../common/Badge';

export const PostsTab: React.FC = () => {
  const {
    posts,
    users,
    isLoading,
    error,
    refreshAll,
    getUserById,
    getCommentsForPost,
    selectedPostId,
    setSelectedPostId,
    viewUserDetails,
  } = useApiData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortField, setSortField] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Filtered and sorted posts
  const filteredPosts = useMemo(() => {
    const result = posts.filter((post) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query);

      const matchesAuthor =
        selectedAuthorId === 'all' || post.userId === Number(selectedAuthorId);

      return matchesSearch && matchesAuthor;
    });

    result.sort((a, b) => {
      const comparison =
        sortField === 'title' ? a.title.localeCompare(b.title) : a.id - b.id;
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [posts, searchQuery, selectedAuthorId, sortField, sortDirection]);

  // Reset page when filters change
  const totalPages = Math.ceil(filteredPosts.length / pageSize) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, currentPage, pageSize]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedAuthorId('all');
    setCurrentPage(1);
  };

  if (isLoading && posts.length === 0) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-slate-900 rounded-xl animate-pulse"></div>
        <PostCardSkeleton count={6} />
      </div>
    );
  }

  if (error && posts.length === 0) {
    return <ErrorAlert message={error} onRetry={refreshAll} isRetrying={isLoading} />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Search, Author Filter & View Controls */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <SearchInput
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
            placeholder="Search article title or body content..."
            className="flex-1"
          />

          {/* Author Filter Dropdown */}
          <div className="relative flex items-center min-w-[200px]">
            <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={selectedAuthorId}
              onChange={(e) => {
                setSelectedAuthorId(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter posts by author"
              className="w-full bg-slate-900 text-slate-200 text-xs rounded-lg pl-9 pr-8 py-2 border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none appearance-none cursor-pointer"
            >
              <option value="all">All Authors ({users.length})</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.company.name})
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* View mode toggle & item counter */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
          <Badge variant="slate" size="sm">
            <FileText className="w-3 h-3 text-slate-400" />
            {filteredPosts.length} of {posts.length} Posts
          </Badge>

          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid view"
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Table view"
              aria-label="Table view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Posts List or Table */}
      {filteredPosts.length === 0 ? (
        <EmptyState
          title="No posts found"
          message="No articles matched your search query or selected author filter."
          actionText="Reset Filters"
          onAction={handleResetFilters}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              author={getUserById(post.userId)}
              commentsCount={getCommentsForPost(post.id).length}
              onSelect={(p: Post) => setSelectedPostId(p.id)}
              onAuthorClick={(userId: number) => viewUserDetails(userId)}
            />
          ))}
        </div>
      ) : (
        <PostTable
          posts={paginatedPosts}
          getUserById={getUserById}
          getCommentsCount={(postId: number) => getCommentsForPost(postId).length}
          onSelect={(p: Post) => setSelectedPostId(p.id)}
          onAuthorClick={(userId: number) => viewUserDetails(userId)}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      )}

      {/* Pagination Controls */}
      {filteredPosts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredPosts.length}
          itemsPerPage={pageSize}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
          pageSizeOptions={[6, 12, 24, 48]}
        />
      )}

      {/* Post Details Modal */}
      <PostDetailsModal
        postId={selectedPostId}
        onClose={() => setSelectedPostId(null)}
      />
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  LayoutGrid,
  List,
  Filter,
  FileText,
  X,
} from 'lucide-react';
import { useApiData } from '../../context/useApiData';
import type { Comment, ViewMode } from '../../types/api';
import { SearchInput } from '../common/SearchInput';
import { CommentCard } from './CommentCard';
import { CommentTable } from './CommentTable';
import { CommentDetailsModal } from './CommentDetailsModal';
import { Pagination } from '../common/Pagination';
import { EmptyState } from '../common/EmptyState';
import { TableSkeleton } from '../common/LoadingSkeleton';
import { ErrorAlert } from '../common/ErrorAlert';
import { Badge } from '../common/Badge';

export const CommentsTab: React.FC = () => {
  const {
    comments,
    posts,
    isLoading,
    error,
    refreshAll,
    getPostById,
    viewPostDetails,
    selectedCommentId,
    setSelectedCommentId,
    commentsFilterPostId,
    setCommentsFilterPostId,
  } = useApiData();

  const [searchQuery, setSearchQuery] = useState('');
  const [localPostFilter, setLocalPostFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [sortField, setSortField] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Derive active filter (if navigated from another tab with commentsFilterPostId)
  const selectedPostFilter =
    commentsFilterPostId !== null ? String(commentsFilterPostId) : localPostFilter;

  // Filtered and sorted comments
  const filteredComments = useMemo(() => {
    const result = comments.filter((comment) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        comment.name.toLowerCase().includes(query) ||
        comment.email.toLowerCase().includes(query) ||
        comment.body.toLowerCase().includes(query);

      const matchesPost =
        selectedPostFilter === 'all' ||
        comment.postId === Number(selectedPostFilter);

      return matchesSearch && matchesPost;
    });

    result.sort((a, b) => {
      const comparison =
        sortField === 'name' ? a.name.localeCompare(b.name) : a.id - b.id;
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [comments, searchQuery, selectedPostFilter, sortField, sortDirection]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredComments.length / pageSize) || 1;
  const paginatedComments = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredComments.slice(start, start + pageSize);
  }, [filteredComments, currentPage, pageSize]);

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
    setLocalPostFilter('all');
    setCommentsFilterPostId(null);
    setCurrentPage(1);
  };

  if (isLoading && comments.length === 0) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-slate-900 rounded-xl animate-pulse"></div>
        <TableSkeleton rows={10} cols={5} />
      </div>
    );
  }

  if (error && comments.length === 0) {
    return <ErrorAlert message={error} onRetry={refreshAll} isRetrying={isLoading} />;
  }

  const activeFilteredPost =
    selectedPostFilter !== 'all' ? getPostById(Number(selectedPostFilter)) : null;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Active Filter Banner if filtered by a specific post */}
      {activeFilteredPost && (
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-between gap-3 text-xs text-indigo-300">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="truncate">
              Filtering comments for Post #{activeFilteredPost.id}:{' '}
              <strong className="text-white capitalize">{activeFilteredPost.title}</strong>
            </span>
          </div>
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900/60 border border-slate-700/60 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Clear Post Filter
          </button>
        </div>
      )}

      {/* Control Bar: Search, Post Filter, View Modes */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <SearchInput
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
            placeholder="Search by comment name, author email, or body..."
            className="flex-1"
          />

          {/* Post Filter Dropdown */}
          <div className="relative flex items-center min-w-[210px]">
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={selectedPostFilter}
              onChange={(e) => {
                const val = e.target.value;
                setLocalPostFilter(val);
                setCommentsFilterPostId(val === 'all' ? null : Number(val));
                setCurrentPage(1);
              }}
              aria-label="Filter comments by article"
              className="w-full bg-slate-900 text-slate-200 text-xs rounded-lg pl-9 pr-8 py-2 border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none appearance-none cursor-pointer"
            >
              <option value="all">All Articles ({posts.length})</option>
              {posts.map((post) => (
                <option key={post.id} value={post.id}>
                  Post #{post.id}: {post.title.slice(0, 30)}...
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* View mode toggle & item counter */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
          <Badge variant="slate" size="sm">
            <MessageSquare className="w-3 h-3 text-slate-400" />
            {filteredComments.length} of {comments.length} Comments
          </Badge>

          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Table view"
              aria-label="Table view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid view"
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Comments List or Table */}
      {filteredComments.length === 0 ? (
        <EmptyState
          title="No comments found"
          message="No discussion records match your search query or selected post filter."
          actionText="Reset Filters"
          onAction={handleResetFilters}
        />
      ) : viewMode === 'table' ? (
        <CommentTable
          comments={paginatedComments}
          getPostById={getPostById}
          onSelect={(c: Comment) => setSelectedCommentId(c.id)}
          onPostClick={(postId: number) => viewPostDetails(postId)}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedComments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              post={getPostById(comment.postId)}
              onSelect={(c) => setSelectedCommentId(c.id)}
              onPostClick={(postId: number) => viewPostDetails(postId)}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {filteredComments.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredComments.length}
          itemsPerPage={pageSize}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
          pageSizeOptions={[10, 20, 50, 100]}
        />
      )}

      {/* Comment Details Modal */}
      <CommentDetailsModal
        commentId={selectedCommentId}
        onClose={() => setSelectedCommentId(null)}
      />
    </div>
  );
};

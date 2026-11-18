import React from 'react';
import { MessageSquare, ArrowUpDown, ExternalLink } from 'lucide-react';
import type { Post, User } from '../../types/api';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface PostTableProps {
  posts: Post[];
  getUserById: (id: number) => User | undefined;
  getCommentsCount: (postId: number) => number;
  onSelect: (post: Post) => void;
  onAuthorClick: (userId: number) => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: string) => void;
}

export const PostTable: React.FC<PostTableProps> = ({
  posts,
  getUserById,
  getCommentsCount,
  onSelect,
  onAuthorClick,
  onSort,
}) => {
  return (
    <div className="w-full bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-slate-950/20">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-850/90 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-4 w-12 text-center">
                <button
                  onClick={() => onSort && onSort('id')}
                  className="flex items-center gap-1 hover:text-white mx-auto transition-colors"
                >
                  ID
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </button>
              </th>
              <th className="py-3.5 px-4 min-w-[280px]">
                <button
                  onClick={() => onSort && onSort('title')}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  Article Title & Body
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </button>
              </th>
              <th className="py-3.5 px-4 min-w-[180px]">Author</th>
              <th className="py-3.5 px-4 text-center">Comments</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {posts.map((post) => {
              const author = getUserById(post.userId);
              const commentsCount = getCommentsCount(post.id);

              return (
                <tr
                  key={post.id}
                  className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  onClick={() => onSelect(post)}
                >
                  <td className="py-3.5 px-4 text-center font-mono text-slate-500">
                    #{post.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors capitalize line-clamp-1 max-w-md">
                      {post.title}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 max-w-md">
                      {post.body}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {author ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAuthorClick(author.id);
                        }}
                        className="flex items-center gap-2 hover:text-indigo-400 transition-colors group/author text-left"
                      >
                        <div className="w-6 h-6 rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold shrink-0">
                          {author.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <span className="font-medium text-slate-200 block truncate max-w-[140px]">
                            {author.name}
                          </span>
                          <span className="text-[10px] text-slate-400 block font-mono">
                            @{author.username}
                          </span>
                        </div>
                      </button>
                    ) : (
                      <span className="text-slate-500 font-mono">User #{post.userId}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <Badge variant="indigo" size="sm">
                      <MessageSquare className="w-3 h-3" />
                      {commentsCount}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(post);
                      }}
                      rightIcon={<ExternalLink className="w-3 h-3" />}
                      className="py-1 px-2.5 text-xs border-slate-700 hover:border-indigo-500 hover:text-indigo-400"
                    >
                      Read
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

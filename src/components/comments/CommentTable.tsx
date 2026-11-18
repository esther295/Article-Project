import React from 'react';
import { Mail, FileText, ArrowUpDown, ExternalLink } from 'lucide-react';
import type { Comment, Post } from '../../types/api';
import { Button } from '../common/Button';

interface CommentTableProps {
  comments: Comment[];
  getPostById: (id: number) => Post | undefined;
  onSelect: (comment: Comment) => void;
  onPostClick: (postId: number) => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: string) => void;
}

export const CommentTable: React.FC<CommentTableProps> = ({
  comments,
  getPostById,
  onSelect,
  onPostClick,
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
              <th className="py-3.5 px-4 min-w-[200px]">
                <button
                  onClick={() => onSort && onSort('name')}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  Comment Subject & Author
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </button>
              </th>
              <th className="py-3.5 px-4 min-w-[260px]">Comment Message</th>
              <th className="py-3.5 px-4 min-w-[200px]">Matched Post (postId)</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {comments.map((comment) => {
              const post = getPostById(comment.postId);

              return (
                <tr
                  key={comment.id}
                  className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  onClick={() => onSelect(comment)}
                >
                  <td className="py-3.5 px-4 text-center font-mono text-slate-500">
                    #{comment.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors capitalize truncate max-w-[180px]">
                          {comment.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono truncate max-w-[180px] flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                          <span>{comment.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-300 line-clamp-2 max-w-sm">
                      {comment.body}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {post ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPostClick(post.id);
                        }}
                        className="text-left group/post hover:text-indigo-400 transition-colors max-w-[220px]"
                      >
                        <div className="flex items-center gap-1 text-[10px] text-indigo-400 font-mono">
                          <FileText className="w-3 h-3 shrink-0" />
                          Post #{post.id}
                        </div>
                        <div className="text-[11px] text-slate-300 truncate group-hover/post:text-indigo-300 capitalize">
                          {post.title}
                        </div>
                      </button>
                    ) : (
                      <span className="font-mono text-slate-500 text-xs">
                        Post #{comment.postId}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(comment);
                      }}
                      rightIcon={<ExternalLink className="w-3 h-3" />}
                      className="py-1 px-2.5 text-xs border-slate-700 hover:border-indigo-500 hover:text-indigo-400"
                    >
                      View
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

import React from 'react';
import { Mail, FileText, ExternalLink } from 'lucide-react';
import type { Comment, Post } from '../../types/api';
import { Button } from '../common/Button';

interface CommentCardProps {
  comment: Comment;
  post?: Post;
  onSelect: (comment: Comment) => void;
  onPostClick: (postId: number) => void;
}

export const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  post,
  onSelect,
  onPostClick,
}) => {
  return (
    <div className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-indigo-950/20 group">
      <div>
        {/* Header: Commenter avatar & Email */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow">
              {comment.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h4
                onClick={() => onSelect(comment)}
                className="font-semibold text-white text-xs sm:text-sm group-hover:text-indigo-300 transition-colors truncate capitalize cursor-pointer"
              >
                {comment.name}
              </h4>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono truncate">
                <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                <span className="truncate">{comment.email}</span>
              </div>
            </div>
          </div>
          <span className="font-mono text-slate-500 text-[11px] bg-slate-800/80 px-2 py-0.5 rounded shrink-0">
            #{comment.id}
          </span>
        </div>

        {/* Comment Body */}
        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
          {comment.body}
        </p>

        {/* Matched Post Context */}
        {post && (
          <button
            onClick={() => onPostClick(post.id)}
            className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/40 transition-colors group/post"
          >
            <div className="flex items-center gap-1.5 text-[10px] text-indigo-400 font-semibold uppercase tracking-wider mb-0.5">
              <FileText className="w-3 h-3" />
              On Post #{post.id}
            </div>
            <p className="text-xs text-slate-300 line-clamp-1 group-hover/post:text-indigo-300 capitalize">
              {post.title}
            </p>
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-500 font-mono">
          Ref: postId-{comment.postId}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSelect(comment)}
          rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
          className="text-xs text-indigo-400 hover:text-indigo-300 p-0"
        >
          Inspect
        </Button>
      </div>
    </div>
  );
};

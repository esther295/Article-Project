import React from 'react';
import { MessageSquare, ExternalLink } from 'lucide-react';
import type { Post, User } from '../../types/api';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface PostCardProps {
  post: Post;
  author?: User;
  commentsCount: number;
  onSelect: (post: Post) => void;
  onAuthorClick: (userId: number) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  author,
  commentsCount,
  onSelect,
  onAuthorClick,
}) => {
  return (
    <div className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-indigo-950/20 group">
      <div>
        {/* Post Meta & Author Header */}
        <div className="flex items-center justify-between gap-2 text-xs mb-3">
          <button
            onClick={() => author && onAuthorClick(author.id)}
            className="flex items-center gap-2 text-slate-300 hover:text-indigo-400 transition-colors group/author text-left"
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center text-xs font-bold group-hover/author:border-indigo-400">
              {author ? author.name.charAt(0) : 'U'}
            </div>
            <div className="min-w-0">
              <span className="font-medium text-slate-200 block truncate max-w-[150px]">
                {author ? author.name : `User #${post.userId}`}
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                {author ? `@${author.username}` : `ID: ${post.userId}`}
              </span>
            </div>
          </button>

          <span className="font-mono text-slate-500 text-[11px] bg-slate-800 px-2 py-0.5 rounded">
            #{post.id}
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(post)}
          className="font-bold text-white text-sm sm:text-base line-clamp-2 leading-snug cursor-pointer group-hover:text-indigo-300 transition-colors capitalize mt-2"
        >
          {post.title}
        </h3>

        {/* Truncated Body */}
        <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
          {post.body}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <Badge variant="emerald" size="sm">
          <MessageSquare className="w-3 h-3" />
          {commentsCount} comments
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSelect(post)}
          rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
          className="text-xs text-indigo-400 hover:text-indigo-300 p-0"
        >
          View Post
        </Button>
      </div>
    </div>
  );
};

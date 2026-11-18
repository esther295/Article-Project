import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, MessageSquare } from 'lucide-react';
import type { Post, User } from '../types/api';

interface ArticleCardProps {
  post: Post;
  author?: User;
  category: string;
  readingTime: string;
  date: string;
  commentsCount: number;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  post,
  author,
  category,
  readingTime,
  date,
  commentsCount,
}) => {
  return (
    <article className="group bg-[#FAF9F6] border border-[#D5D0C7] rounded-lg p-6 sm:p-7 flex flex-col justify-between hover:border-[#123F40]/50 hover:shadow-md transition-all duration-200">
      <div>
        {/* Card Header: Category & Date */}
        <div className="flex items-center justify-between text-xs mb-3.5">
          <span className="px-2.5 py-0.5 rounded-full bg-[#F0ECE5] text-[#123F40] font-medium tracking-wide uppercase text-[11px] border border-[#D5D0C7]">
            {category}
          </span>
          <span className="text-[#777873] font-mono text-[11px]">{date}</span>
        </div>

        {/* Title */}
        <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-[#242A29] leading-snug group-hover:text-[#123F40] transition-colors capitalize mb-3">
          <Link to={`/articles/${post.id}`}>
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-[#777873] leading-relaxed line-clamp-3 font-sans mb-6">
          {post.body}
        </p>
      </div>

      {/* Card Footer: Author info & Read link */}
      <div className="pt-4 border-t border-[#D5D0C7]/80 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-[#777873]">
          {author ? (
            <Link
              to={`/authors/${author.id}`}
              className="flex items-center gap-2 hover:text-[#123F40] transition-colors truncate max-w-[65%]"
            >
              <div className="w-6 h-6 rounded-full bg-[#E6E1D8] border border-[#D5D0C7] flex items-center justify-center text-[11px] font-bold text-[#123F40] shrink-0">
                {author.name.charAt(0)}
              </div>
              <span className="truncate font-medium text-[#242A29]">
                {author.name}
              </span>
            </Link>
          ) : (
            <span className="text-slate-400">Author #{post.userId}</span>
          )}

          <span className="flex items-center gap-1 font-mono text-[11px] shrink-0">
            <Clock className="w-3 h-3 text-[#123F40]" />
            {readingTime}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-[#777873] flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-[#123F40]" />
            <span>{commentsCount} comments</span>
          </span>

          <Link
            to={`/articles/${post.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#123F40] hover:text-[#245C5A] group-hover:translate-x-0.5 transition-transform"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};

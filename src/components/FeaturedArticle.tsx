import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MessageSquare, ArrowRight, User as UserIcon } from 'lucide-react';
import type { Post, User } from '../types/api';

interface FeaturedArticleProps {
  post: Post;
  author?: User;
  category: string;
  readingTime: string;
  date: string;
  commentsCount: number;
}

export const FeaturedArticle: React.FC<FeaturedArticleProps> = ({
  post,
  author,
  category,
  readingTime,
  date,
  commentsCount,
}) => {
  return (
    <article className="bg-[#FAF9F6] border border-[#D5D0C7] rounded-lg p-6 sm:p-10 lg:p-12 shadow-sm transition-all hover:shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Metadata, Category & Lead Title */}
        <div className="lg:col-span-8 space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#123F40] text-[#FAF9F6] font-mono uppercase tracking-wider font-semibold">
              Featured Story
            </span>
            <span className="px-3 py-1 rounded-full bg-[#F0ECE5] text-[#123F40] border border-[#D5D0C7] font-medium uppercase tracking-wider">
              {category}
            </span>
            <span className="text-[#777873] font-mono">{date}</span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#242A29] leading-tight capitalize">
            <Link
              to={`/articles/${post.id}`}
              className="hover:text-[#123F40] transition-colors"
            >
              {post.title}
            </Link>
          </h2>

          <p className="text-base sm:text-lg text-[#777873] leading-relaxed line-clamp-3 font-sans">
            {post.body}
          </p>

          {/* Author info & Read link */}
          <div className="pt-4 border-t border-[#D5D0C7]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {author ? (
              <Link
                to={`/authors/${author.id}`}
                className="flex items-center gap-3 group/author text-left"
              >
                <div className="w-10 h-10 rounded-full bg-[#E6E1D8] border border-[#D5D0C7] flex items-center justify-center text-[#123F40] font-editorial font-bold text-sm group-hover/author:border-[#123F40] transition-colors">
                  {author.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#242A29] group-hover/author:text-[#123F40] transition-colors">
                    {author.name}
                  </h4>
                  <p className="text-xs text-[#777873] font-mono">
                    @{author.username} • {author.company.name}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-2 text-xs text-[#777873]">
                <UserIcon className="w-4 h-4" />
                <span>Author ID #{post.userId}</span>
              </div>
            )}

            <div className="flex items-center gap-4 text-xs text-[#777873]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#123F40]" />
                {readingTime}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-[#123F40]" />
                {commentsCount} comments
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Highlight Box */}
        <div className="lg:col-span-4 bg-[#F0ECE5] border border-[#D5D0C7] rounded-md p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#123F40] font-semibold block">
              Curator’s Note
            </span>
            <p className="text-sm text-[#242A29] italic font-editorial leading-relaxed">
              &ldquo;An essential inquiry exploring the intersection of modern systems, human perception, and deliberate craft.&rdquo;
            </p>
          </div>

          <Link
            to={`/articles/${post.id}`}
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded bg-[#123F40] hover:bg-[#245C5A] text-[#FAF9F6] text-sm font-medium tracking-wide transition-all shadow-sm"
          >
            <span>Read Article</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

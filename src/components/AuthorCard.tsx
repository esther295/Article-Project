import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Building, Globe, ArrowRight, BookOpen } from 'lucide-react';
import type { User } from '../types/api';

interface AuthorCardProps {
  user: User;
  postsCount: number;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ user, postsCount }) => {
  return (
    <div className="group bg-[#FAF9F6] border border-[#D5D0C7] rounded-lg p-6 sm:p-7 flex flex-col justify-between hover:border-[#123F40]/50 hover:shadow-md transition-all duration-200">
      <div>
        {/* Header: Initial Avatar & Name */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#E6E1D8] border border-[#D5D0C7] flex items-center justify-center text-lg font-editorial font-bold text-[#123F40] shadow-2xs group-hover:scale-105 transition-transform">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-editorial text-xl font-semibold text-[#242A29] group-hover:text-[#123F40] transition-colors leading-tight">
                <Link to={`/authors/${user.id}`}>
                  {user.name}
                </Link>
              </h3>
              <p className="text-xs text-[#777873] font-mono mt-0.5">
                @{user.username}
              </p>
            </div>
          </div>

          <span className="text-[11px] font-mono text-[#777873] bg-[#F0ECE5] px-2 py-0.5 rounded border border-[#D5D0C7]">
            #{user.id}
          </span>
        </div>

        {/* Company & Catchphrase */}
        <div className="mb-4 p-3 rounded bg-[#F0ECE5]/70 border border-[#D5D0C7]/80 text-xs text-[#242A29]">
          <div className="flex items-center gap-1.5 font-medium text-[#123F40] mb-0.5">
            <Building className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{user.company.name}</span>
          </div>
          <p className="text-[#777873] italic font-editorial line-clamp-1">
            &ldquo;{user.company.catchPhrase}&rdquo;
          </p>
        </div>

        {/* Contact links */}
        <div className="space-y-1.5 text-xs text-[#777873] mb-6">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#123F40] shrink-0" />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-[#123F40] shrink-0" />
            <span className="truncate">{user.website}</span>
          </div>
        </div>
      </div>

      {/* Footer: Articles count & Profile link */}
      <div className="pt-4 border-t border-[#D5D0C7]/80 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-[#777873] font-mono">
          <BookOpen className="w-3.5 h-3.5 text-[#123F40]" />
          <span>{postsCount} articles</span>
        </span>

        <Link
          to={`/authors/${user.id}`}
          className="inline-flex items-center gap-1 font-semibold uppercase tracking-wider text-[#123F40] hover:text-[#245C5A] group-hover:translate-x-0.5 transition-transform"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

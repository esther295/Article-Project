import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import type { Comment } from '../types/api';

interface CommentCardProps {
  comment: Comment;
}

export const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <div className="bg-[#FAF9F6] border border-[#D5D0C7] rounded-lg p-5 sm:p-6 space-y-3 shadow-2xs hover:border-[#123F40]/40 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E6E1D8] border border-[#D5D0C7] flex items-center justify-center text-xs font-bold text-[#123F40] shrink-0 font-editorial">
            {comment.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#242A29] capitalize leading-tight">
              {comment.name}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-[#777873] font-mono mt-0.5">
              <Mail className="w-3 h-3 text-[#123F40]" />
              <span className="truncate">{comment.email}</span>
            </div>
          </div>
        </div>

        <span className="text-[11px] font-mono text-[#777873] bg-[#F0ECE5] px-2 py-0.5 rounded border border-[#D5D0C7]">
          #{comment.id}
        </span>
      </div>

      <p className="text-sm text-[#242A29]/90 leading-relaxed font-sans pt-1">
        {comment.body}
      </p>

      <div className="pt-2 flex items-center gap-1.5 text-[11px] text-[#777873] font-mono">
        <MessageCircle className="w-3 h-3 text-[#123F40]" />
        <span>Verified reader response</span>
      </div>
    </div>
  );
};

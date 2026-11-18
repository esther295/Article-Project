import React from 'react';
import { Mail, Phone, Building, ExternalLink } from 'lucide-react';
import type { User } from '../../types/api';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface UserCardProps {
  user: User;
  postsCount: number;
  onSelect: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, postsCount, onSelect }) => {
  return (
    <div className="bg-slate-900/70 border border-slate-800 hover:border-slate-700/90 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-indigo-950/20 group">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-base shadow-md group-hover:scale-105 transition-transform">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors truncate">
                {user.name}
              </h3>
              <p className="text-xs text-slate-400 font-mono truncate">@{user.username}</p>
            </div>
          </div>
          <span className="font-mono text-slate-500 text-[11px] bg-slate-800/80 px-2 py-0.5 rounded">
            #{user.id}
          </span>
        </div>

        {/* Company Pill */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1.5 rounded-lg">
            <Building className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
            <span className="font-medium truncate">{user.company.name}</span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 text-xs text-slate-300 mb-4">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{user.phone}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <Badge variant="purple" size="sm">
          {postsCount} articles
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSelect(user)}
          rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
          className="text-xs text-indigo-400 hover:text-indigo-300 p-0"
        >
          View Profile
        </Button>
      </div>
    </div>
  );
};

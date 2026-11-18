import React from 'react';
import { Mail, Phone, Building, ArrowUpDown, ExternalLink } from 'lucide-react';
import type { User } from '../../types/api';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface UserTableProps {
  users: User[];
  getPostsCount: (userId: number) => number;
  onSelect: (user: User) => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  getPostsCount,
  onSelect,
  onSort,
}) => {
  return (
    <div className="w-full bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-slate-950/20">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-850/90 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-4 w-12 text-center">ID</th>
              <th className="py-3.5 px-4">
                <button
                  onClick={() => onSort && onSort('name')}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  Name & Username
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </button>
              </th>
              <th className="py-3.5 px-4">Contact Info</th>
              <th className="py-3.5 px-4">Company</th>
              <th className="py-3.5 px-4 text-center">Articles</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {users.map((user) => {
              const postsCount = getPostsCount(user.id);
              return (
                <tr
                  key={user.id}
                  className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  onClick={() => onSelect(user)}
                >
                  <td className="py-3.5 px-4 text-center font-mono text-slate-500">
                    #{user.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow">
                        {user.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                          {user.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          @{user.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[200px]">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate max-w-[200px]">{user.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-medium text-slate-200">
                      <Building className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate max-w-[180px]">{user.company.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[180px] italic">
                      {user.company.catchPhrase}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <Badge variant="indigo" size="sm">
                      {postsCount} posts
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(user);
                      }}
                      rightIcon={<ExternalLink className="w-3 h-3" />}
                      className="py-1 px-2.5 text-xs border-slate-700 hover:border-indigo-500 hover:text-indigo-400"
                    >
                      Details
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

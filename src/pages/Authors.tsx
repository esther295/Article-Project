import React, { useState, useMemo } from 'react';
import { Search, Users as UsersIcon } from 'lucide-react';
import { useBlog } from '../context/useBlog';
import { AuthorCard } from '../components/AuthorCard';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';

export const Authors: React.FC = () => {
  const { users, isLoading, error, refreshData, getPostsForUser } = useBlog();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('all');

  const companies = useMemo(() => {
    return Array.from(new Set(users.map((u) => u.company.name))).sort();
  }, [users]);

  const filteredAuthors = useMemo(() => {
    return users.filter((user) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        user.name.toLowerCase().includes(q) ||
        user.username.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.company.name.toLowerCase().includes(q);

      const matchesCompany =
        selectedCompany === 'all' || user.company.name === selectedCompany;

      return matchesSearch && matchesCompany;
    });
  }, [users, searchQuery, selectedCompany]);

  if (isLoading && users.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Loading message="Loading editorial contributors..." count={6} />
      </div>
    );
  }

  if (error && users.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ErrorMessage message={error} onRetry={refreshData} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pb-6 border-b border-[#D5D0C7]">
        <span className="text-xs font-mono uppercase tracking-widest text-[#123F40] font-semibold">
          The Masthead
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#242A29]">
          Contributing Authors
        </h1>
        <p className="text-sm sm:text-base text-[#777873] leading-relaxed font-sans">
          Meet the {users.length} essayists, critics, and fellows contributing across our architectural, cultural, and philosophical desks.
        </p>
      </div>

      {/* Control Bar: Search & Company Filter */}
      <div className="bg-[#FAF9F6] border border-[#D5D0C7] rounded-lg p-5 sm:p-6 space-y-4 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777873] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search authors by name, @handle, or research focus..."
              className="w-full bg-[#FAF9F6] text-[#242A29] placeholder-[#777873] text-sm rounded-md pl-11 pr-4 py-3 border border-[#D5D0C7] focus:border-[#123F40] focus:ring-1 focus:ring-[#123F40] focus:outline-none transition-colors"
            />
          </div>

          <div className="md:col-span-4 relative">
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              aria-label="Filter authors by organization"
              className="w-full bg-[#FAF9F6] text-[#242A29] text-xs font-medium rounded-md px-3.5 py-3 border border-[#D5D0C7] focus:border-[#123F40] focus:ring-1 focus:ring-[#123F40] focus:outline-none cursor-pointer"
            >
              <option value="all">All Organizations ({companies.length})</option>
              {companies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-3 border-t border-[#D5D0C7]/70 flex items-center justify-between text-xs text-[#777873]">
          <span className="flex items-center gap-1.5">
            <UsersIcon className="w-3.5 h-3.5 text-[#123F40]" />
            Showing <strong className="text-[#242A29]">{filteredAuthors.length}</strong> of{' '}
            <strong className="text-[#242A29]">{users.length}</strong> authors
          </span>

          {(searchQuery || selectedCompany !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCompany('all');
              }}
              className="text-[#123F40] hover:underline font-medium cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Authors Grid */}
      {filteredAuthors.length === 0 ? (
        <div className="bg-[#FAF9F6] border border-dashed border-[#D5D0C7] rounded-lg p-12 text-center max-w-lg mx-auto space-y-3">
          <h3 className="font-editorial text-2xl font-semibold text-[#242A29]">
            No Authors Found
          </h3>
          <p className="text-sm text-[#777873]">
            No contributors matched your search query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredAuthors.map((user) => (
            <AuthorCard
              key={user.id}
              user={user}
              postsCount={getPostsForUser(user.id).length}
            />
          ))}
        </div>
      )}
    </div>
  );
};

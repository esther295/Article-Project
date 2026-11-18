import React, { useState, useMemo } from 'react';
import {
  Users,
  LayoutGrid,
  List,
  Filter,
  Building,
} from 'lucide-react';
import { useApiData } from '../../context/useApiData';
import type { User, ViewMode } from '../../types/api';
import { SearchInput } from '../common/SearchInput';
import { UserCard } from './UserCard';
import { UserTable } from './UserTable';
import { UserDetailsModal } from './UserDetailsModal';
import { EmptyState } from '../common/EmptyState';
import { TableSkeleton } from '../common/LoadingSkeleton';
import { ErrorAlert } from '../common/ErrorAlert';
import { Badge } from '../common/Badge';

export const UsersTab: React.FC = () => {
  const {
    users,
    posts,
    isLoading,
    error,
    refreshAll,
    selectedUserId,
    setSelectedUserId,
  } = useApiData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [sortField, setSortField] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Extract unique companies for filter dropdown
  const companies = useMemo(() => {
    const list = Array.from(new Set(users.map((u) => u.company.name)));
    return list.sort();
  }, [users]);

  // Filtered & sorted users
  const filteredUsers = useMemo(() => {
    const result = users.filter((user) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query) ||
        user.company.name.toLowerCase().includes(query);

      const matchesCompany =
        selectedCompany === 'all' || user.company.name === selectedCompany;

      return matchesSearch && matchesCompany;
    });

    result.sort((a, b) => {
      const comparison =
        sortField === 'name' ? a.name.localeCompare(b.name) : a.id - b.id;
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [users, searchQuery, selectedCompany, sortField, sortDirection]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getPostsCountForUser = (userId: number): number => {
    return posts.filter((p) => p.userId === userId).length;
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCompany('all');
  };

  if (isLoading && users.length === 0) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-slate-900 rounded-xl animate-pulse"></div>
        <TableSkeleton rows={8} cols={6} />
      </div>
    );
  }

  if (error && users.length === 0) {
    return <ErrorAlert message={error} onRetry={refreshAll} isRetrying={isLoading} />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Control Bar: Search, Filters, View Modes */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name, @username, email, phone..."
            className="flex-1"
          />

          {/* Company Filter Dropdown */}
          <div className="relative flex items-center min-w-[190px]">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              aria-label="Filter users by company"
              className="w-full bg-slate-900 text-slate-200 text-xs rounded-lg pl-9 pr-8 py-2 border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none appearance-none cursor-pointer"
            >
              <option value="all">All Companies ({companies.length})</option>
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* View mode toggle & item counter */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
          <Badge variant="slate" size="sm">
            <Users className="w-3 h-3 text-slate-400" />
            {filteredUsers.length} of {users.length} Users
          </Badge>

          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Table view"
              aria-label="Table view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid view"
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Users Content: Table or Grid */}
      {filteredUsers.length === 0 ? (
        <EmptyState
          title="No users match your filters"
          message="No user records matched your search query or company filter."
          actionText="Reset Filters"
          onAction={handleResetFilters}
        />
      ) : viewMode === 'table' ? (
        <UserTable
          users={filteredUsers}
          getPostsCount={getPostsCountForUser}
          onSelect={(u: User) => setSelectedUserId(u.id)}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              postsCount={getPostsCountForUser(user.id)}
              onSelect={(u) => setSelectedUserId(u.id)}
            />
          ))}
        </div>
      )}

      {/* User Details Modal */}
      <UserDetailsModal
        userId={selectedUserId}
        onClose={() => setSelectedUserId(null)}
      />
    </div>
  );
};

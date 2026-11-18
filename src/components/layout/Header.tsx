import React from 'react';
import { Menu, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApiData } from '../../context/useApiData';
import { Button } from '../common/Button';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { activeTab, isLoading, refreshAll, lastUpdated } = useApiData();

  const tabTitles = {
    dashboard: {
      title: 'Dashboard Overview',
      subtitle: 'Real-time telemetry and API statistics across users, posts, and comments.',
    },
    users: {
      title: 'Users Management',
      subtitle: 'Directory of registered API users, corporate affiliations, and contact details.',
    },
    posts: {
      title: 'Posts & Publications',
      subtitle: 'Author posts matched with JSONPlaceholder user identities and discussion activity.',
    },
    comments: {
      title: 'Comments & Feedback',
      subtitle: 'Direct reader responses mapped to their corresponding publication posts.',
    },
  }[activeTab];

  return (
    <header className="h-20 border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {tabTitles.title}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" />
              Live API
            </span>
          </div>
          <p className="hidden md:block text-xs text-slate-400 mt-0.5">
            {tabTitles.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {lastUpdated && (
          <span className="hidden lg:block text-xs text-slate-500 font-mono">
            Synced: {lastUpdated.toLocaleTimeString()}
          </span>
        )}

        <Button
          variant="secondary"
          size="sm"
          onClick={refreshAll}
          isLoading={isLoading}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          title="Fetch fresh data from API"
        >
          <span className="hidden sm:inline">Refresh Data</span>
        </Button>

        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold border border-indigo-400/30 shadow-sm">
          <Sparkles className="w-4 h-4 text-indigo-100" />
        </div>
      </div>
    </header>
  );
};

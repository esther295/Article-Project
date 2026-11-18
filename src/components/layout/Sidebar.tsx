import React from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  Activity,
  Layers,
  ExternalLink,
  X,
} from 'lucide-react';
import type { ActiveTab } from '../../types/api';
import { useApiData } from '../../context/useApiData';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, users, posts, comments } = useApiData();

  const navItems = [
    {
      id: 'dashboard' as ActiveTab,
      label: 'Overview',
      icon: <LayoutDashboard className="w-5 h-5" />,
      badge: null,
    },
    {
      id: 'users' as ActiveTab,
      label: 'Users',
      icon: <Users className="w-5 h-5" />,
      badge: users.length,
    },
    {
      id: 'posts' as ActiveTab,
      label: 'Posts',
      icon: <FileText className="w-5 h-5" />,
      badge: posts.length,
    },
    {
      id: 'comments' as ActiveTab,
      label: 'Comments',
      icon: <MessageSquare className="w-5 h-5" />,
      badge: comments.length,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight block">API Pulse</span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">Management v1.0</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Menu
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm shadow-indigo-900/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-indigo-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                      isActive
                        ? 'bg-indigo-500/20 text-indigo-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-6 px-3 pb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            API Endpoints
          </div>
          <div className="space-y-1 text-xs">
            <a
              href="https://jsonplaceholder.typicode.com/users"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3.5 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors"
            >
              <span className="font-mono text-slate-400">/users</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
            <a
              href="https://jsonplaceholder.typicode.com/posts"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3.5 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors"
            >
              <span className="font-mono text-slate-400">/posts</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
            <a
              href="https://jsonplaceholder.typicode.com/comments"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3.5 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors"
            >
              <span className="font-mono text-slate-400">/comments</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-850/60 border border-slate-800">
            <div className="relative">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-200 truncate">JSONPlaceholder Live</p>
              <p className="text-[10px] text-emerald-400 font-mono">Status: 200 OK</p>
            </div>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
      </aside>
    </>
  );
};

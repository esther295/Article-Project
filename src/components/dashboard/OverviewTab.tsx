import React from 'react';
import {
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  Building2,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useApiData } from '../../context/useApiData';
import { StatCard } from '../common/StatCard';
import { CardSkeleton, PostCardSkeleton } from '../common/LoadingSkeleton';
import { ErrorAlert } from '../common/ErrorAlert';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const OverviewTab: React.FC = () => {
  const {
    users,
    posts,
    comments,
    isLoading,
    error,
    refreshAll,
    getUserById,
    getCommentsForPost,
    setActiveTab,
    viewPostDetails,
    viewUserDetails,
  } = useApiData();

  if (isLoading && users.length === 0) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CardSkeleton count={4} />
        </div>
        <div className="pt-4">
          <div className="h-6 bg-slate-800 rounded w-48 mb-4 animate-pulse"></div>
          <PostCardSkeleton count={4} />
        </div>
      </div>
    );
  }

  if (error && users.length === 0) {
    return <ErrorAlert message={error} onRetry={refreshAll} isRetrying={isLoading} />;
  }

  const avgComments = posts.length > 0 ? (comments.length / posts.length).toFixed(1) : '0';
  const uniqueCompanies = new Set(users.map((u) => u.company.name)).size;
  const recentPosts = posts.slice(0, 6);

  // Calculate top active author
  const authorPostCounts = users.map((u) => ({
    user: u,
    count: posts.filter((p) => p.userId === u.id).length,
  }));
  authorPostCounts.sort((a, b) => b.count - a.count);
  const topAuthor = authorPostCounts[0]?.user;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={users.length}
          subtitle={`${uniqueCompanies} unique companies`}
          icon={<Users className="w-5 h-5" />}
          gradient="indigo"
          trend="100% active"
          onClick={() => setActiveTab('users')}
        />
        <StatCard
          title="Total Posts"
          value={posts.length}
          subtitle="Articles & publications"
          icon={<FileText className="w-5 h-5" />}
          gradient="purple"
          trend="+10 per user avg"
          onClick={() => setActiveTab('posts')}
        />
        <StatCard
          title="Total Comments"
          value={comments.length}
          subtitle="Reader engagements"
          icon={<MessageSquare className="w-5 h-5" />}
          gradient="emerald"
          trend={`${avgComments} per post avg`}
          onClick={() => setActiveTab('comments')}
        />
        <StatCard
          title="Companies"
          value={uniqueCompanies}
          subtitle="Corporate accounts"
          icon={<Building2 className="w-5 h-5" />}
          gradient="amber"
          trend="Enterprise scale"
          onClick={() => setActiveTab('users')}
        />
      </div>

      {/* Highlights & Telemetry Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Insights Banner */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-950/40 via-slate-900/90 to-purple-950/30 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 -mt-8 -mr-8 w-44 h-44 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            API Ecosystem Health
          </div>
          <h2 className="text-xl font-bold text-white">JSONPlaceholder Integration Online</h2>
          <p className="mt-1 text-sm text-slate-300 max-w-xl leading-relaxed">
            All 3 REST endpoints (/users, /posts, /comments) are actively synchronized.
            Relational keys <code className="text-indigo-300 bg-indigo-950/60 px-1 py-0.5 rounded">userId</code> and{' '}
            <code className="text-indigo-300 bg-indigo-950/60 px-1 py-0.5 rounded">postId</code> are normalized and cross-linked.
          </p>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-indigo-500/15">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Avg Response</span>
              <span className="text-sm font-semibold text-emerald-400 font-mono">Fast (Cacheable)</span>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Protocol</span>
              <span className="text-sm font-semibold text-indigo-300 font-mono">HTTPS / REST</span>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[11px] text-slate-400 block">Total Records</span>
              <span className="text-sm font-semibold text-white font-mono">
                {users.length + posts.length + comments.length}
              </span>
            </div>
          </div>
        </div>

        {/* Top Contributor Card */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Contributor</span>
              <Badge variant="purple" size="sm">
                <TrendingUp className="w-3 h-3" />
                Featured
              </Badge>
            </div>
            {topAuthor ? (
              <div className="mt-4 flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-md">
                  {topAuthor.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-white truncate">{topAuthor.name}</h4>
                  <p className="text-xs text-slate-400 truncate">@{topAuthor.username}</p>
                  <p className="text-xs text-indigo-400 mt-1 truncate">{topAuthor.company.name}</p>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-xs text-slate-500">No author data</p>
            )}
          </div>

          {topAuthor && (
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Authored <strong className="text-white">10</strong> articles
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => viewUserDetails(topAuthor.id)}
                className="text-xs text-indigo-400 hover:text-indigo-300 p-0"
              >
                View Profile &rarr;
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              Recent Publications
            </h3>
            <p className="text-xs text-slate-400">
              Latest articles fetched from JSONPlaceholder with dynamic author mapping.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab('posts')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore all {posts.length} posts
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentPosts.map((post) => {
            const author = getUserById(post.userId);
            const postComments = getCommentsForPost(post.id);

            return (
              <div
                key={post.id}
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition-all hover:shadow-lg hover:shadow-slate-950/40 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-3">
                    <button
                      onClick={() => author && viewUserDetails(author.id)}
                      className="flex items-center gap-2 hover:text-indigo-400 transition-colors group/author text-left"
                    >
                      <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300 group-hover/author:border-indigo-500">
                        {author ? author.name.charAt(0) : 'U'}
                      </div>
                      <span className="font-medium text-slate-300 truncate max-w-[140px]">
                        {author ? author.name : `User #${post.userId}`}
                      </span>
                    </button>
                    <span className="font-mono text-slate-500 text-[11px]">#{post.id}</span>
                  </div>

                  <h4
                    onClick={() => viewPostDetails(post.id)}
                    className="font-semibold text-white text-sm line-clamp-2 leading-snug cursor-pointer group-hover:text-indigo-300 transition-colors capitalize"
                  >
                    {post.title}
                  </h4>

                  <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {post.body}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <Badge variant="indigo" size="sm">
                    <MessageSquare className="w-3 h-3" />
                    {postComments.length} comments
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => viewPostDetails(post.id)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Read More &rarr;
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { useBlog } from '../context/useBlog';
import { Hero } from '../components/Hero';
import { FeaturedArticle } from '../components/FeaturedArticle';
import { ArticleCard } from '../components/ArticleCard';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';

const CATEGORY_TABS = ['All', 'Essays', 'Architecture', 'Culture', 'Design', 'Philosophy'];

export const Home: React.FC = () => {
  const {
    posts,
    isLoading,
    error,
    refreshData,
    getUserById,
    getCommentsForPost,
    getCategoryForPost,
    getReadingTime,
    getDateForPost,
  } = useBlog();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  if (isLoading && posts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Loading message="Curating the latest journal issue..." count={6} />
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ErrorMessage message={error} onRetry={refreshData} />
      </div>
    );
  }

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1, 10);

  const filteredPosts =
    selectedCategory === 'All'
      ? remainingPosts.slice(0, 6)
      : remainingPosts
          .filter((p) => getCategoryForPost(p.id) === selectedCategory)
          .slice(0, 6);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Editorial Hero */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Featured Story */}
        {featuredPost && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#123F40] font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Dispatch
              </span>
              <span className="text-xs text-[#777873] font-mono">
                Editor’s Lead Selection
              </span>
            </div>

            <FeaturedArticle
              post={featuredPost}
              author={getUserById(featuredPost.userId)}
              category={getCategoryForPost(featuredPost.id)}
              readingTime={getReadingTime(featuredPost.body)}
              date={getDateForPost(featuredPost.id)}
              commentsCount={getCommentsForPost(featuredPost.id).length}
            />
          </section>
        )}

        {/* Latest Dispatches Header & Category Pills */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D5D0C7]">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#123F40] font-semibold block mb-1">
                Recent Publications
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#242A29]">
                Latest Articles
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORY_TABS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#123F40] text-[#FAF9F6] shadow-2xs'
                      : 'bg-[#FAF9F6] text-[#777873] border border-[#D5D0C7] hover:text-[#242A29] hover:bg-[#F0ECE5]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => (
              <ArticleCard
                key={post.id}
                post={post}
                author={getUserById(post.userId)}
                category={getCategoryForPost(post.id)}
                readingTime={getReadingTime(post.body)}
                date={getDateForPost(post.id)}
                commentsCount={getCommentsForPost(post.id).length}
              />
            ))}
          </div>

          <div className="text-center pt-8">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded bg-[#FAF9F6] border border-[#D5D0C7] hover:border-[#123F40] text-[#123F40] text-sm font-medium tracking-wide shadow-2xs transition-all hover:bg-[#F0ECE5]"
            >
              <span>Explore All {posts.length} Archive Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Newsletter Subscription UI (Visual only) */}
        <section className="bg-[#FAF9F6] border border-[#D5D0C7] rounded-lg p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#E6E1D8] border border-[#D5D0C7] flex items-center justify-center text-[#123F40] mx-auto mb-6">
            <Mail className="w-5 h-5" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-[#123F40] font-semibold block mb-2">
            The Journal Dispatch
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#242A29] mb-4">
            Deliberate prose, direct to your inbox.
          </h2>
          <p className="text-sm sm:text-base text-[#777873] max-w-xl mx-auto mb-8 font-sans">
            Join over 14,000 subscribers who receive our fortnightly essays, design criticism, and cultural notes. Free of algorithmic noise.
          </p>

          {isSubscribed ? (
            <div className="p-4 rounded bg-[#E6E1D8]/80 border border-[#D5D0C7] text-sm text-[#123F40] font-medium max-w-md mx-auto">
              Thank you for subscribing. You will receive the next edition in your inbox.
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full sm:flex-1 px-4 py-3 rounded bg-[#FAF9F6] border border-[#D5D0C7] text-sm text-[#242A29] placeholder-[#777873] focus:border-[#123F40] focus:ring-1 focus:ring-[#123F40] focus:outline-none font-sans"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded bg-[#123F40] hover:bg-[#245C5A] text-[#FAF9F6] text-sm font-medium tracking-wide shadow-sm transition-all cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-xs text-[#777873] mt-4 font-mono">
            No advertising or data sales. Unsubscribe anytime with a single click.
          </p>
        </section>
      </div>
    </div>
  );
};

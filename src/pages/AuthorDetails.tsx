import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  Building,
  MapPin,
  BookOpen,
} from 'lucide-react';
import { useBlog } from '../context/useBlog';
import { ArticleCard } from '../components/ArticleCard';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';

export const AuthorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    getUserById,
    getPostsForUser,
    getCommentsForPost,
    getCategoryForPost,
    getReadingTime,
    getDateForPost,
    isLoading,
  } = useBlog();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const authorId = Number(id);
  const author = getUserById(authorId);
  const authorPosts = author ? getPostsForUser(author.id) : [];

  if (isLoading && !author) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <Loading message="Loading author monograph..." count={3} />
      </div>
    );
  }

  if (!author) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <ErrorMessage
          message={`Contributor #${id} could not be located in our directory.`}
        />
        <Link
          to="/authors"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#123F40] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Authors Masthead</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#123F40] hover:text-[#245C5A] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Authors</span>
        </button>
      </div>

      {/* Author Profile Header Box */}
      <section className="bg-[#FAF9F6] border border-[#D5D0C7] rounded-lg p-8 sm:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#E6E1D8] border border-[#D5D0C7] flex items-center justify-center text-3xl sm:text-4xl font-editorial font-bold text-[#123F40] shrink-0 shadow-sm">
              {author.name.charAt(0)}
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#123F40] font-semibold block mb-1">
                  Contributor Profile
                </span>
                <h1 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#242A29]">
                  {author.name}
                </h1>
                <p className="text-sm text-[#777873] font-mono mt-0.5">
                  @{author.username}
                </p>
              </div>

              {/* Company & Catchphrase */}
              <div className="pt-2 text-sm text-[#242A29]">
                <div className="flex items-center gap-2 font-medium text-[#123F40]">
                  <Building className="w-4 h-4 text-[#123F40] shrink-0" />
                  <span>{author.company.name}</span>
                </div>
                <p className="text-xs text-[#777873] italic font-editorial mt-1">
                  &ldquo;{author.company.catchPhrase}&rdquo; &bull; {author.company.bs}
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Meta Details */}
          <div className="lg:col-span-4 bg-[#F0ECE5] p-5 sm:p-6 rounded-md border border-[#D5D0C7] space-y-3 text-xs text-[#242A29]">
            <span className="font-mono uppercase tracking-widest text-[11px] font-semibold text-[#123F40] block pb-1 border-b border-[#D5D0C7]">
              Correspondence
            </span>
            <div className="space-y-2 text-[#777873]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#123F40] shrink-0" />
                <a
                  href={`mailto:${author.email}`}
                  className="hover:text-[#123F40] hover:underline truncate"
                >
                  {author.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#123F40] shrink-0" />
                <a
                  href={`tel:${author.phone}`}
                  className="hover:text-[#123F40] hover:underline truncate"
                >
                  {author.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#123F40] shrink-0" />
                <a
                  href={`https://${author.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#123F40] hover:underline truncate"
                >
                  {author.website}
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-[#D5D0C7]/60">
                <MapPin className="w-3.5 h-3.5 text-[#123F40] shrink-0 mt-0.5" />
                <span>
                  {author.address.suite}, {author.address.street}, {author.address.city}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authored Articles */}
      <section className="space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#D5D0C7]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#123F40] font-semibold block">
              Bibliography
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#242A29] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#123F40]" />
              Publications by {author.name} ({authorPosts.length})
            </h2>
          </div>
        </div>

        {authorPosts.length === 0 ? (
          <div className="bg-[#FAF9F6] border border-dashed border-[#D5D0C7] rounded-lg p-12 text-center text-sm text-[#777873]">
            No articles found for this author.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {authorPosts.map((post) => (
              <ArticleCard
                key={post.id}
                post={post}
                author={author}
                category={getCategoryForPost(post.id)}
                readingTime={getReadingTime(post.body)}
                date={getDateForPost(post.id)}
                commentsCount={getCommentsForPost(post.id).length}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

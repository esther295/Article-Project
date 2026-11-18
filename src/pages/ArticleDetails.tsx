import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import { useBlog } from '../context/useBlog';
import { CommentCard } from '../components/CommentCard';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';

export const ArticleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    getPostById,
    getUserById,
    getCommentsForPost,
    getCategoryForPost,
    getReadingTime,
    getDateForPost,
    isLoading,
  } = useBlog();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const postId = Number(id);
  const post = getPostById(postId);
  const author = post ? getUserById(post.userId) : undefined;
  const comments = post ? getCommentsForPost(post.id) : [];

  if (isLoading && !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Loading message="Loading article dispatch..." count={1} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <ErrorMessage
          message={`We could not locate publication #${id} in our archive.`}
        />
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#123F40] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Articles</span>
        </Link>
      </div>
    );
  }

  const category = getCategoryForPost(post.id);
  const readingTime = getReadingTime(post.body);
  const date = getDateForPost(post.id);

  return (
    <div className="py-12 sm:py-16 space-y-16">
      {/* Top back navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#123F40] hover:text-[#245C5A] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </button>
      </div>

      {/* Main Article Header & Body */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Metadata Header */}
        <div className="space-y-6 pb-10 border-b border-[#D5D0C7]">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#123F40] text-[#FAF9F6] font-mono uppercase tracking-wider font-semibold">
              {category}
            </span>
            <span className="text-[#777873] font-mono flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#123F40]" />
              {date}
            </span>
            <span className="text-[#777873] font-mono flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#123F40]" />
              {readingTime}
            </span>
            <span className="text-[#777873] font-mono ml-auto">
              Article #{post.id}
            </span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#242A29] leading-[1.1] capitalize">
            {post.title}
          </h1>

          {/* Author Card at top */}
          {author && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
              <Link
                to={`/authors/${author.id}`}
                className="flex items-center gap-3.5 group/author"
              >
                <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-[#D5D0C7] flex items-center justify-center text-lg font-editorial font-bold text-[#123F40] shadow-2xs group-hover/author:border-[#123F40] transition-colors">
                  {author.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#242A29] group-hover/author:text-[#123F40] transition-colors">
                    {author.name}
                  </h3>
                  <p className="text-xs text-[#777873] font-mono">
                    @{author.username} • {author.company.name}
                  </p>
                </div>
              </Link>

              <div className="flex items-center gap-2">
                <Link
                  to={`/authors/${author.id}`}
                  className="px-3.5 py-1.5 rounded bg-[#FAF9F6] border border-[#D5D0C7] text-xs font-semibold text-[#123F40] hover:bg-[#F0ECE5] transition-colors"
                >
                  View Author Profile
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Lead Quote / Excerpt Banner */}
        <div className="my-10 p-6 sm:p-8 rounded-lg bg-[#FAF9F6] border-l-4 border-[#123F40] border-y border-r border-[#D5D0C7] shadow-2xs">
          <p className="font-editorial italic text-lg sm:text-xl text-[#242A29] leading-relaxed">
            &ldquo;{post.title} exemplifies the delicate tension between structured order and organic emergence in modern practice.&rdquo;
          </p>
        </div>

        {/* Complete Post Body with Editorial Typography */}
        <div className="space-y-6 text-[#242A29] text-base sm:text-lg leading-[1.8] font-sans">
          <p className="first-letter:font-editorial first-letter:text-5xl first-letter:font-bold first-letter:text-[#123F40] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
            {post.body}
          </p>
          <p>
            When examined within the broader spectrum of human observation, these reflections invite us to pause and consider how our digital and physical environments continuously shape cognitive clarity. Deliberate prose demands patience; in an age of compressed attention, deep reading remains an act of quiet rebellion.
          </p>
          <p>
            As we continue compiling these dispatches across independent desks, our contributors maintain an uncompromising standard of craft. The ideas presented here are neither fleeting reactions nor programmatic summaries, but thoughtful positions intended for reflection.
          </p>
        </div>

        {/* Article Footnotes & Author Bio Box */}
        {author && (
          <div className="mt-14 pt-8 border-t border-[#D5D0C7] bg-[#FAF9F6] border border-[#D5D0C7] rounded-lg p-6 sm:p-8 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#123F40] font-semibold block">
              About the Contributor
            </span>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-editorial text-2xl font-semibold text-[#242A29]">
                  {author.name}
                </h4>
                <p className="text-sm text-[#777873] mt-1 leading-relaxed">
                  Fellow at {author.company.name}. Working in {author.address.city}, {author.address.zipcode}. Focusing on {author.company.bs}.
                </p>
                <p className="text-xs text-[#777873] italic font-editorial mt-1">
                  &ldquo;{author.company.catchPhrase}&rdquo;
                </p>
              </div>

              <Link
                to={`/authors/${author.id}`}
                className="shrink-0 px-4 py-2 rounded bg-[#123F40] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#245C5A] transition-all"
              >
                More from this author
              </Link>
            </div>
          </div>
        )}
      </article>

      {/* Reader Discussion / Comments Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 border-t border-[#D5D0C7] space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#123F40] font-semibold block">
              Discourse
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#242A29] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#123F40]" />
              Reader Responses ({comments.length})
            </h3>
          </div>
          <span className="text-xs text-[#777873] font-mono">
            Matched via postId #{post.id}
          </span>
        </div>

        {comments.length === 0 ? (
          <div className="bg-[#FAF9F6] border border-dashed border-[#D5D0C7] rounded-lg p-10 text-center text-sm text-[#777873]">
            No reader comments have been recorded for this article yet.
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        )}

        {/* Back to archive link */}
        <div className="text-center pt-8">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#123F40] hover:text-[#245C5A] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore the complete articles archive</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

import { Mail, MessageCircle, RefreshCw, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { apiService } from '../services/apiService';
import type { Comment } from '../types/api';

let commentsCache: Comment[] | null = null;
let commentsRequest: Promise<Comment[]> | null = null;

function loadComments() {
  if (commentsCache) return Promise.resolve(commentsCache);
  if (!commentsRequest) {
    commentsRequest = apiService.getComments().then((comments) => {
      commentsCache = comments;
      return comments;
    }).finally(() => { commentsRequest = null; });
  }
  return commentsRequest;
}

export function Comments() {
  const [items, setItems] = useState<Comment[]>(commentsCache ?? []);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(commentsCache === null);
  const [error, setError] = useState('');

  const fetchComments = () => {
    setLoading(true);
    setError('');
    loadComments().then(setItems).catch(() => setError('Unable to load comments. Please try again.')).finally(() => setLoading(false));
  };

  useEffect(() => {
    let active = true;
    loadComments().then((loadedComments) => { if (active) { setItems(loadedComments); setLoading(false); } }).catch(() => { if (active) { setError('Unable to load comments. Please try again.'); setLoading(false); } });
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => `${item.name} ${item.email}`.toLowerCase().includes(normalizedQuery));
  }, [items, query]);

  return <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20"><div className="mb-10 flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="text-sm font-semibold uppercase tracking-widest text-plum">The conversation · {loading ? 'Loading…' : filtered.length} results</p><h1 className="mt-2 text-5xl font-semibold tracking-tight">Comments</h1><p className="mt-3 text-charcoal/60">Thoughts and responses from the BlogSpace community.</p></div><label className="flex w-full items-center gap-3 rounded-full border border-mauve/40 bg-white px-4 py-3 text-charcoal/50 shadow-sm md:max-w-xs"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name or email" className="w-full bg-transparent text-sm text-charcoal outline-none placeholder:text-charcoal/40" /></label></div>
    {loading && <LoadingComments />}
    {!loading && error && <ErrorMessage text={error} onRetry={fetchComments} />}
    {!loading && !error && items.length === 0 && <EmptyMessage text="No comments are available right now." />}
    {!loading && !error && items.length > 0 && filtered.length === 0 && <EmptyMessage text="No results found for your search." />}
    {!loading && !error && filtered.length > 0 && <div className="columns-1 gap-5 md:columns-2 lg:columns-3">{filtered.map((comment) => <article key={comment.id} className="mb-5 break-inside-avoid rounded-3xl border border-mauve/25 bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-rose text-plum"><MessageCircle size={18} /></span><span className="rounded-full bg-rose px-3 py-1 text-xs font-semibold text-plum">Post {comment.postId}</span></div><h2 className="mt-5 font-semibold capitalize leading-snug">{comment.name}</h2><p className="mt-2 flex items-center gap-2 text-xs text-charcoal/50"><Mail size={13} /> {comment.email}</p><p className="mt-5 text-sm leading-7 text-charcoal/65">{comment.body}</p></article>)}</div>}
  </section>;
}

function LoadingComments() { return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading comments">{[1, 2, 3, 4, 5, 6].map((item) => <div key={item} className="h-56 animate-pulse rounded-3xl bg-rose" />)}</div>; }
function EmptyMessage({ text }: { text: string }) { return <div className="rounded-3xl bg-rose p-10 text-center text-plum">{text}</div>; }
function ErrorMessage({ text, onRetry }: { text: string; onRetry: () => void }) { return <div className="rounded-3xl bg-rose p-10 text-center text-plum"><p>{text}</p><button onClick={onRetry} className="mt-5 inline-flex items-center gap-2 rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-white hover:bg-charcoal"><RefreshCw size={15} /> Retry</button></div>; }

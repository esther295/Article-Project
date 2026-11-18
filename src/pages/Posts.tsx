import { ArrowRight, RefreshCw, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { apiService } from '../services/apiService';
import type { Post } from '../types/api';

let postsCache: Post[] | null = null;
let postsRequest: Promise<Post[]> | null = null;

function loadPosts() {
  if (postsCache) return Promise.resolve(postsCache);
  if (!postsRequest) {
    postsRequest = apiService.getPosts().then((posts) => {
      postsCache = posts;
      return posts;
    }).finally(() => { postsRequest = null; });
  }
  return postsRequest;
}

export function Posts() {
  const [posts, setPosts] = useState<Post[]>(postsCache ?? []);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Post | null>(null);
  const [loading, setLoading] = useState(postsCache === null);
  const [error, setError] = useState('');

  const fetchPosts = () => {
    setLoading(true);
    setError('');
    loadPosts().then(setPosts).catch(() => setError('Unable to load posts. Please try again.')).finally(() => setLoading(false));
  };

  useEffect(() => {
    let active = true;
    loadPosts().then((loadedPosts) => { if (active) { setPosts(loadedPosts); setLoading(false); } }).catch(() => { if (active) { setError('Unable to load posts. Please try again.'); setLoading(false); } });
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => post.title.toLowerCase().includes(normalizedQuery));
  }, [posts, query]);

  return <Page title="All stories" intro="Browse the complete BlogSpace collection." search={query} setSearch={setQuery} count={loading ? 'Loading…' : filtered.length}>
    {loading && <LoadingCards />}
    {!loading && error && <ErrorMessage text={error} onRetry={fetchPosts} />}
    {!loading && !error && posts.length === 0 && <EmptyMessage text="No posts are available right now." />}
    {!loading && !error && posts.length > 0 && filtered.length === 0 && <EmptyMessage text="No results found for your search." />}
    {!loading && !error && filtered.length > 0 && <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((post) => <article key={post.id} className="group flex min-h-64 flex-col rounded-3xl border border-mauve/25 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><span className="text-xs font-semibold uppercase tracking-widest text-mauve">Story {String(post.id).padStart(2, '0')}</span><h2 className="mt-5 text-xl font-semibold capitalize leading-tight group-hover:text-plum">{post.title}</h2><p className="mt-3 line-clamp-3 text-sm leading-6 text-charcoal/60">{post.body}</p><button onClick={() => setSelected(post)} className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-plum">Read more <ArrowRight size={15} /></button></article>)}</div>}
    {selected && <div className="fixed inset-0 z-50 grid place-items-center bg-charcoal/45 p-5" role="dialog" aria-modal="true"><div className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-3xl bg-white p-7 shadow-2xl sm:p-10"><button onClick={() => setSelected(null)} className="absolute right-5 top-5 rounded-full bg-rose p-2 text-plum" aria-label="Close post"><X size={18} /></button><span className="text-xs font-semibold uppercase tracking-widest text-mauve">Story {selected.id}</span><h2 className="mt-5 pr-8 text-3xl font-semibold capitalize leading-tight">{selected.title}</h2><p className="mt-7 text-lg leading-8 text-charcoal/70">{selected.body}</p></div></div>}
  </Page>;
}

function Page({ title, intro, search, setSearch, count, children }: { title: string; intro: string; search: string; setSearch: (value: string) => void; count: string | number; children: React.ReactNode }) {
  return <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20"><div className="mb-10 flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="text-sm font-semibold uppercase tracking-widest text-plum">The collection · {count} results</p><h1 className="mt-2 text-5xl font-semibold tracking-tight">{title}</h1><p className="mt-3 text-charcoal/60">{intro}</p></div><label className="flex w-full items-center gap-3 rounded-full border border-mauve/40 bg-white px-4 py-3 text-charcoal/50 shadow-sm md:max-w-xs"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the collection" className="w-full bg-transparent text-sm text-charcoal outline-none placeholder:text-charcoal/40" /></label></div>{children}</section>;
}

function LoadingCards() { return <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading posts">{[1, 2, 3, 4, 5, 6].map((item) => <div key={item} className="h-64 animate-pulse rounded-3xl bg-rose" />)}</div>; }
function EmptyMessage({ text }: { text: string }) { return <div className="rounded-3xl bg-rose p-10 text-center text-plum">{text}</div>; }
function ErrorMessage({ text, onRetry }: { text: string; onRetry: () => void }) { return <div className="rounded-3xl bg-rose p-10 text-center text-plum"><p>{text}</p><button onClick={onRetry} className="mt-5 inline-flex items-center gap-2 rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-white hover:bg-charcoal"><RefreshCw size={15} /> Retry</button></div>; }

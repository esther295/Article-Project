import { ArrowRight, BookOpen, MessageCircle, Users as UsersIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/apiService';
import type { Comment, Post, User } from '../types/api';

export function Home() {
  const [data, setData] = useState<{ posts: Post[]; comments: Comment[]; users: User[] }>();
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    Promise.all([apiService.getPosts(controller.signal), apiService.getComments(controller.signal), apiService.getUsers(controller.signal)])
      .then(([posts, comments, users]) => setData({ posts, comments, users }))
      .catch((err: unknown) => { if ((err as Error).name !== 'AbortError') setError('We could not load the latest stories right now.'); });
    return () => controller.abort();
  }, []);
  const stats = [{ icon: BookOpen, value: data?.posts.length ?? '—', label: 'Stories published' }, { icon: MessageCircle, value: data?.comments.length ?? '—', label: 'Conversations' }, { icon: UsersIcon, value: data?.users.length ?? '—', label: 'Contributors' }];
  return <div>
    <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-16 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:px-8 lg:pb-24 lg:pt-24"><div><p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[.2em] text-plum"><span className="h-px w-8 bg-mauve" /> The BlogSpace journal</p><h1 className="max-w-3xl text-5xl font-semibold leading-[.98] tracking-tight text-charcoal sm:text-7xl">Stories <em className="font-normal text-plum">worth</em> reading.</h1><p className="mt-7 max-w-xl text-lg leading-8 text-charcoal/65">A thoughtful collection of ideas, conversations and perspectives from a community of curious people.</p><Link to="/posts" className="mt-9 inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3 font-semibold text-white shadow-lg shadow-plum/15 hover:-translate-y-0.5 hover:bg-charcoal">Explore the stories <ArrowRight size={18} /></Link></div><div className="relative rounded-[2rem] bg-rose p-8 sm:p-12"><div className="absolute -right-3 -top-3 size-16 rounded-full border-8 border-pearl bg-mauve/70" /><BookOpen className="mb-10 text-plum" size={40} strokeWidth={1.4} /><p className="font-editorial text-3xl leading-tight text-plum sm:text-4xl">“Good writing leaves a little more light in the room.”</p><p className="mt-8 text-sm font-semibold uppercase tracking-widest text-charcoal/50">Read slowly · Think deeply</p></div></section>
    <section className="border-y border-mauve/25 bg-white/55"><div className="mx-auto grid max-w-7xl gap-px px-5 py-8 sm:grid-cols-3 lg:px-8">{stats.map(({ icon: Icon, value, label }) => <div key={label} className="flex items-center gap-4 border-mauve/20 py-4 sm:justify-center sm:border-r last:border-0"><span className="grid size-11 place-items-center rounded-2xl bg-rose text-plum"><Icon size={20} /></span><div><p className="text-2xl font-semibold text-charcoal">{value}</p><p className="text-sm text-charcoal/55">{label}</p></div></div>)}</div></section>
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="mb-8 flex items-end justify-between"><div><p className="text-sm font-semibold uppercase tracking-widest text-plum">From the archive</p><h2 className="mt-2 text-4xl font-semibold">Recent stories</h2></div><Link to="/posts" className="hidden items-center gap-2 text-sm font-semibold text-plum hover:text-charcoal sm:flex">View all <ArrowRight size={16} /></Link></div>{error && <p className="rounded-2xl bg-rose p-5 text-plum">{error}</p>}{!data && !error && <div className="grid gap-5 sm:grid-cols-3">{[1, 2, 3].map((item) => <div key={item} className="h-48 animate-pulse rounded-3xl bg-rose" />)}</div>}{data && <div className="grid gap-5 sm:grid-cols-3">{data.posts.slice(0, 3).map((post) => <Link to="/posts" key={post.id} className="group rounded-3xl border border-mauve/25 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg"><span className="text-xs font-semibold uppercase tracking-widest text-mauve">No. {String(post.id).padStart(2, '0')}</span><h3 className="mt-5 line-clamp-2 text-xl font-semibold capitalize leading-tight group-hover:text-plum">{post.title}</h3><p className="mt-3 line-clamp-2 text-sm leading-6 text-charcoal/60">{post.body}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-plum">Read story <ArrowRight size={15} /></span></Link>)}</div>}</section>
  </div>;
}

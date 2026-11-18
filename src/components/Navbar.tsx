import { BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [{ label: 'Home', to: '/' }, { label: 'Posts', to: '/posts' }, { label: 'Comments', to: '/comments' }, { label: 'Users', to: '/users' }];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-mauve/30 bg-pearl/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"><NavLink to="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight text-plum" onClick={() => setOpen(false)}><span className="grid size-9 place-items-center rounded-xl bg-plum text-white shadow-sm"><BookOpen size={18} /></span>BlogSpace<span className="text-mauve">.</span></NavLink><button className="rounded-lg p-2 text-plum md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X size={22} /> : <Menu size={22} />}</button><nav className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col gap-1 border-b border-mauve/30 bg-pearl px-5 py-3 md:static md:flex md:flex-row md:items-center md:gap-2 md:border-0 md:bg-transparent md:p-0`}>{links.map((link) => <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setOpen(false)} className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-plum text-white shadow-sm' : 'text-charcoal/70 hover:bg-rose hover:text-plum'}`}>{link.label}</NavLink>)}</nav></div></header>;
}

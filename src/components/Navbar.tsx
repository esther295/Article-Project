import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Articles', path: '/articles' },
    { name: 'Authors', path: '/authors' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#D5D0C7] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-baseline gap-2.5 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="font-editorial text-2xl sm:text-3xl font-semibold tracking-tight text-[#123F40] group-hover:text-[#245C5A] transition-colors">
              The Journal
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#123F40] inline-block mb-1"></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors pb-1 border-b-2 ${
                    isActive
                      ? 'text-[#123F40] border-[#123F40] font-semibold'
                      : 'text-[#777873] border-transparent hover:text-[#242A29] hover:border-[#D5D0C7]'
                  }`}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action: Editorial Issue Indicator */}
          <div className="hidden lg:flex items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-[#777873] font-mono border-l border-[#D5D0C7] pl-4">
              Vol. XXIV • Autumn Edition
            </span>
            <Link
              to="/articles"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF9F6] bg-[#123F40] hover:bg-[#245C5A] rounded transition-all shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Feed</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-[#242A29] hover:text-[#123F40] hover:bg-[#E6E1D8]/60 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#D5D0C7] bg-[#FAF9F6] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded text-base font-editorial ${
                    isActive
                      ? 'bg-[#E6E1D8] text-[#123F40] font-semibold'
                      : 'text-[#242A29] hover:bg-[#F0ECE5]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#D5D0C7] flex justify-between items-center text-xs text-[#777873]">
            <span>Vol. XXIV • The Journal</span>
            <Link
              to="/articles"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#123F40] font-semibold flex items-center gap-1 hover:underline"
            >
              Explore all articles <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

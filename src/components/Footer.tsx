import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F0ECE5] border-t border-[#D5D0C7] text-[#242A29] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-block font-editorial text-3xl font-semibold tracking-tight text-[#123F40]">
              The Journal
            </Link>
            <p className="text-sm text-[#777873] leading-relaxed max-w-sm">
              An independent digital publication devoted to deliberate thought, architectural form, cultural criticism, and human essays. Stories crafted to outlast the daily news cycle.
            </p>
            <div className="text-xs font-mono uppercase tracking-widest text-[#777873] pt-2">
              Published continuously • Open API Source
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#123F40] font-sans">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#777873]">
              <li>
                <Link to="/" className="hover:text-[#123F40] transition-colors">
                  Front Page
                </Link>
              </li>
              <li>
                <Link to="/articles" className="hover:text-[#123F40] transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link to="/authors" className="hover:text-[#123F40] transition-colors">
                  Contributing Authors
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#123F40] transition-colors">
                  Editorial Ethos & About
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial Columns */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#123F40] font-sans">
              Editorial Desks
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-[#777873]">
              <span className="hover:text-[#123F40] transition-colors cursor-pointer">Essays & Ideas</span>
              <span className="hover:text-[#123F40] transition-colors cursor-pointer">Architecture</span>
              <span className="hover:text-[#123F40] transition-colors cursor-pointer">Culture & Arts</span>
              <span className="hover:text-[#123F40] transition-colors cursor-pointer">Philosophy</span>
              <span className="hover:text-[#123F40] transition-colors cursor-pointer">Technology</span>
              <span className="hover:text-[#123F40] transition-colors cursor-pointer">Literature</span>
            </div>
            <p className="text-xs text-[#777873] pt-3 leading-normal border-t border-[#D5D0C7]/80">
              Integrated with JSONPlaceholder REST data endpoints.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#D5D0C7] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777873]">
          <div>
            &copy; {new Date().getFullYear()} The Journal. All rights reserved. Built with React, Vite & Tailwind CSS.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#123F40] hover:text-[#245C5A] font-medium transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

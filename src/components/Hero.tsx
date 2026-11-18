import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Feather } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[#D5D0C7]">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
        {/* Issue Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F6] border border-[#D5D0C7] text-xs font-mono uppercase tracking-widest text-[#123F40] mb-8 shadow-2xs">
          <Feather className="w-3.5 h-3.5 text-[#123F40]" />
          <span>Independent Digital Magazine</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#242A29] leading-[1.08] sm:leading-[1.05] mb-6">
          Stories Worth <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#123F40]">Your Time</span>.
        </h1>

        {/* Intro Subtitle */}
        <p className="text-base sm:text-lg text-[#777873] leading-relaxed max-w-2xl mx-auto font-sans font-normal mb-10">
          A publication of long-form essays, observations on modern design, and deliberate commentary. Written by independent thinkers and edited for lasting resonance.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <Link
            to="/articles"
            className="w-full sm:w-auto px-7 py-3.5 rounded bg-[#123F40] text-[#FAF9F6] font-medium tracking-wide hover:bg-[#245C5A] shadow-sm transition-all"
          >
            Explore All Articles
          </Link>
          <Link
            to="/authors"
            className="w-full sm:w-auto px-7 py-3.5 rounded bg-[#FAF9F6] text-[#242A29] border border-[#D5D0C7] font-medium tracking-wide hover:bg-[#F0ECE5] hover:text-[#123F40] transition-all"
          >
            Meet Our Authors
          </Link>
        </div>

        {/* Reading Invitation */}
        <div className="mt-14 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#777873]">
          <span>Featured Dispatch Below</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#123F40]" />
        </div>
      </div>
    </section>
  );
};

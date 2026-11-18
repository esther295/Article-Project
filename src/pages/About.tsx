import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, BookOpen, Sparkles, Compass } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
      {/* Title Header */}
      <div className="text-center space-y-4 pb-8 border-b border-[#D5D0C7]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#D5D0C7] text-xs font-mono uppercase tracking-widest text-[#123F40]">
          <Feather className="w-3.5 h-3.5 text-[#123F40]" />
          <span>Editorial Manifesto</span>
        </div>

        <h1 className="font-editorial text-4xl sm:text-6xl font-semibold text-[#242A29] leading-tight">
          About <span className="italic text-[#123F40]">The Journal</span>
        </h1>

        <p className="text-base sm:text-lg text-[#777873] leading-relaxed max-w-2xl mx-auto font-sans">
          An independent digital magazine dedicated to the art of deliberate thinking, architectural clarity, and human essays in an age of programmatic noise.
        </p>
      </div>

      {/* Main Narrative */}
      <div className="space-y-8 text-base sm:text-lg text-[#242A29] leading-[1.8] font-sans">
        <p className="first-letter:font-editorial first-letter:text-6xl first-letter:font-bold first-letter:text-[#123F40] first-letter:float-left first-letter:mr-3.5 first-letter:leading-none">
          The Journal was founded on a simple conviction: that speed is often the enemy of depth. As our media landscape accelerated into short-form updates, hot takes, and algorithmic recommendation loops, the space for thoughtful, patient contemplation shrank.
        </p>

        <p>
          We publish essays that do not expire with the morning headlines. Our contributors explore the quiet intersections of architecture, design philosophy, ethical systems, and the culture of craft. Each publication is treated as a physical document—deliberately formatted, beautifully set, and given the room it requires to breathe.
        </p>

        {/* Pull Quote */}
        <div className="my-10 p-8 rounded-lg bg-[#FAF9F6] border border-[#D5D0C7] text-center space-y-2 shadow-2xs">
          <p className="font-editorial italic text-xl sm:text-2xl text-[#123F40] leading-snug">
            &ldquo;We do not publish for the next ten minutes. We publish for the next ten years.&rdquo;
          </p>
          <span className="text-xs font-mono uppercase tracking-widest text-[#777873] block pt-2">
            The Journal Editorial Board
          </span>
        </div>

        <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#242A29] pt-4">
          Core Pillars of Our Practice
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 not-prose">
          <div className="bg-[#FAF9F6] border border-[#D5D0C7] p-6 rounded-lg space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#E6E1D8] flex items-center justify-center text-[#123F40] mb-3">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-editorial text-lg font-semibold text-[#242A29]">
              Deliberate Reading
            </h3>
            <p className="text-xs text-[#777873] leading-relaxed">
              We design layouts with generous margins, restrained palettes, and classic serif typography to invite focused study.
            </p>
          </div>

          <div className="bg-[#FAF9F6] border border-[#D5D0C7] p-6 rounded-lg space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#E6E1D8] flex items-center justify-center text-[#123F40] mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-editorial text-lg font-semibold text-[#242A29]">
              Human Authorship
            </h3>
            <p className="text-xs text-[#777873] leading-relaxed">
              Every piece represents a distinct individual viewpoint, attributed directly to fellows and essayists worldwide.
            </p>
          </div>

          <div className="bg-[#FAF9F6] border border-[#D5D0C7] p-6 rounded-lg space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#E6E1D8] flex items-center justify-center text-[#123F40] mb-3">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="font-editorial text-lg font-semibold text-[#242A29]">
              Open Architecture
            </h3>
            <p className="text-xs text-[#777873] leading-relaxed">
              Powered by real-time REST data streams, proving that modern engineering and classic editorial design can coexist seamlessly.
            </p>
          </div>
        </div>

        <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#242A29] pt-6">
          Colophon & Technical Foundation
        </h2>
        <p className="text-sm text-[#777873] leading-relaxed">
          The Journal is built with <strong>React</strong>, <strong>Vite</strong>, and <strong>Tailwind CSS</strong>. Type is set in Newsreader (serif) and Plus Jakarta Sans (sans-serif). The color identity is anchored in natural greige (<code className="text-[#123F40] font-mono">#E6E1D8</code>) and deep teal (<code className="text-[#123F40] font-mono">#123F40</code>). All data is retrieved dynamically via the JSONPlaceholder API.
        </p>
      </div>

      {/* Action links */}
      <div className="pt-8 border-t border-[#D5D0C7] flex flex-wrap items-center justify-center gap-4 text-sm">
        <Link
          to="/articles"
          className="px-6 py-3 rounded bg-[#123F40] text-[#FAF9F6] font-medium tracking-wide hover:bg-[#245C5A] shadow-sm transition-all"
        >
          Explore the Archive
        </Link>
        <Link
          to="/authors"
          className="px-6 py-3 rounded bg-[#FAF9F6] text-[#242A29] border border-[#D5D0C7] font-medium tracking-wide hover:bg-[#F0ECE5] transition-all"
        >
          View Masthead Contributors
        </Link>
      </div>
    </div>
  );
};

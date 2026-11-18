import React from 'react';

export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 animate-pulse"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2.5 flex-1">
              <div className="h-3.5 bg-slate-800 rounded w-1/3"></div>
              <div className="h-7 bg-slate-800 rounded w-1/2"></div>
            </div>
            <div className="w-10 h-10 bg-slate-800 rounded-xl"></div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="h-3 bg-slate-800 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({
  rows = 5,
  cols = 5,
}) => {
  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden animate-pulse">
      <div className="bg-slate-850 p-4 border-b border-slate-800 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-4 bg-slate-800 rounded flex-1"></div>
        ))}
      </div>
      <div className="divide-y divide-slate-800/60">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="p-4 flex gap-4 items-center">
            {Array.from({ length: cols }).map((_, c) => (
              <div
                key={c}
                className={`h-4 bg-slate-800/80 rounded ${
                  c === 0 ? 'w-1/4' : 'flex-1'
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const PostCardSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 animate-pulse space-y-3"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-800"></div>
            <div className="h-3.5 bg-slate-800 rounded w-1/3"></div>
          </div>
          <div className="h-5 bg-slate-800 rounded w-4/5"></div>
          <div className="space-y-1.5 pt-1">
            <div className="h-3 bg-slate-800 rounded w-full"></div>
            <div className="h-3 bg-slate-800 rounded w-5/6"></div>
          </div>
          <div className="pt-3 border-t border-slate-800 flex justify-between">
            <div className="h-3 bg-slate-800 rounded w-1/4"></div>
            <div className="h-3 bg-slate-800 rounded w-1/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

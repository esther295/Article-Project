import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  message?: string;
  count?: number;
}

export const Loading: React.FC<LoadingProps> = ({
  message = 'Retrieving articles from the archive...',
  count = 3,
}) => {
  return (
    <div className="py-12 space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col items-center justify-center text-center space-y-3">
        <Loader2 className="w-6 h-6 animate-spin text-[#123F40]" />
        <p className="text-sm font-mono uppercase tracking-widest text-[#777873]">
          {message}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-[#FAF9F6] border border-[#D5D0C7] rounded-lg p-7 space-y-4 animate-pulse"
          >
            <div className="flex justify-between items-center">
              <div className="h-4 bg-[#E6E1D8] rounded w-20"></div>
              <div className="h-3 bg-[#E6E1D8] rounded w-16"></div>
            </div>
            <div className="h-6 bg-[#E6E1D8] rounded w-4/5"></div>
            <div className="space-y-2 pt-2">
              <div className="h-3.5 bg-[#E6E1D8] rounded w-full"></div>
              <div className="h-3.5 bg-[#E6E1D8] rounded w-5/6"></div>
              <div className="h-3.5 bg-[#E6E1D8] rounded w-2/3"></div>
            </div>
            <div className="pt-4 border-t border-[#D5D0C7]/80 flex justify-between items-center">
              <div className="h-4 bg-[#E6E1D8] rounded w-24"></div>
              <div className="h-3 bg-[#E6E1D8] rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

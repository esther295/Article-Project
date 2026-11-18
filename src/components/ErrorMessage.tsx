import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = 'An unexpected error occurred while fetching the journal data.',
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`p-6 sm:p-8 rounded-lg bg-[#FAF9F6] border border-[#D5D0C7] text-[#242A29] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-full bg-[#E6E1D8] text-[#123F40] shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-editorial text-lg font-semibold text-[#242A29]">
            Unable to Load Dispatch
          </h4>
          <p className="text-sm text-[#777873] leading-relaxed max-w-lg">
            {message}
          </p>
        </div>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#123F40] hover:bg-[#245C5A] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Request</span>
        </button>
      )}
    </div>
  );
};

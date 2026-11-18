import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface ErrorAlertProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title = 'Failed to load data',
  message,
  onRetry,
  isRetrying = false,
  className = '',
}) => {
  return (
    <div
      className={`bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 sm:p-5 text-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-rose-500/20 text-rose-400 rounded-lg shrink-0 mt-0.5">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-rose-200 text-sm">{title}</h4>
          <p className="text-xs text-rose-300/80 mt-1 leading-relaxed">{message}</p>
        </div>
      </div>
      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          isLoading={isRetrying}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          className="shrink-0 bg-rose-950/40 hover:bg-rose-900/50 border-rose-500/30 text-rose-200"
        >
          Retry Request
        </Button>
      )}
    </div>
  );
};

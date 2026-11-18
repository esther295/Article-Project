import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
  gradient: 'indigo' | 'emerald' | 'purple' | 'amber' | 'blue';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  gradient,
  onClick,
}) => {
  const gradientBorder = {
    indigo: 'hover:border-indigo-500/50 group-hover:text-indigo-400',
    emerald: 'hover:border-emerald-500/50 group-hover:text-emerald-400',
    purple: 'hover:border-purple-500/50 group-hover:text-purple-400',
    amber: 'hover:border-amber-500/50 group-hover:text-amber-400',
    blue: 'hover:border-blue-500/50 group-hover:text-blue-400',
  };

  const iconBg = {
    indigo: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  };

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden bg-slate-900/70 backdrop-blur border border-slate-800 rounded-xl p-5 transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:bg-slate-800/60 hover:shadow-lg hover:shadow-indigo-500/5' : ''
      } ${gradientBorder[gradient]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-white tracking-tight">{value}</h3>
          {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${iconBg[gradient]} transition-transform duration-200 group-hover:scale-110`}>
          {icon}
        </div>
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            {trend}
          </span>
          {onClick && (
            <span className="text-slate-500 group-hover:text-slate-300 transition-colors flex items-center gap-0.5">
              View all &rarr;
            </span>
          )}
        </div>
      )}
    </div>
  );
};

import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { cn } from '../lib/utils';

interface StatusCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down' | 'neutral';
  color: 'blue' | 'green' | 'amber' | 'red';
}

export function StatusCard({ title, value, change, icon: Icon, trend, color }: StatusCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-400',
    green: 'bg-green-500/10 text-green-400',
    amber: 'bg-amber-500/10 text-amber-400',
    red: 'bg-red-500/10 text-red-400',
  };

  return (
    <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-slate-400 text-sm mb-2">{title}</p>
            <p className="text-white text-3xl mb-1">{value}</p>
            <p className={cn(
              "text-sm",
              trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-slate-400'
            )}>
              {change}
            </p>
          </div>
          <div className={cn("p-3 rounded-lg", colorClasses[color])}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { StatusCard } from '../StatusCard';
import { ActivityFeed } from '../ActivityFeed';
import { InteractiveMap } from '../InteractiveMap';
import { Plane, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      title: 'Active Drones',
      value: '4',
      change: '+2 from yesterday',
      icon: Plane,
      trend: 'up',
      color: 'blue',
    },
    {
      title: 'Processing Queue',
      value: '12',
      change: '3 high priority',
      icon: Clock,
      trend: 'neutral',
      color: 'amber',
    },
    {
      title: 'Completed Today',
      value: '23',
      change: '+18% vs. avg',
      icon: CheckCircle,
      trend: 'up',
      color: 'green',
    },
    {
      title: 'Alerts',
      value: '5',
      change: '2 critical',
      icon: AlertTriangle,
      trend: 'down',
      color: 'red',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section - Interactive Map */}
      <div>
        <div className="mb-4">
          <h1 className="text-white mb-1">Mission Control Center</h1>
          <p className="text-slate-400">Real-time drone inspection monitoring and analysis</p>
        </div>
        <InteractiveMap />
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatusCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <ActivityFeed />
    </div>
  );
}

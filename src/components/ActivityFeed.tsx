import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Upload, CheckCircle, AlertCircle, FileText, Activity } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'upload' | 'complete' | 'alert' | 'report';
  title: string;
  description: string;
  timestamp: string;
}

export function ActivityFeed() {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'complete',
      title: 'Mission Alpha-7 Analysis Complete',
      description: 'Thermal inspection processed - 3 anomalies detected',
      timestamp: '5 minutes ago',
    },
    {
      id: '2',
      type: 'upload',
      title: 'New Data Upload',
      description: 'Solar Farm West - 45 thermal images uploaded',
      timestamp: '12 minutes ago',
    },
    {
      id: '3',
      type: 'alert',
      title: 'High Temperature Alert',
      description: 'Panel B-23 exceeding threshold (85°C)',
      timestamp: '23 minutes ago',
    },
    {
      id: '4',
      type: 'report',
      title: 'Report Generated',
      description: 'Q4 Infrastructure Summary - Ready for download',
      timestamp: '1 hour ago',
    },
    {
      id: '5',
      type: 'complete',
      title: 'Mission Beta-3 Complete',
      description: 'Pipeline inspection - No issues detected',
      timestamp: '2 hours ago',
    },
  ];

  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'upload':
        return <Upload className="h-5 w-5 text-blue-400" />;
      case 'complete':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      case 'report':
        return <FileText className="h-5 w-5 text-amber-400" />;
    }
  };

  const getColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'upload':
        return 'bg-blue-500/10 border-blue-500/20';
      case 'complete':
        return 'bg-green-500/10 border-green-500/20';
      case 'alert':
        return 'bg-red-500/10 border-red-500/20';
      case 'report':
        return 'bg-amber-500/10 border-amber-500/20';
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="border-b border-slate-700">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <Badge variant="secondary" className="bg-slate-700 text-slate-300 border-0">
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex gap-4 pb-4 ${index !== activities.length - 1 ? 'border-b border-slate-700' : ''}`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${getColor(activity.type)}`}>
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white mb-1">{activity.title}</p>
                <p className="text-slate-400 text-sm mb-1">{activity.description}</p>
                <p className="text-slate-500 text-xs">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

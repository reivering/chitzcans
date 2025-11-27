import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { AlertTriangle } from 'lucide-react';

interface Anomaly {
  id: string;
  location: string;
  type: string;
  severity: 'Critical' | 'Warning' | 'Info';
  temperature: string;
  recommendation: string;
}

export function AnomalyTable() {
  const anomalies: Anomaly[] = [
    {
      id: '1',
      location: 'Panel B-23',
      type: 'Hot Spot',
      severity: 'Critical',
      temperature: '92°C',
      recommendation: 'Immediate inspection required',
    },
    {
      id: '2',
      location: 'Panel C-15',
      type: 'Hot Spot',
      severity: 'Critical',
      temperature: '88°C',
      recommendation: 'Replace panel',
    },
    {
      id: '3',
      location: 'Panel A-07',
      type: 'Elevated Temperature',
      severity: 'Warning',
      temperature: '75°C',
      recommendation: 'Monitor closely',
    },
    {
      id: '4',
      location: 'Panel D-31',
      type: 'Hot Spot',
      severity: 'Critical',
      temperature: '90°C',
      recommendation: 'Immediate inspection required',
    },
    {
      id: '5',
      location: 'Panel B-12',
      type: 'Elevated Temperature',
      severity: 'Warning',
      temperature: '72°C',
      recommendation: 'Schedule maintenance',
    },
    {
      id: '6',
      location: 'Panel E-05',
      type: 'Minor Variance',
      severity: 'Info',
      temperature: '65°C',
      recommendation: 'No action needed',
    },
  ];

  const getSeverityColor = (severity: Anomaly['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500 text-white border-0';
      case 'Warning':
        return 'bg-amber-500 text-white border-0';
      case 'Info':
        return 'bg-blue-500 text-white border-0';
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700 h-full">
      <CardHeader className="border-b border-slate-700">
        <CardTitle className="text-white flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Detected Anomalies
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="p-4 space-y-3">
            {anomalies.map((anomaly) => (
              <div
                key={anomaly.id}
                className="bg-slate-900 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-white mb-1">{anomaly.location}</p>
                    <p className="text-slate-400 text-sm">{anomaly.type}</p>
                  </div>
                  <Badge className={getSeverityColor(anomaly.severity)}>
                    {anomaly.severity}
                  </Badge>
                </div>
                
                <div className="space-y-2 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Temperature:</span>
                    <span className="text-white text-sm">{anomaly.temperature}</span>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Recommendation:</p>
                    <p className="text-white text-sm">{anomaly.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

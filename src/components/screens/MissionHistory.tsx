import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function MissionHistory() {
  const navigate = useNavigate();

  const history = [
    {
      id: 'mission-001',
      name: 'Solar Farm East Wing',
      date: 'Nov 16, 2025',
      anomalies: 12,
      status: 'Complete',
    },
    {
      id: 'mission-002',
      name: 'Bridge Infrastructure Check',
      date: 'Nov 15, 2025',
      anomalies: 2,
      status: 'Complete',
    },
    {
      id: 'mission-003',
      name: 'Wind Turbine Inspection',
      date: 'Nov 14, 2025',
      anomalies: 0,
      status: 'Complete',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white mb-1">Mission History</h1>
        <p className="text-slate-400">View completed inspection missions</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {history.map((mission) => (
          <Card key={mission.id} className="bg-slate-800 border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-white mb-2">{mission.name}</h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-400">{mission.date}</span>
                  <span className="text-slate-400">
                    {mission.anomalies} anomalies detected
                  </span>
                  <Badge className="bg-green-600 text-white border-0">
                    {mission.status}
                  </Badge>
                </div>
              </div>
              <Button
                onClick={() => navigate(`/reports/${mission.id}`)}
                variant="outline"
                className="border-slate-700 text-white hover:bg-slate-700"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Report
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

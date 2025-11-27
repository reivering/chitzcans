import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Plane, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ActiveMissions() {
  const navigate = useNavigate();

  const missions = [
    {
      id: 'alpha-7',
      name: 'Solar Farm Alpha Inspection',
      drone: 'Fleet Alpha-1',
      status: 'In Progress',
      progress: 65,
      startTime: '10:30 AM',
    },
    {
      id: 'beta-3',
      name: 'Pipeline Monitoring North',
      drone: 'Fleet Beta-2',
      status: 'In Progress',
      progress: 45,
      startTime: '11:15 AM',
    },
    {
      id: 'gamma-1',
      name: 'Rooftop Survey Downtown',
      drone: 'Fleet Alpha-2',
      status: 'Scheduled',
      progress: 0,
      startTime: '2:00 PM',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-1">Active Missions</h1>
          <p className="text-slate-400">Monitor and manage ongoing inspections</p>
        </div>
        <Button onClick={() => navigate('/missions/new')} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Mission
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {missions.map((mission) => (
          <Card key={mission.id} className="bg-slate-800 border-slate-700">
            <CardHeader className="border-b border-slate-700">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{mission.name}</CardTitle>
                <Badge className={mission.status === 'In Progress' ? 'bg-blue-600 text-white border-0' : 'bg-slate-700 text-white border-0'}>
                  {mission.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <Plane className="h-4 w-4" />
                  <span>{mission.drone}</span>
                  <span className="text-slate-500">•</span>
                  <span>Started at {mission.startTime}</span>
                </div>
                {mission.progress > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 text-sm">Progress</span>
                      <span className="text-white">{mission.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${mission.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

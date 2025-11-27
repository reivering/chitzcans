import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Plane, Battery, Signal } from 'lucide-react';

export function FleetStatus() {
  const fleet = [
    {
      id: 'alpha-1',
      name: 'Fleet Alpha-1',
      status: 'Active',
      battery: 75,
      signal: 'Excellent',
      location: 'Solar Farm East',
      flightTime: '45 min',
    },
    {
      id: 'alpha-2',
      name: 'Fleet Alpha-2',
      status: 'Active',
      battery: 60,
      signal: 'Good',
      location: 'Downtown Sector',
      flightTime: '32 min',
    },
    {
      id: 'beta-1',
      name: 'Fleet Beta-1',
      status: 'Charging',
      battery: 35,
      signal: 'N/A',
      location: 'Base Station',
      flightTime: '0 min',
    },
    {
      id: 'beta-2',
      name: 'Fleet Beta-2',
      status: 'Ready',
      battery: 100,
      signal: 'Excellent',
      location: 'Base Station',
      flightTime: '0 min',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-600 text-white border-0';
      case 'Ready':
        return 'bg-green-600 text-white border-0';
      case 'Charging':
        return 'bg-amber-600 text-white border-0';
      default:
        return 'bg-slate-600 text-white border-0';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'text-green-400';
    if (battery > 30) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white mb-1">Fleet Status</h1>
        <p className="text-slate-400">Monitor all drones in your fleet</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {fleet.map((drone) => (
          <Card key={drone.id} className="bg-slate-800 border-slate-700">
            <CardHeader className="border-b border-slate-700">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  {drone.name}
                </CardTitle>
                <Badge className={getStatusColor(drone.status)}>
                  {drone.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Battery className={`h-4 w-4 ${getBatteryColor(drone.battery)}`} />
                    <span>Battery</span>
                  </div>
                  <span className={`${getBatteryColor(drone.battery)}`}>
                    {drone.battery}%
                  </span>
                </div>
                <Progress value={drone.battery} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <Signal className="h-4 w-4" />
                  <span>Signal</span>
                </div>
                <span className="text-white">{drone.signal}</span>
              </div>

              <div className="pt-3 border-t border-slate-700 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Location</span>
                  <span className="text-white">{drone.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Flight Time</span>
                  <span className="text-white">{drone.flightTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  status: 'complete' | 'processing' | 'attention';
  label: string;
  mission: string;
}

export function InteractiveMap() {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const markers: MapMarker[] = [
    { id: '1', lat: 35, lng: 25, status: 'complete', label: 'Zone A-1', mission: 'Solar Panel Inspection' },
    { id: '2', lat: 55, lng: 45, status: 'processing', label: 'Zone B-3', mission: 'Thermal Scan' },
    { id: '3', lat: 45, lng: 70, status: 'attention', label: 'Zone C-2', mission: 'Infrastructure Check' },
    { id: '4', lat: 65, lng: 30, status: 'complete', label: 'Zone A-5', mission: 'Rooftop Survey' },
    { id: '5', lat: 25, lng: 60, status: 'processing', label: 'Zone D-1', mission: 'Pipeline Monitoring' },
  ];

  const statusColors = {
    complete: 'bg-green-500',
    processing: 'bg-amber-500',
    attention: 'bg-red-500',
  };

  return (
    <Card className="bg-slate-800 border-slate-700 overflow-hidden">
      <div className="relative h-[400px] lg:h-[500px]">
        {/* Map Background */}
        <div className="absolute inset-0 bg-slate-900">
          {/* Grid pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
          
          {/* Flight paths */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="rgba(59, 130, 246, 0.5)" />
              </marker>
            </defs>
            <path d="M 150 175 Q 300 200 400 225" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
            <path d="M 400 225 Q 500 300 550 350" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
            <path d="M 300 450 Q 450 400 650 150" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
          </svg>

          {/* Markers */}
          {markers.map((marker) => (
            <button
              key={marker.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${marker.lng}%`, top: `${marker.lat}%` }}
              onClick={() => setSelectedMarker(marker.id)}
            >
              <div className="relative">
                <div className={`w-4 h-4 rounded-full ${statusColors[marker.status]} ring-4 ring-slate-900 group-hover:scale-125 transition-transform`} />
                <div className={`absolute inset-0 rounded-full ${statusColors[marker.status]} opacity-50 animate-ping`} />
              </div>
              
              {selectedMarker === marker.id && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-slate-800 border border-slate-700 rounded-lg p-3 w-48 shadow-xl">
                  <p className="text-white text-sm mb-1">{marker.label}</p>
                  <p className="text-slate-400 text-xs mb-2">{marker.mission}</p>
                  <Badge className={`${statusColors[marker.status]} border-0 text-white text-xs`}>
                    {marker.status.charAt(0).toUpperCase() + marker.status.slice(1)}
                  </Badge>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button size="sm" variant="secondary" className="bg-slate-800/90 border-slate-700 text-white hover:bg-slate-700">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="secondary" className="bg-slate-800/90 border-slate-700 text-white hover:bg-slate-700">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="secondary" className="bg-slate-800/90 border-slate-700 text-white hover:bg-slate-700">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-slate-800/90 border border-slate-700 rounded-lg p-4">
          <p className="text-white text-sm mb-3">Status Legend</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-slate-300 text-sm">Complete</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-slate-300 text-sm">Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-slate-300 text-sm">Requires Attention</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

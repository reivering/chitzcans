import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Square, Circle, Pencil, Trash2, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

type Tool = 'select' | 'rectangle' | 'circle' | 'polygon';

export function DrawingToolsMap() {
  const [selectedTool, setSelectedTool] = useState<Tool>('select');
  const [shapes, setShapes] = useState<any[]>([
    { type: 'rectangle', x: 150, y: 100, width: 200, height: 150, id: '1' },
  ]);

  const tools = [
    { id: 'select' as Tool, icon: MapPin, label: 'Select' },
    { id: 'rectangle' as Tool, icon: Square, label: 'Rectangle' },
    { id: 'circle' as Tool, icon: Circle, label: 'Circle' },
    { id: 'polygon' as Tool, icon: Pencil, label: 'Polygon' },
  ];

  return (
    <Card className="bg-slate-800 border-slate-700 overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-slate-700 p-4 bg-slate-900/50">
        <div className="flex items-center gap-2">
          <p className="text-slate-300 text-sm mr-4">Drawing Tools:</p>
          {tools.map((tool) => (
            <Button
              key={tool.id}
              size="sm"
              variant={selectedTool === tool.id ? 'default' : 'ghost'}
              className={cn(
                selectedTool === tool.id
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              )}
              onClick={() => setSelectedTool(tool.id)}
            >
              <tool.icon className="h-4 w-4 mr-2" />
              {tool.label}
            </Button>
          ))}
          <div className="flex-1" />
          <Button
            size="sm"
            variant="ghost"
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            onClick={() => setShapes([])}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative h-[500px] bg-slate-900">
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Map simulation */}
        <svg className="absolute inset-0 w-full h-full">
          {/* Existing shapes */}
          {shapes.map((shape) => {
            if (shape.type === 'rectangle') {
              return (
                <rect
                  key={shape.id}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  fill="rgba(59, 130, 246, 0.2)"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              );
            }
            return null;
          })}

          {/* Inspection zone marker */}
          <g>
            <text x="160" y="90" fill="rgb(59, 130, 246)" fontSize="12">
              Inspection Zone A
            </text>
          </g>
        </svg>

        {/* Instructions overlay */}
        <div className="absolute top-4 left-4 bg-slate-800/90 border border-slate-700 rounded-lg p-4 max-w-xs">
          <p className="text-white text-sm mb-2">Define Inspection Area</p>
          <p className="text-slate-400 text-xs">
            Select a drawing tool and click on the map to define the inspection boundaries.
            Use the rectangle tool for regular areas or polygon for custom shapes.
          </p>
        </div>

        {/* Coordinates info */}
        <div className="absolute bottom-4 right-4 bg-slate-800/90 border border-slate-700 rounded-lg px-4 py-2">
          <p className="text-slate-300 text-xs">
            Coordinates: 40.7128°N, 74.0060°W | Zoom: 15x
          </p>
        </div>
      </div>
    </Card>
  );
}

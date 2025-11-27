import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ThermalImageViewerProps {
  colorPalette: string;
  zoomLevel: number;
}

export function ThermalImageViewer({ colorPalette, zoomLevel }: ThermalImageViewerProps) {
  const [activeTab, setActiveTab] = useState('thermal');

  const getPaletteGradient = () => {
    switch (colorPalette) {
      case 'grayscale':
        return 'linear-gradient(to right, #000000, #ffffff)';
      case 'ironbow':
        return 'linear-gradient(to right, #000033, #0000ff, #00ffff, #ffff00, #ff0000, #ffffff)';
      case 'rainbow':
        return 'linear-gradient(to right, #0000ff, #00ff00, #ffff00, #ff0000)';
      default:
        return 'linear-gradient(to right, #000033, #0000ff, #00ffff, #ffff00, #ff0000, #ffffff)';
    }
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-slate-700 px-4">
          <TabsList className="bg-transparent border-0 h-auto p-0">
            <TabsTrigger
              value="thermal"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-3 text-slate-400 data-[state=active]:text-white"
            >
              Thermal View
            </TabsTrigger>
            <TabsTrigger
              value="rgb"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-3 text-slate-400 data-[state=active]:text-white"
            >
              RGB View
            </TabsTrigger>
            <TabsTrigger
              value="overlay"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-3 text-slate-400 data-[state=active]:text-white"
            >
              Overlay
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="thermal" className="m-0">
          <div className="relative bg-slate-900 aspect-video flex items-center justify-center overflow-hidden">
            {/* Thermal simulation */}
            <div
              className="relative w-full h-full"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              {/* Gradient background simulating thermal image */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 60% 40%, rgba(255, 0, 0, 0.8), rgba(255, 255, 0, 0.6), rgba(0, 255, 255, 0.4), rgba(0, 0, 255, 0.3))`,
                }}
              />

              {/* Anomaly markers */}
              <div className="absolute top-[35%] left-[55%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-20 h-20 border-2 border-red-500 bg-red-500/20 rounded-lg animate-pulse" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Critical: 92°C
                  </div>
                </div>
              </div>

              <div className="absolute top-[60%] left-[30%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-16 h-16 border-2 border-amber-500 bg-amber-500/20 rounded-lg" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Warning: 75°C
                  </div>
                </div>
              </div>
            </div>

            {/* Temperature scale */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-800/90 border border-slate-700 rounded-lg p-3">
              <div className="w-8 h-48 rounded" style={{ background: getPaletteGradient() }} />
              <div className="mt-2 space-y-1 text-xs text-white">
                <div className="flex justify-between">
                  <span>100°C</span>
                </div>
                <div className="flex justify-between">
                  <span>50°C</span>
                </div>
                <div className="flex justify-between">
                  <span>0°C</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rgb" className="m-0">
          <div className="relative bg-slate-900 aspect-video flex items-center justify-center">
            <div
              className="w-full h-full bg-slate-700 flex items-center justify-center"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              <p className="text-slate-400">RGB Image View</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="overlay" className="m-0">
          <div className="relative bg-slate-900 aspect-video flex items-center justify-center overflow-hidden">
            <div
              className="relative w-full h-full"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              {/* Combined view */}
              <div className="absolute inset-0 bg-slate-700" />
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background: `radial-gradient(circle at 60% 40%, rgba(255, 0, 0, 0.8), rgba(255, 255, 0, 0.6), rgba(0, 255, 255, 0.4), rgba(0, 0, 255, 0.3))`,
                }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

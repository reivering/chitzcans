import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  Ruler,
  Square,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  FileDown,
} from 'lucide-react';
import { ThermalImageViewer } from '../ThermalImageViewer';
import { AnomalyTable } from '../AnomalyTable';

export function ReportViewer() {
  const [colorPalette, setColorPalette] = useState('ironbow');
  const [zoomLevel, setZoomLevel] = useState(100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-white mb-1">Analysis Report - Mission Alpha-7</h1>
          <p className="text-slate-400">Solar Farm East Wing • November 16, 2025</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-700">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-700">
            <FileDown className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Anomalies</p>
                <p className="text-white text-2xl mt-1">12</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Critical Issues</p>
                <p className="text-white text-2xl mt-1">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Max Temperature</p>
                <p className="text-white text-2xl mt-1">92°C</p>
              </div>
              <Thermometer className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Coverage</p>
                <p className="text-white text-2xl mt-1">100%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image Viewer - Left side (2/3) */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="border-b border-slate-700">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="text-white">Image Analysis</CardTitle>
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Color Palette Selector */}
                  <Select value={colorPalette} onValueChange={setColorPalette}>
                    <SelectTrigger className="w-[140px] bg-slate-900 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      <SelectItem value="grayscale">Grayscale</SelectItem>
                      <SelectItem value="ironbow">Ironbow</SelectItem>
                      <SelectItem value="rainbow">Rainbow</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Zoom Controls */}
                  <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg p-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setZoomLevel(Math.max(50, zoomLevel - 25))}
                      className="h-7 w-7 p-0 text-white hover:bg-slate-700"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-white text-sm px-2">{zoomLevel}%</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setZoomLevel(Math.min(200, zoomLevel + 25))}
                      className="h-7 w-7 p-0 text-white hover:bg-slate-700"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ThermalImageViewer colorPalette={colorPalette} zoomLevel={zoomLevel} />
            </CardContent>
          </Card>

          {/* Measurement Tools */}
          <Card className="bg-slate-800 border-slate-700 mt-4">
            <CardHeader className="border-b border-slate-700">
              <CardTitle className="text-white text-lg">Measurement Tools</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-700">
                  <Ruler className="h-4 w-4 mr-2" />
                  Distance
                </Button>
                <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-700">
                  <Square className="h-4 w-4 mr-2" />
                  Area
                </Button>
                <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-700">
                  <Thermometer className="h-4 w-4 mr-2" />
                  Spot Temperature
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Panel - Right side (1/3) */}
        <div className="lg:col-span-1">
          <AnomalyTable />
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { FileUploadZone } from '../FileUploadZone';
import { DrawingToolsMap } from '../DrawingToolsMap';
import { Calendar, Plane, Thermometer, Camera, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useNavigate } from 'react-router-dom';

export function MissionPlanning() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [missionData, setMissionData] = useState({
    name: '',
    date: '',
    time: '',
    drone: '',
    inspectionType: '',
    notes: '',
  });
  const navigate = useNavigate();

  const handleStartProcessing = () => {
    if (!missionData.name || !missionData.drone || !missionData.inspectionType) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      toast.success('Mission created successfully!');
      navigate('/processing/mission-001');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-1">Mission Planning</h1>
          <p className="text-slate-400">Set up a new inspection mission</p>
        </div>
        <Button
          onClick={handleStartProcessing}
          disabled={isProcessing}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Start Processing'
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map View - 60% width on desktop */}
        <div className="lg:col-span-2">
          <DrawingToolsMap />
        </div>

        {/* Mission Details Form - 40% width on desktop */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800 border-slate-700 h-full">
            <CardHeader className="border-b border-slate-700">
              <CardTitle className="text-white">Mission Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Mission Name */}
              <div className="space-y-2">
                <Label htmlFor="mission-name" className="text-slate-300">Mission Name *</Label>
                <Input
                  id="mission-name"
                  placeholder="e.g., Solar Farm Alpha Inspection"
                  value={missionData.name}
                  onChange={(e) => setMissionData({ ...missionData, name: e.target.value })}
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mission-date" className="text-slate-300">Date</Label>
                  <div className="relative">
                    <Input
                      id="mission-date"
                      type="date"
                      value={missionData.date}
                      onChange={(e) => setMissionData({ ...missionData, date: e.target.value })}
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mission-time" className="text-slate-300">Time</Label>
                  <Input
                    id="mission-time"
                    type="time"
                    value={missionData.time}
                    onChange={(e) => setMissionData({ ...missionData, time: e.target.value })}
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
              </div>

              {/* Drone Selection */}
              <div className="space-y-2">
                <Label htmlFor="drone-select" className="text-slate-300">Drone Selection *</Label>
                <Select value={missionData.drone} onValueChange={(value) => setMissionData({ ...missionData, drone: value })}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                    <div className="flex items-center gap-2">
                      <Plane className="h-4 w-4 text-slate-400" />
                      <SelectValue placeholder="Select a drone" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="drone-1">Fleet Alpha-1 (Available)</SelectItem>
                    <SelectItem value="drone-2">Fleet Alpha-2 (Available)</SelectItem>
                    <SelectItem value="drone-3">Fleet Beta-1 (In Service)</SelectItem>
                    <SelectItem value="drone-4">Fleet Beta-2 (Charging)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Inspection Type */}
              <div className="space-y-2">
                <Label htmlFor="inspection-type" className="text-slate-300">Inspection Type *</Label>
                <Select value={missionData.inspectionType} onValueChange={(value) => setMissionData({ ...missionData, inspectionType: value })}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="thermal">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4" />
                        Thermal Only
                      </div>
                    </SelectItem>
                    <SelectItem value="rgb">
                      <div className="flex items-center gap-2">
                        <Camera className="h-4 w-4" />
                        RGB Only
                      </div>
                    </SelectItem>
                    <SelectItem value="both">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4" />
                        <Camera className="h-4 w-4" />
                        Thermal + RGB
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="mission-notes" className="text-slate-300">Additional Notes</Label>
                <Textarea
                  id="mission-notes"
                  placeholder="Add any special instructions or notes..."
                  value={missionData.notes}
                  onChange={(e) => setMissionData({ ...missionData, notes: e.target.value })}
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 min-h-[100px]"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label className="text-slate-300">Upload Mission Data</Label>
                <FileUploadZone />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

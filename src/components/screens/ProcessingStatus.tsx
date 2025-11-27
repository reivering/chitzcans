import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import {
  Upload,
  CheckCircle,
  Loader2,
  FileCheck,
  Clock,
  Mail,
  Eye,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

type Stage = 'upload' | 'analysis' | 'quality' | 'report';

interface ProcessingStage {
  id: Stage;
  label: string;
  status: 'complete' | 'active' | 'pending';
  icon: typeof Upload;
}

export function ProcessingStatus() {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState<Stage>('upload');
  const [emailNotification, setEmailNotification] = useState(false);
  const navigate = useNavigate();

  const stages: ProcessingStage[] = [
    { id: 'upload', label: 'Upload Complete', status: 'complete', icon: Upload },
    { id: 'analysis', label: 'AI Analysis', status: 'active', icon: Loader2 },
    { id: 'quality', label: 'Quality Check', status: 'pending', icon: FileCheck },
    { id: 'report', label: 'Report Generation', status: 'pending', icon: CheckCircle },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress > 25 && progress <= 50) {
      setCurrentStage('analysis');
    } else if (progress > 50 && progress <= 75) {
      setCurrentStage('quality');
    } else if (progress > 75) {
      setCurrentStage('report');
    }
  }, [progress]);

  const getStageStatus = (stageId: Stage): ProcessingStage['status'] => {
    const stageOrder: Stage[] = ['upload', 'analysis', 'quality', 'report'];
    const currentIndex = stageOrder.indexOf(currentStage);
    const stageIndex = stageOrder.indexOf(stageId);

    if (stageIndex < currentIndex) return 'complete';
    if (stageIndex === currentIndex) return 'active';
    return 'pending';
  };

  const estimatedTime = Math.max(0, Math.ceil((100 - progress) * 0.5));

  const thumbnails = [
    { id: '1', name: 'thermal_001.jpg' },
    { id: '2', name: 'thermal_002.jpg' },
    { id: '3', name: 'thermal_003.jpg' },
    { id: '4', name: 'thermal_004.jpg' },
    { id: '5', name: 'rgb_001.jpg' },
    { id: '6', name: 'rgb_002.jpg' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-white mb-2">Processing Mission Data</h1>
        <p className="text-slate-400">Mission Alpha-7 • Solar Farm Inspection</p>
      </div>

      {/* Main Progress Card */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-8">
          {/* Circular Progress */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-48 h-48 mb-6">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="rgb(51, 65, 85)"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white text-4xl">{progress}%</span>
                <span className="text-slate-400 text-sm mt-1">Complete</span>
              </div>
            </div>

            {/* Time Estimate */}
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="h-4 w-4" />
              <span className="text-sm">
                Estimated time remaining: {estimatedTime} seconds
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-center text-slate-400 text-sm">
              Processing thermal and RGB image data...
            </p>
          </div>

          {/* Stage Indicators */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stages.map((stage) => {
              const status = getStageStatus(stage.id);
              return (
                <div
                  key={stage.id}
                  className={cn(
                    'flex flex-col items-center p-4 rounded-lg border-2 transition-all',
                    status === 'complete'
                      ? 'bg-green-500/10 border-green-500'
                      : status === 'active'
                      ? 'bg-blue-500/10 border-blue-500'
                      : 'bg-slate-700/50 border-slate-700'
                  )}
                >
                  <div
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center mb-2',
                      status === 'complete'
                        ? 'bg-green-500'
                        : status === 'active'
                        ? 'bg-blue-500'
                        : 'bg-slate-700'
                    )}
                  >
                    <stage.icon
                      className={cn(
                        'h-6 w-6 text-white',
                        status === 'active' && 'animate-spin'
                      )}
                    />
                  </div>
                  <p className="text-white text-sm text-center">{stage.label}</p>
                  <Badge
                    className={cn(
                      'mt-2 text-xs border-0',
                      status === 'complete'
                        ? 'bg-green-500 text-white'
                        : status === 'active'
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-700 text-slate-300'
                    )}
                  >
                    {status === 'complete' ? 'Done' : status === 'active' ? 'In Progress' : 'Pending'}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Images Preview */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="border-b border-slate-700">
          <CardTitle className="text-white">Uploaded Images ({thumbnails.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {thumbnails.map((thumb) => (
              <div
                key={thumb.id}
                className="aspect-square bg-slate-900 border border-slate-700 rounded-lg overflow-hidden group cursor-pointer hover:border-blue-500 transition-colors"
              >
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800" />
                  <Eye className="h-8 w-8 text-slate-600 group-hover:text-blue-500 transition-colors relative z-10" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/75 p-2">
                    <p className="text-white text-xs truncate">{thumb.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="border-b border-slate-700">
          <CardTitle className="text-white flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="email-notification"
                checked={emailNotification}
                onCheckedChange={(checked) => setEmailNotification(checked as boolean)}
              />
              <Label
                htmlFor="email-notification"
                className="text-slate-300 cursor-pointer"
              >
                Send email notification when processing is complete
              </Label>
            </div>

            {emailNotification && (
              <div className="space-y-2 pl-6">
                <Label htmlFor="email" className="text-slate-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  defaultValue="john.doe@example.com"
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      {progress === 100 && (
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={() => navigate('/reports/mission-alpha-7')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            View Analysis Report
          </Button>
        </div>
      )}
    </div>
  );
}

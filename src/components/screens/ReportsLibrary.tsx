import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { FileText, Search, Download, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ReportsLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const reports = [
    {
      id: 'report-001',
      name: 'Solar Farm East Wing - Full Analysis',
      date: 'Nov 16, 2025',
      type: 'Thermal + RGB',
      anomalies: 12,
      size: '45 MB',
    },
    {
      id: 'report-002',
      name: 'Bridge Infrastructure Check',
      date: 'Nov 15, 2025',
      type: 'Thermal',
      anomalies: 2,
      size: '28 MB',
    },
    {
      id: 'report-003',
      name: 'Wind Turbine Inspection',
      date: 'Nov 14, 2025',
      type: 'RGB',
      anomalies: 0,
      size: '35 MB',
    },
    {
      id: 'report-004',
      name: 'Q4 Infrastructure Summary',
      date: 'Nov 1, 2025',
      type: 'Summary',
      anomalies: 45,
      size: '120 MB',
    },
  ];

  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white mb-1">Reports Library</h1>
        <p className="text-slate-400">Access all generated inspection reports</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="bg-slate-800 border-slate-700 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4 flex-1">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white mb-2">{report.name}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="text-slate-400">{report.date}</span>
                    <Badge className="bg-slate-700 text-slate-300 border-0">
                      {report.type}
                    </Badge>
                    <span className="text-slate-400">
                      {report.anomalies} anomalies
                    </span>
                    <span className="text-slate-400">{report.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/reports/${report.id}`)}
                  className="border-slate-700 text-white hover:bg-slate-700"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-slate-700"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

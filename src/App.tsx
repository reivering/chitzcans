import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/screens/Dashboard';
import { ActiveMissions } from './components/screens/ActiveMissions';
import { MissionPlanning } from './components/screens/MissionPlanning';
import { MissionHistory } from './components/screens/MissionHistory';
import { FleetStatus } from './components/screens/FleetStatus';
import { ReportViewer } from './components/screens/ReportViewer';
import { ReportsLibrary } from './components/screens/ReportsLibrary';
import { ProcessingStatus } from './components/screens/ProcessingStatus';
import { Settings } from './components/screens/Settings';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/missions" element={<ActiveMissions />} />
          <Route path="/missions/new" element={<MissionPlanning />} />
          <Route path="/history" element={<MissionHistory />} />
          <Route path="/fleet" element={<FleetStatus />} />
          <Route path="/reports" element={<ReportsLibrary />} />
          <Route path="/reports/:id" element={<ReportViewer />} />
          <Route path="/processing/:id" element={<ProcessingStatus />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}
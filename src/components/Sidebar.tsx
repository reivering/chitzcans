import { NavLink } from 'react-router-dom';
import { Home, Crosshair, History, Plane, FileText, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Crosshair, label: 'Active Missions', path: '/missions' },
  { icon: History, label: 'Mission History', path: '/history' },
  { icon: Plane, label: 'Fleet Status', path: '/fleet' },
  { icon: FileText, label: 'Reports Library', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-slate-800 border-r border-slate-700 transition-transform duration-300 z-30",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <p className="text-slate-300 text-sm mb-2">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm">All Systems Online</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

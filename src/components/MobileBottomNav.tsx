import { NavLink } from 'react-router-dom';
import { Home, Crosshair, FileText, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

export function MobileBottomNav() {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Crosshair, label: 'Missions', path: '/missions' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 z-40 safe-area-inset-bottom">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                isActive
                  ? "text-blue-400"
                  : "text-slate-400"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

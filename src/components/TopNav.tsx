import { Bell, Settings, Menu, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

interface TopNavProps {
  onMenuToggle: () => void;
}

export function TopNav({ onMenuToggle }: TopNavProps) {
  return (
    <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden text-slate-300 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white">DroneInspect Pro</h1>
              <p className="text-slate-400 text-xs">Thermal Analysis Platform</p>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative text-slate-300 hover:text-white">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-amber-500 text-white text-xs border-0">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-slate-800 border-slate-700 text-slate-200">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem className="focus:bg-slate-700 focus:text-white">
                <div className="flex flex-col gap-1">
                  <p>Mission Alpha-7 processing complete</p>
                  <span className="text-xs text-slate-400">5 minutes ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-slate-700 focus:text-white">
                <div className="flex flex-col gap-1">
                  <p>High temperature anomaly detected</p>
                  <span className="text-xs text-slate-400">1 hour ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-slate-700 focus:text-white">
                <div className="flex flex-col gap-1">
                  <p>Drone Fleet-3 battery low warning</p>
                  <span className="text-xs text-slate-400">2 hours ago</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hidden sm:flex">
            <Settings className="h-5 w-5" />
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-slate-300 hover:text-white">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">John Doe</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-slate-200">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem className="focus:bg-slate-700 focus:text-white">Profile</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-slate-700 focus:text-white">Team Settings</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-slate-700 focus:text-white">Billing</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem className="focus:bg-slate-700 focus:text-white">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

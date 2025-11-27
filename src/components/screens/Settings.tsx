import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { User, Bell, Shield, Database } from 'lucide-react';

export function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-white mb-1">Settings</h1>
        <p className="text-slate-400">Manage your account and application preferences</p>
      </div>

      {/* Profile Settings */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="border-b border-slate-700">
          <CardTitle className="text-white flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name" className="text-slate-300">First Name</Label>
              <Input
                id="first-name"
                defaultValue="John"
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name" className="text-slate-300">Last Name</Label>
              <Input
                id="last-name"
                defaultValue="Doe"
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue="john.doe@example.com"
              className="bg-slate-900 border-slate-700 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="border-b border-slate-700">
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Email Notifications</p>
              <p className="text-slate-400 text-sm">Receive email alerts for mission updates</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Critical Alerts</p>
              <p className="text-slate-400 text-sm">Get notified about critical anomalies</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Mission Completion</p>
              <p className="text-slate-400 text-sm">Alert when processing is complete</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* System Preferences */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="border-b border-slate-700">
          <CardTitle className="text-white flex items-center gap-2">
            <Database className="h-5 w-5" />
            System Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="thermal-palette" className="text-slate-300">Default Thermal Palette</Label>
            <Select defaultValue="ironbow">
              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="grayscale">Grayscale</SelectItem>
                <SelectItem value="ironbow">Ironbow</SelectItem>
                <SelectItem value="rainbow">Rainbow</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="auto-process" className="text-slate-300">Auto-Processing</Label>
            <Select defaultValue="enabled">
              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="enabled">Enabled</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-700">
          Cancel
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Save Changes
        </Button>
      </div>
    </div>
  );
}

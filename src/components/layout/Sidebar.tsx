import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Activity,
  Users,
  UserCheck,
  TrendingUp,
  Settings,
  FileText,
  Calendar,
  MapPin,
  Filter,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardStore } from '@/store/dashboardStore';
import { cn } from '@/lib/utils';

const navItems = [
  {
    title: 'DASHBOARD',
    items: [
      { title: 'Overview', url: '/dashboard', icon: BarChart3 },
      { title: 'Real-Time Monitor', url: '/dashboard/live', icon: Activity },
    ]
  },
  {
    title: 'MANAGEMENT', 
    items: [
      { title: 'All Leads', url: '/dashboard/leads', icon: Users },
      { title: 'My Assigned Leads', url: '/dashboard/leads/assigned', icon: UserCheck },
    ]
  },
  {
    title: 'AI AGENT',
    items: [
      { title: 'Performance', url: '/dashboard/ai-performance', icon: TrendingUp },
      { title: 'Configuration', url: '/dashboard/ai-config', icon: Settings },
    ]
  },
  {
    title: 'REPORTS',
    items: [
      { title: 'Daily Summary', url: '/dashboard/reports', icon: FileText },
    ]
  },
  {
    title: 'SETTINGS',
    items: [
      { title: 'User Preferences', url: '/dashboard/settings', icon: Settings },
    ]
  }
];

const sourceOptions = ['Website', 'LinkedIn', 'Email', 'Cold Outreach', 'Referral'];
const statusOptions = ['New', 'Contacted', 'Qualified', 'Nurturing', 'Closed'];
const regionOptions = ['Americas', 'EMEA', 'APAC'];
const teamMembers = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'];

export function Sidebar() {
  const location = useLocation();
  const { sidebarCollapsed, filters, setFilters, clearFilters } = useDashboardStore();
  const [tempFilters, setTempFilters] = useState(filters);

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const handleSourceChange = (source: string, checked: boolean) => {
    const newSources = checked 
      ? [...tempFilters.source, source]
      : tempFilters.source.filter(s => s !== source);
    setTempFilters({ ...tempFilters, source: newSources });
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatuses = checked
      ? [...tempFilters.status, status]  
      : tempFilters.status.filter(s => s !== status);
    setTempFilters({ ...tempFilters, status: newStatuses });
  };

  const handleRegionChange = (region: string, checked: boolean) => {
    const newRegions = checked
      ? [...tempFilters.region, region]
      : tempFilters.region.filter(r => r !== region);
    setTempFilters({ ...tempFilters, region: newRegions });
  };

  const applyFilters = () => {
    setFilters(tempFilters);
  };

  const handleClearFilters = () => {
    clearFilters();
    setTempFilters(filters);
  };

  if (sidebarCollapsed) {
    return (
      <aside className="w-16 bg-sidebar border-r border-sidebar-border flex flex-col">
        {navItems.map((section) => (
          <div key={section.title} className="py-2">
            {section.items.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                className={cn(
                  "flex items-center justify-center h-12 mx-2 rounded-lg transition-colors",
                  isActive(item.url)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="h-5 w-5" />
              </NavLink>
            ))}
          </div>
        ))}
      </aside>
    );
  }

  return (
    <aside className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Navigation */}
        <div className="space-y-6">
          {navItems.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider mb-2">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.url}
                    to={item.url}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm",
                      isActive(item.url)
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span>{item.title}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Filters Panel */}
        <Card className="bg-sidebar-accent/30 border-sidebar-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>FILTERS</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Time Range */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-sidebar-foreground/80">
                <Calendar className="inline h-3 w-3 mr-1" />
                Time Range
              </Label>
              <Select 
                value={tempFilters.timeRange} 
                onValueChange={(value: any) => setTempFilters({ ...tempFilters, timeRange: value })}
              >
                <SelectTrigger className="h-8 text-xs bg-sidebar">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last24h">Last 24H</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Week-to-Date</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Source */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-sidebar-foreground/80">Source</Label>
              <div className="space-y-1">
                {sourceOptions.map((source) => (
                  <div key={source} className="flex items-center space-x-2">
                    <Checkbox
                      id={source}
                      checked={tempFilters.source.includes(source)}
                      onCheckedChange={(checked) => handleSourceChange(source, !!checked)}
                      className="h-3 w-3"
                    />
                    <Label htmlFor={source} className="text-xs">{source}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-sidebar-foreground/80">Status</Label>
              <div className="space-y-1">
                {statusOptions.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={status}
                      checked={tempFilters.status.includes(status)}
                      onCheckedChange={(checked) => handleStatusChange(status, !!checked)}
                      className="h-3 w-3"
                    />
                    <Label htmlFor={status} className="text-xs">{status}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned To */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-sidebar-foreground/80">Assigned To</Label>
              <Select 
                value={tempFilters.assignedTo} 
                onValueChange={(value) => setTempFilters({ ...tempFilters, assignedTo: value })}
              >
                <SelectTrigger className="h-8 text-xs bg-sidebar">
                  <SelectValue placeholder="All members" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All members</SelectItem>
                  {teamMembers.map((member) => (
                    <SelectItem key={member} value={member}>{member}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Region */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-sidebar-foreground/80">
                <MapPin className="inline h-3 w-3 mr-1" />
                Region
              </Label>
              <div className="space-y-1">
                {regionOptions.map((region) => (
                  <div key={region} className="flex items-center space-x-2">
                    <Checkbox
                      id={region}
                      checked={tempFilters.region.includes(region)}
                      onCheckedChange={(checked) => handleRegionChange(region, !!checked)}
                      className="h-3 w-3"
                    />
                    <Label htmlFor={region} className="text-xs">{region}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex space-x-2 pt-2">
              <Button onClick={applyFilters} size="sm" className="flex-1 h-8 text-xs">
                Apply Filters
              </Button>
              <Button 
                onClick={handleClearFilters} 
                variant="outline" 
                size="sm" 
                className="h-8 text-xs"
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
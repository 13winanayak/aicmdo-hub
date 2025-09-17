import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useDashboardStore } from '@/store/dashboardStore';
import { cn } from '@/lib/utils';

export function DashboardLayout() {
  const { sidebarCollapsed } = useDashboardStore();

  return (
    <div className="min-h-screen bg-background flex flex-col w-full">
      <Navbar />
      <div className="flex flex-1 w-full">
        <Sidebar />
        <main 
          className={cn(
            "flex-1 overflow-auto transition-all duration-300",
            sidebarCollapsed ? "ml-0" : "ml-0"
          )}
        >
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
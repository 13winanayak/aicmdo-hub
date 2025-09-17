import { KpiCard } from '@/components/dashboard/KpiCard';
import { SimpleLineChart } from '@/components/dashboard/charts/SimpleLineChart';
import { DashboardBarChart } from '@/components/dashboard/charts/BarChart';
import { DashboardPieChart } from '@/components/dashboard/charts/PieChart';
import { DataGrid } from '@/components/dashboard/DataGrid';

// Mock data - in real app this would come from API
const kpiData = [
  {
    title: "Total Leads",
    value: "12,847",
    trend: { value: 12, isPositive: true },
    subtitle: "This month"
  },
  {
    title: "Conversion Rate",
    value: "23.5%",
    trend: { value: 3.2, isPositive: true },
    subtitle: "Last 30 days"
  },
  {
    title: "AI Health Score",
    value: "94.2",
    trend: { value: 2.1, isPositive: true },
    subtitle: "System performance"
  },
  {
    title: "Avg. Lead Quality",
    value: "8.7/10",
    trend: { value: 0.5, isPositive: false },
    subtitle: "Quality score"
  }
];

const chartData = [
  { name: "Mon", value: 120 },
  { name: "Tue", value: 142 },
  { name: "Wed", value: 180 },
  { name: "Thu", value: 165 },
  { name: "Fri", value: 195 },
  { name: "Sat", value: 89 },
  { name: "Sun", value: 134 },
];

const sourceData = [
  { name: "Website", value: 4500 },
  { name: "LinkedIn", value: 3200 },
  { name: "Email", value: 2800 },
  { name: "Cold Outreach", value: 1900 },
  { name: "Referral", value: 1200 },
];

const statusData = [
  { name: "New", value: 2847, color: "hsl(var(--command-info))" },
  { name: "Contacted", value: 4532, color: "hsl(var(--command-primary))" },
  { name: "Qualified", value: 3248, color: "hsl(var(--command-success))" },
  { name: "Nurturing", value: 1823, color: "hsl(var(--command-warning))" },
  { name: "Closed", value: 397, color: "hsl(var(--command-secondary))" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">
            Monitor your AI-powered lead generation performance
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KpiCard
            key={index}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            subtitle={kpi.subtitle}
          />
        ))}
      </div>

      {/* Charts Row 1 - Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleLineChart
          title="Leads Over Time"
          data={chartData}
          dataKey="value"
        />
        <SimpleLineChart
          title="Lead Quality Trend"
          data={chartData.map(d => ({ ...d, value: Math.floor(Math.random() * 100) + 50 }))}
          dataKey="value"
        />
      </div>

      {/* Charts Row 2 - Source & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardBarChart
          title="Leads by Source"
          data={sourceData}
          dataKey="value"
          horizontal={true}
        />
        <DashboardPieChart
          title="Lead Status Distribution"
          data={statusData}
        />
      </div>

      {/* Additional sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataGrid />
        </div>
        <div>
          {/* Geo Map will go here */}
          <div className="bg-card border border-border rounded-lg p-6 h-[400px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <h3 className="text-lg font-semibold mb-2">Geographic Distribution</h3>
              <p>Interactive map coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
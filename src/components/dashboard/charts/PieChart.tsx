import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PieChartProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  className?: string;
}

const COLORS = [
  'hsl(var(--command-primary))',
  'hsl(var(--command-secondary))',
  'hsl(var(--command-success))',
  'hsl(var(--command-warning))',
  'hsl(var(--command-danger))',
  'hsl(var(--command-info))',
];

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium">{data.name}</p>
        <p className="text-sm text-command-primary">
          {`${data.value} (${((data.value / data.payload.total) * 100).toFixed(1)}%)`}
        </p>
      </div>
    );
  }
  return null;
};

export function DashboardPieChart({ title, data, className }: PieChartProps) {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  const dataWithTotal = data.map(entry => ({ ...entry, total }));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dataWithTotal}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {dataWithTotal.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color || COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
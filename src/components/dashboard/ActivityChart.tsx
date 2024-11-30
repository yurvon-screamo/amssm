import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ActivityData {
  time: string;
  connections: number;
}

interface ActivityChartProps {
  data: ActivityData[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="connections"
          stroke="rgb(var(--primary))"
          strokeWidth={2}
          dot={false}
        />
        <XAxis 
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tick={false}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={false}
        />
        <Tooltip
          contentStyle={{
            background: 'rgb(var(--background))',
            border: '1px solid rgb(var(--border))',
            borderRadius: '8px',
            padding: '8px',
          }}
          itemStyle={{
            color: 'rgb(var(--foreground))',
          }}
          labelStyle={{
            color: 'rgb(var(--muted-foreground))',
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type HourlyVolume = {
  hour: string;
  volume: number;
};

interface HourlyVolumeChartProps {
  data: HourlyVolume[];
}

export function HourlyVolumeChart({
  data,
}: HourlyVolumeChartProps) {
  const max = data.reduce((a, b) =>
    b.volume > a.volume ? b : a
  );
  const min = data.reduce((a, b) =>
    b.volume < a.volume ? b : a
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Volumen de Transacciones por Hora
        </CardTitle>
        <CardDescription>
          Distribución del volumen durante las últimas 24
          horas
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="text-muted-foreground">
            Pico: {max.hour} (
            {(max.volume / 1000).toFixed(0)}K)
          </span>
          <span className="text-muted-foreground">
            Valle: {min.hour} (
            {(min.volume / 1000).toFixed(0)}K)
          </span>
        </div>

        <ChartContainer
          className="h-100"
          config={{
            volume: {
              label: "Volumen",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ bottom: 60 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted"
              />
              <XAxis
                dataKey="hour"
                angle={-45}
                textAnchor="end"
                height={80}
                className="text-xs"
              />
              <YAxis
                tickFormatter={(v) =>
                  `${(v / 1000).toFixed(0)}K`
                }
                className="text-xs"
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                labelFormatter={(l) => `Hora: ${l}`}
                formatter={(v: number) => [
                  `${v.toLocaleString()} transacciones`,
                  "Volumen",
                ]}
              />
              <Bar
                dataKey="volume"
                fill="var(--color-volume)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
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
import { getMarketVolumes } from "@/lib/api/get-market-volumes";
import {
  IMarketVolumes,
  IMarketVolumesFormatted,
} from "@/interfaces";
import { Spinner } from "../ui/spinner";

export function HourlyVolumeChart() {
  const { data, isLoading } = useQuery<IMarketVolumes[]>({
    queryKey: ["hourlyVolumeData"],
    queryFn: getMarketVolumes,
  });
  const [formattedData, setFormattedData] = useState<
    { day: string; volume_usd_24h: number }[]
  >([]);
  const [max, setMax] = useState<IMarketVolumesFormatted>();
  const [min, setMin] = useState<IMarketVolumesFormatted>();

  useEffect(() => {
    if (!data) return;

    const newData = data.map((item) => {
      const date = new Date(item.timestamp);

      // Convert to day of the week
      const day = date.toLocaleDateString("en-EN", {
        weekday: "long",
      });

      return {
        day,
        volume_usd_24h: item.volume_usd_24h,
      };
    });

    const max = newData.reduce((a, b) =>
      b.volume_usd_24h > a.volume_usd_24h ? b : a,
    );
    const min = newData.reduce((a, b) =>
      b.volume_usd_24h < a.volume_usd_24h ? b : a,
    );

    setMax(max);
    setMin(min);
    setFormattedData(newData);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Daily Transactions Volume
        </CardTitle>
        <CardDescription>
          Volume Distribution during the last 7 days
        </CardDescription>
      </CardHeader>
      {isLoading ? (
        <Spinner className="size-8" />
      ) : (
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="text-muted-foreground">
              Highest:{" "}
              {max
                ? `${max.day} (
            ${(max.volume_usd_24h / 1000).toFixed(0)}K)`
                : "No data"}
            </span>
            <span className="text-muted-foreground">
              Lowest:{" "}
              {min
                ? `${min.day} (
            ${(min.volume_usd_24h / 1000).toFixed(0)}K)`
                : "No data"}
            </span>
          </div>

          <ChartContainer
            className="h-100 w-full"
            config={{
              volume: {
                label: "Volume",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <BarChart
              data={formattedData}
              margin={{ bottom: 60 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted"
              />
              <XAxis
                dataKey="day"
                angle={-45}
                textAnchor="end"
                height={20}
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
                labelFormatter={(l) => `Day: ${l}`}
                formatter={(v: number) => [
                  `${v.toLocaleString()} Transactions`,
                ]}
              />
              <Bar
                dataKey="volume_usd_24h"
                fill="var(--color-volume)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
}

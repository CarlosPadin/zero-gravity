"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IStatsOverview } from "@/interfaces";
import { getOverviewStats } from "@/lib/api/get-overview-stats";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";

export function StatsOverview({}) {
  const { data, isLoading } = useQuery<IStatsOverview>({
    queryKey: ["overviewStats"],
    queryFn: getOverviewStats,
  });

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Average Price</CardDescription>
          <CardTitle className="text-3xl">
            {isLoading ? <Spinner className="size-8"/> : `$${(data?.avg_price_usd)?.toFixed(4)}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Across 20 markets
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>
            Total volume traded
          </CardDescription>
          <CardTitle className="text-3xl">
            {isLoading ? (
              <Spinner className="size-8"/>
            ) : data?.total_volume_24h ? (
              (data.total_volume_24h / 1_000_000).toFixed(2) + "M"
            ) : (
              0 + "M"
            )}
            
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            USD volume traded
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>
            Last hour
          </CardDescription>
          <CardTitle className="text-3xl">
            {/* ${(totalDepth / 1_000_000).toFixed(1)}M */}
            <Spinner className="size-8"/>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Average price change
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

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
import { TrendingDown, TrendingUp } from "lucide-react";

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
            {isLoading ? (
              <Spinner className="size-8" />
            ) : data?.avg_price_usd ? (
              `$${data?.avg_price_usd?.toFixed(4)}`
            ) : (
              "$0"
            )}
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
              <Spinner className="size-8" />
            ) : data?.total_volume_24h ? (
              (data.total_volume_24h / 1_000_000).toFixed(
                2
              ) + "M"
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
          <CardDescription>Average price change</CardDescription>
          <CardTitle className="text-3xl">
            {isLoading ? (
              <Spinner className="size-8" />
            ) : data?.price_change ? (
              <div className="flex gap-1 items-center">
                {
                  data.price_change >= 0 ? (
                    <TrendingUp className="size-8 text-green-600"/>
                  ) : (
                    <TrendingDown className="size-8 text-red-600"/>
                  )
                }
                <p
                  className={
                    data.price_change >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {data?.price_change?.toFixed(2)}%
                </p>
              </div>
            ) : (
              "$0"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Last hour
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

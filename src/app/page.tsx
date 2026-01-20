"use client"
import { HourlyVolumeChart } from "@/components/statistics/HourlyVolumeChart"
import { MarketTable } from "@/components/statistics/MarketTable"
import { StatsOverview } from "@/components/statistics/StatsOverview"

export default function Page() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-4xl font-bold">0G Token Dashboard</h1>
          <p className="text-muted-foreground">
            Real time analysis of markets and volume
          </p>
        </div>

        <StatsOverview/>
        <MarketTable/>
        <HourlyVolumeChart/>
      </div>
    </div>
  )
}

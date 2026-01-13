"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Datos simulados de mercados para el token 0G
const marketData = [
  { exchange: "Binance", price: 0.0845, volume: 2847523, depth: 15234000, change: 2.4 },
  { exchange: "KuCoin", price: 0.0843, volume: 1923412, depth: 8945000, change: 1.8 },
  { exchange: "Gate.io", price: 0.0846, volume: 1645823, depth: 7234000, change: 2.1 },
  { exchange: "MEXC", price: 0.0842, volume: 1234567, depth: 5432000, change: 1.5 },
  { exchange: "Bybit", price: 0.0847, volume: 987543, depth: 4123000, change: 2.8 },
  { exchange: "HTX", price: 0.0841, volume: 754321, depth: 3456000, change: 1.2 },
]

// Datos de volumen por hora del día (24h)
const hourlyVolumeData = [
  { hour: "00:00", volume: 145000 },
  { hour: "01:00", volume: 98000 },
  { hour: "02:00", volume: 76000 },
  { hour: "03:00", volume: 65000 },
  { hour: "04:00", volume: 58000 },
  { hour: "05:00", volume: 72000 },
  { hour: "06:00", volume: 94000 },
  { hour: "07:00", volume: 128000 },
  { hour: "08:00", volume: 186000 },
  { hour: "09:00", volume: 243000 },
  { hour: "10:00", volume: 287000 },
  { hour: "11:00", volume: 312000 },
  { hour: "12:00", volume: 298000 },
  { hour: "13:00", volume: 334000 },
  { hour: "14:00", volume: 367000 },
  { hour: "15:00", volume: 389000 },
  { hour: "16:00", volume: 356000 },
  { hour: "17:00", volume: 298000 },
  { hour: "18:00", volume: 267000 },
  { hour: "19:00", volume: 234000 },
  { hour: "20:00", volume: 198000 },
  { hour: "21:00", volume: 176000 },
  { hour: "22:00", volume: 154000 },
  { hour: "23:00", volume: 132000 },
]

export default function Page() {
  const avgPrice = (marketData.reduce((sum, m) => sum + m.price, 0) / marketData.length).toFixed(4)
  const totalVolume = marketData.reduce((sum, m) => sum + m.volume, 0)
  const totalDepth = marketData.reduce((sum, m) => sum + m.depth, 0)

  const maxVolumeHour = hourlyVolumeData.reduce((max, h) => (h.volume > max.volume ? h : max), hourlyVolumeData[0])
  const minVolumeHour = hourlyVolumeData.reduce((min, h) => (h.volume < min.volume ? h : min), hourlyVolumeData[0])

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">0G Token Dashboard</h1>
          <p className="text-muted-foreground">Análisis en tiempo real de mercados y volumen de transacciones</p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Precio Promedio</CardDescription>
              <CardTitle className="text-3xl">${avgPrice}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Across {marketData.length} exchanges</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Volumen Total 24h</CardDescription>
              <CardTitle className="text-3xl">{(totalVolume / 1000000).toFixed(2)}M</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">USD volume traded</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Profundidad Total</CardDescription>
              <CardTitle className="text-3xl">${(totalDepth / 1000000).toFixed(1)}M</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Market depth liquidity</p>
            </CardContent>
          </Card>
        </div>

        {/* Market Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Datos de Mercado por Exchange</CardTitle>
            <CardDescription>Precio, volumen y profundidad en diferentes plataformas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exchange</TableHead>
                    <TableHead className="text-right">Precio (USD)</TableHead>
                    <TableHead className="text-right">Volumen 24h</TableHead>
                    <TableHead className="text-right">Profundidad</TableHead>
                    <TableHead className="text-right">Cambio 24h</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketData.map((market) => (
                    <TableRow key={market.exchange}>
                      <TableCell className="font-medium">{market.exchange}</TableCell>
                      <TableCell className="text-right font-mono">${market.price.toFixed(4)}</TableCell>
                      <TableCell className="text-right">${(market.volume / 1000000).toFixed(2)}M</TableCell>
                      <TableCell className="text-right">${(market.depth / 1000000).toFixed(2)}M</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`flex items-center justify-end gap-1 ${market.change > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {market.change > 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {market.change > 0 ? "+" : ""}
                          {market.change}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Hourly Volume Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Volumen de Transacciones por Hora</CardTitle>
            <CardDescription>Distribución del volumen de solicitudes durante las últimas 24 horas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-chart-1" />
                  <span className="text-muted-foreground">
                    Pico: {maxVolumeHour.hour} ({(maxVolumeHour.volume / 1000).toFixed(0)}K)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-chart-2" />
                  <span className="text-muted-foreground">
                    Valle: {minVolumeHour.hour} ({(minVolumeHour.volume / 1000).toFixed(0)}K)
                  </span>
                </div>
              </div>
              <ChartContainer
                config={{
                  volume: {
                    label: "Volumen",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-100"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyVolumeData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="hour" angle={-45} textAnchor="end" height={80} className="text-xs" />
                    <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} className="text-xs" />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      labelFormatter={(label) => `Hora: ${label}`}
                      formatter={(value: number) => [`${value.toLocaleString()} transacciones`, "Volumen"]}
                    />
                    <Bar dataKey="volume" fill="var(--color-volume)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

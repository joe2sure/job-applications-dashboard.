"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import type { ApplicationData } from "@/lib/types"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface LocationsChartProps {
  data: ApplicationData[]
}

export default function LocationsChart({ data }: LocationsChartProps) {
  // Process data to get locations
  const locations = data.reduce((acc: Record<string, number>, app) => {
    // Extract city
    const city = app.location.split(",")[0]
    acc[city] = (acc[city] || 0) + 1
    return acc
  }, {})

  // Convert to array for chart
  const chartData = Object.entries(locations)
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10) // Top 10 locations

  return (
    <ChartContainer className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ left: 100 }}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="location" width={100} />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

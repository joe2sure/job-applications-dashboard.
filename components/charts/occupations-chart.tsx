"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import type { ApplicationData } from "@/lib/types"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface OccupationsChartProps {
  data: ApplicationData[]
}

export default function OccupationsChart({ data }: OccupationsChartProps) {
  // Process data to get occupations
  const occupations = data.reduce((acc: Record<string, number>, app) => {
    acc[app.currentOccupation] = (acc[app.currentOccupation] || 0) + 1
    return acc
  }, {})

  // Convert to array for chart
  const chartData = Object.entries(occupations)
    .map(([occupation, count]) => ({ occupation, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8) // Top 8 occupations

  return (
    <ChartContainer className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ left: 120 }}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="occupation" width={120} />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

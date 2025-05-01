"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import type { ApplicationData } from "@/lib/types"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface PositionsChartProps {
  data: ApplicationData[]
}

export default function PositionsChart({ data }: PositionsChartProps) {
  // Process data to get positions
  const positions = data.reduce((acc: Record<string, number>, app) => {
    acc[app.positionAppliedFor] = (acc[app.positionAppliedFor] || 0) + 1
    return acc
  }, {})

  // Convert to array for chart
  const chartData = Object.entries(positions)
    .map(([position, count]) => ({ position, count }))
    .sort((a, b) => b.count - a.count)

  return (
    <ChartContainer className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="position" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" name="Applicants" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

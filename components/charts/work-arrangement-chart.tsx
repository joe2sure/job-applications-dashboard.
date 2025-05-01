"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import type { ApplicationData } from "@/lib/types"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface WorkArrangementChartProps {
  data: ApplicationData[]
}

export default function WorkArrangementChart({ data }: WorkArrangementChartProps) {
  // Process data to get work arrangements
  const arrangements = data.reduce((acc: Record<string, number>, app) => {
    acc[app.workArrangement] = (acc[app.workArrangement] || 0) + 1
    return acc
  }, {})

  // Convert to array for chart
  const chartData = Object.entries(arrangements).map(([arrangement, count]) => ({
    arrangement,
    count,
    percentage: Math.round((count / data.length) * 100),
  }))

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

  return (
    <ChartContainer className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
            label={({ arrangement, percentage }) => `${arrangement}: ${percentage}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

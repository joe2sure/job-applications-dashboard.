"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import type { ApplicationData } from "@/lib/types"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface NamesChartProps {
  data: ApplicationData[]
}

export default function NamesChart({ data }: NamesChartProps) {
  // Process data to get applications by month
  const applicationsByMonth: Record<string, number> = {}

  data.forEach((app) => {
    const date = new Date(app.applicationDate)
    const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`
    applicationsByMonth[monthYear] = (applicationsByMonth[monthYear] || 0) + 1
  })

  // Convert to array and sort by date
  const months = Object.keys(applicationsByMonth)
    .map((monthYear) => {
      const [month, year] = monthYear.split(" ")
      return { monthYear, month, year: Number.parseInt(year), sortDate: new Date(`${month} 1, ${year}`) }
    })
    .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime())
    .map((item) => item.monthYear)

  const chartData = months.map((month) => ({
    month,
    applications: applicationsByMonth[month],
  }))

  return (
    <ChartContainer className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="applications" name="Applications" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

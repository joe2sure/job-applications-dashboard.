"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import type { ApplicationData } from "@/lib/types"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

interface PhoneNumbersChartProps {
  data: ApplicationData[]
}

export default function PhoneNumbersChart({ data }: PhoneNumbersChartProps) {
  // Process data to get phone number prefixes
  const phonePrefixes = data.reduce((acc: Record<string, number>, app) => {
    // Extract prefix (first 5-6 digits)
    const prefix = app.phone.replace(/\s+/g, "").slice(0, 6)
    acc[prefix] = (acc[prefix] || 0) + 1
    return acc
  }, {})

  // Convert to array for chart
  const chartData = Object.entries(phonePrefixes)
    .map(([prefix, count]) => ({ prefix, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8) // Top 8 prefixes

  // Define chart configuration
  const chartConfig: ChartConfig = {
    count: {
      label: "Count",
      color: "hsl(var(--chart-1))"
    }
  }

  return (
    <ChartContainer className="h-full" config={chartConfig}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ left: 80 }}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="prefix" />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

// "use client"

// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
// import type { ApplicationData } from "@/lib/types"
// import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// interface PositionsChartProps {
//   data: ApplicationData[]
// }

// export default function PositionsChart({ data }: PositionsChartProps) {
//   // Process data to get positions
//   const positions = data.reduce((acc: Record<string, number>, app) => {
//     acc[app.positionAppliedFor] = (acc[app.positionAppliedFor] || 0) + 1
//     return acc
//   }, {})

//   // Convert to array for chart
//   const chartData = Object.entries(positions)
//     .map(([position, count]) => ({ position, count }))
//     .sort((a, b) => b.count - a.count)

//   return (
//     <ChartContainer className="h-full">
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={chartData}>
//           <XAxis dataKey="position" />
//           <YAxis />
//           <Tooltip content={<ChartTooltipContent />} />
//           <Bar dataKey="count" name="Applicants" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     </ChartContainer>
//   )
// }

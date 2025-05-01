"use client"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import type { ApplicationData } from "@/lib/types"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

interface EmailsChartProps {
  data: ApplicationData[]
}

export default function EmailsChart({ data }: EmailsChartProps) {
  // Process data to get email domains
  const emailDomains = data.reduce((acc: Record<string, number>, app) => {
    const domain = app.email.split("@")[1]
    acc[domain] = (acc[domain] || 0) + 1
    return acc
  }, {})

  // Convert to array for chart
  const chartData = Object.entries(emailDomains)
    .map(([domain, count]) => ({ domain, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10) // Top 10 domains

  // Define the chart configuration
  const chartConfig: ChartConfig = {
    count: {
      label: "Email Count",
      color: "hsl(var(--chart-1))"
    }
  }

  return (
    <ChartContainer className="h-full" config={chartConfig}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ left: 80 }}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="domain" />
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
// import {  ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// interface EmailsChartProps {
//   data: ApplicationData[]
// }

// export default function EmailsChart({ data }: EmailsChartProps) {
//   // Process data to get email domains
//   const emailDomains = data.reduce((acc: Record<string, number>, app) => {
//     const domain = app.email.split("@")[1]
//     acc[domain] = (acc[domain] || 0) + 1
//     return acc
//   }, {})

//   // Convert to array for chart
//   const chartData = Object.entries(emailDomains)
//     .map(([domain, count]) => ({ domain, count }))
//     .sort((a, b) => b.count - a.count)
//     .slice(0, 10) // Top 10 domains

//   return (
//     <ChartContainer className="h-full" children={undefined} config={undefined}>
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={chartData} layout="vertical" margin={{ left: 80 }}>
//           <XAxis type="number" />
//           <YAxis type="category" dataKey="domain" />
//           <Tooltip content={<ChartTooltipContent />} />
//           <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={4} />
//         </BarChart>
//       </ResponsiveContainer>
//     </ChartContainer>
//   )
// }

"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import type { ApplicationData } from "@/lib/types"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface ExperienceChartProps {
  data: ApplicationData[]
}

export default function ExperienceChart({ data }: ExperienceChartProps) {
  // Process data to get experience ranges
  const experienceRanges = {
    "0-1 years": 0,
    "1-3 years": 0,
    "3-5 years": 0,
    "5+ years": 0,
  }

  data.forEach((app) => {
    const exp = app.yearsOfExperience
    if (exp <= 1) {
      experienceRanges["0-1 years"]++
    } else if (exp <= 3) {
      experienceRanges["1-3 years"]++
    } else if (exp <= 5) {
      experienceRanges["3-5 years"]++
    } else {
      experienceRanges["5+ years"]++
    }
  })

  // Convert to array for chart
  const chartData = Object.entries(experienceRanges).map(([range, count]) => ({
    range,
    count,
    percentage: Math.round((count / data.length) * 100),
  }))

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

  // Define chart config object required by ChartContainer
  const chartConfig = {
    "0-1 years": { 
      label: "0-1 years",
      color: COLORS[0] 
    },
    "1-3 years": { 
      label: "1-3 years", 
      color: COLORS[1] 
    },
    "3-5 years": { 
      label: "3-5 years", 
      color: COLORS[2] 
    },
    "5+ years": { 
      label: "5+ years", 
      color: COLORS[3] 
    },
  }

  return (
    <ChartContainer className="h-full" config={chartConfig}>
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
            label={({ range, percentage }) => `${range}: ${percentage}%`}
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



// "use client"

// import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
// import type { ApplicationData } from "@/lib/types"
// import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// interface ExperienceChartProps {
//   data: ApplicationData[]
// }

// export default function ExperienceChart({ data }: ExperienceChartProps) {
//   // Process data to get experience ranges
//   const experienceRanges = {
//     "0-1 years": 0,
//     "1-3 years": 0,
//     "3-5 years": 0,
//     "5+ years": 0,
//   }

//   data.forEach((app) => {
//     const exp = app.yearsOfExperience
//     if (exp <= 1) {
//       experienceRanges["0-1 years"]++
//     } else if (exp <= 3) {
//       experienceRanges["1-3 years"]++
//     } else if (exp <= 5) {
//       experienceRanges["3-5 years"]++
//     } else {
//       experienceRanges["5+ years"]++
//     }
//   })

//   // Convert to array for chart
//   const chartData = Object.entries(experienceRanges).map(([range, count]) => ({
//     range,
//     count,
//     percentage: Math.round((count / data.length) * 100),
//   }))

//   const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

//   return (
//     <ChartContainer className="h-full">
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             data={chartData}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="count"
//             label={({ range, percentage }) => `${range}: ${percentage}%`}
//           >
//             {chartData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip content={<ChartTooltipContent />} />
//         </PieChart>
//       </ResponsiveContainer>
//     </ChartContainer>
//   )
// }

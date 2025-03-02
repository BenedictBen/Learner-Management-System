"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer  } from "recharts"

import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", value: 18 },
  { month: "February", value: 22 },
  { month: "March", value: 15 },
  { month: "April", value: 8 },
  { month: "May", value: 12 },
  { month: "June", value: 25 },
  { month: "July", value: 19 },
  { month: "August", value: 13 },
  { month: "September", value: 21 },
  { month: "October", value: 6 },
  { month: "November", value: 17 },
  { month: "December", value: 24 },
]

const chartConfig = {
  value: {
    label: "Revenue",
    color: "#01589A",
  },
} satisfies ChartConfig

export function Chart() {
  return (
    <div className="w-full h-full flex flex-col ">
        <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold py-4">Recent Revenue</h1>
        </div>
        <div className="flex-1 overflow-hidden">
    <ChartContainer config={chartConfig} className="w-full min-h-full border-8 border-casbGrayHover rounded-md">
      <ResponsiveContainer width="100%" height="100%">

      <BarChart 
      data={chartData} 
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }} 
      barCategoryGap={20} 
      barGap={5}
      >
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#D0E6F7" />
            <stop offset="100%" stopColor="#01589A" />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          ticks={[0, 5, 10, 15, 20, 25]}
          tickFormatter={(value) => `$${value}K`}
        />
        <Bar
          dataKey="value"
          fill="url(#colorGradient)"
          radius={4}
          barSize={20}
        />
      </BarChart>
      </ResponsiveContainer>
    </ChartContainer>

        </div>
    </div>
  )
}
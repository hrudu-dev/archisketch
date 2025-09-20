"use client"

import * as React from "react"
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts"

const data = [
  { name: "You", value: 45, color: "hsl(var(--primary))" },
  { name: "Jane", value: 30, color: "hsl(var(--chart-2))" },
  { name: "Alex", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Bob", value: 5, color: "hsl(var(--chart-4))" },
]

export function CollaboratorBreakdownChart() {
  return (
    <div className="h-[250px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
            <Tooltip
                content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                        return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <p className="text-sm font-bold">{`${payload[0].name}: ${payload[0].value}%`}</p>
                        </div>
                        )
                    }
                    return null;
                }}
            />
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Pie>
        </PieChart>
        </ResponsiveContainer>
    </div>
  )
}

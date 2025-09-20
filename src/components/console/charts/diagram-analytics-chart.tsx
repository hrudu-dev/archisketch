"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Day 1", diagrams: 2 },
  { name: "Day 5", diagrams: 5 },
  { name: "Day 10", diagrams: 8 },
  { name: "Day 15", diagrams: 9 },
  { name: "Day 20", diagrams: 11 },
  { name: "Day 25", diagrams: 12 },
  { name: "Day 30", diagrams: 15 },
]

export function DiagramAnalyticsChart() {
  return (
    <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <Tooltip
                content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                        return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Day
                                </span>
                                <span className="font-bold text-muted-foreground">
                                {label}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Diagrams
                                </span>
                                <span className="font-bold">
                                {payload[0].value}
                                </span>
                            </div>
                            </div>
                        </div>
                        )
                    }
                    return null;
                }}
            />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <Line type="monotone" dataKey="diagrams" strokeWidth={2} stroke="hsl(var(--primary))" dot={false} />
        </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

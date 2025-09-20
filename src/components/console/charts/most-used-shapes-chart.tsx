
"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const defaultData = [
  { name: "EC2", uses: 56 },
  { name: "Arrow", uses: 45 },
  { name: "DB", uses: 28 },
  { name: "Text", uses: 21 },
  { name: "Pod", uses: 17 },
]

interface MostUsedShapesChartProps {
    data?: { name: string; uses: number }[];
}

export function MostUsedShapesChart({ data = defaultData }: MostUsedShapesChartProps) {
    if (!data || data.length === 0) {
        return <div className="h-[250px] flex items-center justify-center text-muted-foreground text-sm">No data available</div>
    }

  return (
    <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <Tooltip
                 content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                        return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <p className="text-sm font-bold">{`${label}: ${payload[0].value} uses`}</p>
                        </div>
                        )
                    }
                    return null;
                }}
                cursor={{fill: 'hsl(var(--muted))'}}
            />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <Bar dataKey="uses" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
        </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

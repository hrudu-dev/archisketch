import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Your personal command center. Jump back into recent projects or start something new.
      </p>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Diagrams</CardTitle>
            <CardDescription>
              Pick up where you left off.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">No recent diagrams yet.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Dashboard</h1>
      <p className="text-muted-foreground mb-8">
       The Dashboard serves as your personal command center. It provides a quick overview of your most recent projects and diagrams, allowing you to jump back into a project with a single click. From here, you can also quickly create a new diagram, browse the template library, or see a summary of recent collaborative activity across your projects.
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

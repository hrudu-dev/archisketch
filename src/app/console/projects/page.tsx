import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>
      <p className="text-muted-foreground mb-8">
        Your file management system. Organize and navigate all your diagrams and folders within a project.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Your Diagrams</CardTitle>
          <CardDescription>
            Search, filter, and manage your files.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">No projects yet. Create one to get started!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

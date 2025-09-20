
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Share2, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewProjectDialog } from "@/components/console/new-project-dialog";

const mockProjects = [
  {
    id: "proj-1",
    name: "E-commerce Platform Migration",
    description: "Migrating the legacy e-commerce site to a microservices architecture on AWS.",
    updatedAt: "2 days ago",
  },
  {
    id: "proj-2",
    name: "AI-Powered Recommendation Engine",
    description: "Developing a new recommendation engine using a serverless architecture and a custom ML model.",
    updatedAt: "5 days ago",
  },
  {
    id: "proj-3",
    name: "Corporate Security Overhaul",
    description: "Redesigning the corporate network with a focus on zero-trust security principles.",
    updatedAt: "1 week ago",
  },
  {
    id: "proj-4",
    name: "Internal Developer Platform",
    description: "Building a new internal developer platform on top of Kubernetes to streamline deployments.",
    updatedAt: "2 weeks ago",
  },
];

export default function ProjectsPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <NewProjectDialog />
      </div>
      <p className="text-muted-foreground mb-8">
        Your file management system. Organize and navigate all your diagrams and folders within a project.
      </p>

      <div className="grid gap-6">
        {mockProjects.map((project) => (
          <Card key={project.id}>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Rename Project
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Project
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Updated {project.updatedAt}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

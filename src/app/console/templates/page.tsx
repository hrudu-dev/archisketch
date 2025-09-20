
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

const templates = [
  {
    title: "Basic Cloud Web Application",
    description: "A standard three-tier architecture with a load balancer, compute instances, and a database within a single VPC.",
    category: "Cloud",
  },
  {
    title: "Kubernetes Deployment",
    description: "A typical container orchestration setup with nodes, pods, services, and a persistent volume.",
    category: "Kubernetes",
  },
  {
    title: "Serverless Architecture",
    description: "An event-driven pattern using an API Gateway, a function service (e.g., Lambda), and a NoSQL database.",
    category: "Serverless",
  },
  {
    title: "Microservices Architecture",
    description: "Multiple, independently deployable services communicating through an API Gateway or message queue.",
    category: "Microservices",
  },
  {
    title: "Data Processing Pipeline",
    description: "An architecture for data ingestion, processing, and storage using a message queue, data lake, and data warehouse.",
    category: "Data",
  },
  {
    title: "Security Best Practices",
    description: "A secure architecture with firewalls, a WAF, network zones (Public, Private, DMZ), and a bastion host.",
    category: "Security",
  }
];

export default function TemplatesPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
        <p className="text-muted-foreground mt-2">
          A curated gallery of pre-built diagram templates and best practices to jumpstart your designs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="font-semibold">Category</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="filter-cloud" />
                  <Label htmlFor="filter-cloud">Cloud</Label>
                </div>
                 <div className="flex items-center space-x-2">
                  <Checkbox id="filter-kubernetes" />
                  <Label htmlFor="filter-kubernetes">Kubernetes</Label>
                </div>
                 <div className="flex items-center space-x-2">
                  <Checkbox id="filter-serverless" />
                  <Label htmlFor="filter-serverless">Serverless</Label>
                </div>
                 <div className="flex items-center space-x-2">
                  <Checkbox id="filter-microservices" />
                  <Label htmlFor="filter-microservices">Microservices</Label>
                </div>
                 <div className="flex items-center space-x-2">
                  <Checkbox id="filter-data" />
                  <Label htmlFor="filter-data">Data</Label>
                </div>
                 <div className="flex items-center space-x-2">
                  <Checkbox id="filter-security" />
                  <Label htmlFor="filter-security">Security</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search templates by name or keyword..."
              className="w-full pl-10"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {templates.map((template) => (
              <Card key={template.title}>
                <CardHeader>
                  <CardTitle>{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center h-40 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">Diagram Preview</p>
                  </div>
                  <Button className="w-full">Use Template</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

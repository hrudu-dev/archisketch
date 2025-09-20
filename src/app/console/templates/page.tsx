
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search templates by name or keyword..."
            className="w-full pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-auto sm:min-w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="cloud">Cloud</SelectItem>
            <SelectItem value="kubernetes">Kubernetes</SelectItem>
            <SelectItem value="serverless">Serverless</SelectItem>
            <SelectItem value="microservices">Microservices</SelectItem>
            <SelectItem value="data">Data</SelectItem>
            <SelectItem value="security">Security</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.title} className="flex flex-col">
            <CardHeader>
              <CardTitle>{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col flex-grow">
              <div className="flex items-center justify-center h-40 bg-muted rounded-md flex-grow">
                <p className="text-sm text-muted-foreground">Diagram Preview</p>
              </div>
              <Button className="w-full">Use Template</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

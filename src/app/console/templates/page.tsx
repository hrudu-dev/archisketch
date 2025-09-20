import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TemplatesPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Templates</h1>
      <p className="text-muted-foreground mb-8">
        A curated gallery of pre-built diagram templates and best practices to jumpstart your designs.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>3-Tier Web App</CardTitle>
            <CardDescription>A classic web architecture with a presentation layer, an application layer, and a data layer.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">Diagram Preview</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI Inference API</CardTitle>
            <CardDescription>An architecture for serving machine learning model predictions via a scalable API.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">Diagram Preview</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Microservices</CardTitle>
            <CardDescription>A distributed application architecture composed of small, independent services.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">Diagram Preview</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function EditorPage() {
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4">Editor</h1>
            <p className="text-muted-foreground mb-8">
                Your dedicated workspace for building and modifying architectural diagrams.
            </p>

            <Card>
                <CardHeader>
                    <CardTitle>Diagram Canvas</CardTitle>
                    <CardDescription>
                        This is where the magic happens.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-[60vh] border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">Your diagram editor will be here.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

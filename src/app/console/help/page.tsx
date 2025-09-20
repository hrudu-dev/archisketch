import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HelpPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Help</h1>
      <p className="text-muted-foreground mb-8">
        The Help page is your go-to resource for assistance and learning. It features a collection of quick guides, onboarding tutorials, and detailed documentation to help you get the most out of the application. Whether you're a new user looking for a tour or an experienced one with a specific question, this page provides the support you need to use the app effectively.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Find answers to common questions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I create a new diagram?</AccordionTrigger>
              <AccordionContent>
                You can create a new diagram from the Dashboard or the Projects page by clicking the "New Diagram" button. You can also start from a template on the Templates page.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I customize the components?</AccordionTrigger>
              <AccordionContent>
                Yes, you can customize the properties of each component, such as labels and colors, using the properties panel in the Editor.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I export my diagram?</AccordionTrigger>
              <AccordionContent>
                In the Editor, you will find an "Export" option in the main menu that allows you to save your diagram as an image (PNG, SVG) or as a JSON file.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

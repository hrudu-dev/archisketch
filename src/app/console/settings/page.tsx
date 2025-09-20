import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Settings</h1>
      <p className="text-muted-foreground mb-8">
        The Settings page is where you can personalize your user experience. It allows you to manage your account details, such as your profile and password, and customize your workspace preferences. You can adjust grid settings, change the canvas background, switch between light and dark themes, and even define your own custom keyboard shortcuts to fit your workflow.
      </p>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Manage your account settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">Account settings will be here.</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Workspace</CardTitle>
            <CardDescription>
              Customize your workspace preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">Workspace settings will be here.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Settings</h1>
      <p className="text-muted-foreground mb-8">
        The Settings page is where you can personalize your user experience. It allows you to manage your account details, such as your profile and password, and customize your workspace preferences. You can adjust grid settings, change the canvas background, switch between light and dark themes, and even define your own custom keyboard shortcuts to fit your workflow.
      </p>

      <Tabs defaultValue="account" className="flex flex-col md:flex-row gap-8">
        <TabsList className="flex md:flex-col h-auto bg-transparent p-0 md:w-1/4 lg:w-1/5">
          <TabsTrigger value="account" className="w-full justify-start data-[state=active]:bg-accent">Account</TabsTrigger>
          <TabsTrigger value="workspace" className="w-full justify-start data-[state=active]:bg-accent">Workspace</TabsTrigger>
          <TabsTrigger value="shortcuts" className="w-full justify-start data-[state=active]:bg-accent">Keyboard Shortcuts</TabsTrigger>
        </TabsList>

        <div className="flex-1">
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your personal information and integrations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <Button>Update Profile</Button>
                <hr/>
                <h3 className="text-lg font-medium pt-4">Change Password</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                 <Button>Change Password</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workspace">
            <Card>
              <CardHeader>
                <CardTitle>Workspace Settings</CardTitle>
                <CardDescription>Customize the diagramming environment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="snap-to-grid">Snap to Grid</Label>
                  <Switch id="snap-to-grid" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grid-size">Grid Size</Label>
                  <Input id="grid-size" type="number" defaultValue="20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="canvas-bg">Canvas Background</Label>
                  <Select defaultValue="gray">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a background" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="white">White</SelectItem>
                      <SelectItem value="gray">Light Gray</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shortcuts">
            <Card>
              <CardHeader>
                <CardTitle>Keyboard Shortcuts</CardTitle>
                <CardDescription>View and manage your keyboard shortcuts.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>Shortcut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Save Diagram</TableCell>
                      <TableCell>Ctrl + S</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Copy Component</TableCell>
                      <TableCell>Ctrl + C</TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell>Paste Component</TableCell>
                      <TableCell>Ctrl + V</TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell>Delete Component</TableCell>
                      <TableCell>Delete</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

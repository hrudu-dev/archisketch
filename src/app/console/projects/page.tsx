
'use client';

import React from 'react';
import Link from 'next/link';
import {
  Home,
  FolderKanban,
  ClipboardPlus,
  Settings,
  LifeBuoy,
  LogOut,
  Search,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/console/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function ProjectsContent() {
    return (
        <div className="flex-1 p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Projects</h1>
                <Button>New Diagram</Button>
            </div>
            <div className="flex items-center mb-6">
                <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search diagrams..." className="pl-10" />
                </div>
            </div>
            <div className="border rounded-lg bg-card">
                <div className="p-6">
                    <p className="text-muted-foreground">No projects yet. Create your first diagram to get started.</p>
                </div>
            </div>
        </div>
    )
}

function ProjectsLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full flex-col bg-background">
        <Header />
        <div className="flex flex-1">
          <Sidebar side="left" collapsible="icon">
            <SidebarContent>
              <SidebarHeader>
                {/* Placeholder for any header content if needed */}
              </SidebarHeader>
              <SidebarMenu>
                 <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Dashboard">
                    <Link href="/console">
                      <Home />
                      <span className="group-data-[collapsible=icon]:hidden">Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Projects" isActive>
                    <Link href="/console/projects">
                      <FolderKanban />
                      <span className="group-data-[collapsible=icon]:hidden">Projects</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Templates">
                    <Link href="/console/templates">
                      <ClipboardPlus />
                      <span className="group-data-[collapsible=icon]:hidden">Templates</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <Separator className="my-2" />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Support">
                           <Link href="/console/help">
                            <LifeBuoy />
                            <span className="group-data-[collapsible=icon]:hidden">Support</span>
                          </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Settings">
                            <Link href="/console/settings">
                                <Settings />
                                <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Log Out">
                        <Link href="/">
                          <LogOut />
                          <span className="group-data-[collapsible=icon]:hidden">Log Out</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <ProjectsContent />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function ProjectsPage() {
  return <ProjectsLayout />;
}

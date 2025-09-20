
'use client';

import React from 'react';
import {
  Home,
  LayoutDashboard,
  FolderKanban,
  ClipboardPlus,
  Settings,
  LifeBuoy,
  LogOut,
  PanelLeft,
} from 'lucide-react';
import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/console/header';
import { Button } from '@/components/ui/button';

function DashboardContent() {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6">
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex gap-4">
            <Button>New Diagram</Button>
            <Button variant="outline">Browse Templates</Button>
          </div>
        </div>
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-semibold mb-4">Recent Diagrams</h2>
          <p className="text-muted-foreground">No recent diagrams.</p>
        </div>
         <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
          <p className="text-muted-foreground">No recent activity.</p>
        </div>
      </div>
    </div>
  )
}


function ConsoleLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full flex-col bg-background">
        <Header>
          <div className="flex items-center gap-2">
            <SidebarTrigger className="hidden md:flex">
              <PanelLeft />
              <span className="sr-only">Toggle Left Sidebar</span>
            </SidebarTrigger>
          </div>
        </Header>
        <div className="flex flex-1">
          <Sidebar side="left" collapsible="icon">
            <SidebarContent>
              <SidebarMenu>
                 <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Dashboard" isActive>
                    <Link href="/console">
                      <Home />
                      <span className="group-data-[collapsible=icon]:hidden">Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Editor">
                    <Link href="/console/diagram/1">
                      <LayoutDashboard />
                      <span className="group-data-[collapsible=icon]:hidden">Editor</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Projects">
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
                        <SidebarMenuButton asChild tooltip="Help">
                          <Link href="/console/help">
                            <LifeBuoy />
                            <span className="group-data-[collapsible=icon]:hidden">Help</span>
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
            <DashboardContent />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function ConsolePage() {
  return <ConsoleLayout />;
}

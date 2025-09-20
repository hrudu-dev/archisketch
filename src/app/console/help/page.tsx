
'use client';

import React from 'react';
import Link from 'next/link';
import {
  Home,
  LayoutDashboard,
  FolderKanban,
  ClipboardPlus,
  Settings,
  LifeBuoy,
  LogOut,
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

function HelpContent() {
    return (
        <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold mb-6">Help & Tutorials</h1>
             <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is ArchiSketch?</AccordionTrigger>
                    <AccordionContent>
                    ArchiSketch is an AI-powered diagramming tool that allows you to create, edit, and export architecture diagrams for AI, cloud, dev, and security projects.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How do I create a new diagram?</AccordionTrigger>
                    <AccordionContent>
                    You can create a new diagram from the Dashboard using the "New Diagram" button, or from the Projects page. You can also generate a diagram from a text prompt using the AI Assistant.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How does the AI Assistant work?</AccordionTrigger>
                    <AccordionContent>
                    The AI Assistant can generate diagrams from your text descriptions, suggest components and connections to add to your existing diagram, and provide context-aware recommendations.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Can I export my diagrams?</AccordionTrigger>
                    <AccordionContent>
                    Yes, you can export your diagrams as PNG images using the "Export" button in the header. More formats like SVG and PDF are coming soon.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

function HelpLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full flex-col bg-background">
        <Header />
        <div className="flex flex-1">
          <Sidebar side="left" collapsible="icon">
            <SidebarContent>
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
                        <SidebarMenuButton asChild tooltip="Help" isActive>
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
            <HelpContent />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function HelpPage() {
  return <HelpLayout />;
}


'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Edit, FolderKanban, LayoutTemplate, Settings, HelpCircle } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '../logo';
import { SheetHeader, SheetTitle } from '../ui/sheet';

const menuItems = [
  { href: '/console', label: 'Dashboard', icon: Home },
  { href: '/console/projects', label: 'Projects', icon: FolderKanban },
  { href: '/console/editor', label: 'Editor', icon: Edit },
  { href: '/console/templates', label: 'Templates', icon: LayoutTemplate },
];

const bottomMenuItems = [
    { href: '/console/settings', label: 'Settings', icon: Settings },
    { href: '/console/help', label: 'Help', icon: HelpCircle },
];

export function ConsoleSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  const sidebarContent = (
    <>
        <SidebarHeader className="h-16 border-b flex items-center px-4">
            <Link href="/console" className="flex items-center gap-2.5 text-foreground">
            <Logo className="h-6 w-6 text-foreground" />
            <span className="font-semibold text-lg group-data-[state=collapsed]/sidebar-wrapper:hidden">ArchiSketch</span>
            </Link>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
            {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior={false}>
                    <SidebarMenuButton
                        isActive={pathname === item.href}
                        tooltip={item.label}
                        className="text-foreground font-medium"
                    >
                        <item.icon />
                        <span className="group-data-[state=collapsed]/sidebar-wrapper:hidden">{item.label}</span>
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                {bottomMenuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior={false}>
                        <SidebarMenuButton
                            isActive={pathname === item.href}
                            tooltip={item.label}
                            className="text-foreground font-medium"
                        >
                            <item.icon />
                            <span className="group-data-[state=collapsed]/sidebar-wrapper:hidden">{item.label}</span>
                        </SidebarMenuButton>
                    </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarFooter>
    </>
  );


  // The SheetContent in the mobile view requires a title for accessibility.
  // We can add a visually hidden title.
  const mobileSidebarContent = (
    <>
      <SheetHeader className="sr-only">
        <SheetTitle>ArchiSketch Menu</SheetTitle>
      </SheetHeader>
      {sidebarContent}
    </>
  );

  return (
    <Sidebar mobileContent={mobileSidebarContent}>
      {sidebarContent}
    </Sidebar>
  );
}

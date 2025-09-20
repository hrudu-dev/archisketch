
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Edit, PanelLeft } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const menuItems = [
  { href: '/console', label: 'Dashboard', icon: Home },
  { href: '/console/editor', label: 'Editor', icon: Edit },
];

export function ConsoleSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r" side="left">
      <SidebarHeader className="border-b p-2 justify-center flex items-center gap-2">
        <SidebarTrigger asChild>
          <Button variant="ghost" size="icon">
            <PanelLeft />
          </Button>
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <a>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}


'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Edit } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';

const menuItems = [
  { href: '/console', label: 'Dashboard', icon: Home },
  { href: '/console/editor', label: 'Editor', icon: Edit },
];

export function ConsoleSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar className="border-r" side="left">
      <SidebarHeader className="border-b h-16 p-4">
        <Link href="/console" className="flex items-center gap-2 font-semibold text-foreground">
          <Logo className="h-6 w-6" />
          {state === 'expanded' && <span className="font-semibold">ArchiSketch</span>}
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
                    className="text-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

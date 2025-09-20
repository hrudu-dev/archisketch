
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Edit, FolderKanban, LayoutTemplate } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import ArchiSketchLogoDark from '@/../public/archisketch-logo-dark.svg';
import ArchiSketchLogoLight from '@/../public/archisketch-logo-light.svg';
import { Logo } from '../logo';

const menuItems = [
  { href: '/console', label: 'Dashboard', icon: Home },
  { href: '/console/projects', label: 'Projects', icon: FolderKanban },
  { href: '/console/editor', label: 'Editor', icon: Edit },
  { href: '/console/templates', label: 'Templates', icon: LayoutTemplate },
];

export function ConsoleSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar side="left">
      <SidebarHeader className="h-16 p-4 border-b">
        <Link href="/console" className="flex items-center gap-2.5 text-foreground">
          <Logo className="h-6 w-6 text-foreground" />
          {state === 'expanded' && <span className="font-semibold text-lg">ArchiSketch</span>}
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

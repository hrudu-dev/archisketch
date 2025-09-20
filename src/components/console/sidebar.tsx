
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Edit, PanelLeft } from 'lucide-react';
import ArchiSketchLogo from '../../../public/archisketch-logo.svg';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const menuItems = [
  { href: '/console', label: 'Dashboard', icon: Home },
  { href: '/console/editor', label: 'Editor', icon: Edit },
];

export function ConsoleSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar className="border-r" side="left">
      <SidebarHeader className="border-b p-2 justify-center flex items-center gap-2">
        <Link href="/console" className="flex items-center gap-2 font-semibold">
          <Image src={ArchiSketchLogo} alt="ArchiSketch Logo" width={28} height={28} />
          {state === 'expanded' && <span className="text-lg font-semibold">ArchiSketch</span>}
        </Link>
        <div className="flex-1" />
        <SidebarTrigger>
          <PanelLeft />
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <div>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

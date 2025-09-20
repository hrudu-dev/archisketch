
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PanelLeft } from 'lucide-react';
import ArchiSketchLogo from '../../../public/archisketch-logo.svg';
import { useSidebar, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

export function ConsoleHeader() {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <PanelLeft className="h-5 w-5" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      <div className="hidden md:flex items-center gap-2">
        <Link href="/console" className="flex items-center gap-2 font-semibold">
          <Image src={ArchiSketchLogo} alt="ArchiSketch Logo" width={24} height={24} />
          <span className="sm:inline-block">ArchiSketch</span>
        </Link>
        <SidebarTrigger asChild>
            <Button variant="ghost" size="icon">
                <PanelLeft />
            </Button>
        </SidebarTrigger>
      </div>
    </header>
  );
}

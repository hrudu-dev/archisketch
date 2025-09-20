
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Download, LogOut, Settings, Share2, User as UserIcon, Menu } from 'lucide-react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

import ArchiSketchLogo from '../../../public/archisketch-logo.svg';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from '@/components/ui/sidebar';

export function Header({ children }: { children?: React.ReactNode }) {
  const { toggleSidebar } = useSidebar();
  
  const handleExport = () => {
    const canvasElement = document.getElementById('diagram-canvas');
    if (!canvasElement) {
      // This is expected if not on the editor page.
      // In a real app, you might show a toast notification.
      console.log('Export functionality is only available on the diagram editor page.');
      alert('Export is only available from the diagram editor.')
      return;
    }

    // Temporarily remove selection ring for a clean export
    const selectedNode = canvasElement.querySelector('[class*="ring-2"]');
    let originalClasses = '';
    if (selectedNode) {
      originalClasses = selectedNode.className;
      selectedNode.className = originalClasses.replace(/ring-2 ring-primary ring-offset-2/g, '').trim();
    }

    toPng(canvasElement, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl) => {
        saveAs(dataUrl, 'archisketch-diagram.png');
      })
      .catch((err) => {
        console.error('Failed to export diagram', err);
      })
      .finally(() => {
        // Restore selection ring if it was removed
        if (selectedNode) {
          selectedNode.className = originalClasses;
        }
      });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
          <Menu />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        <Link href="/console" className="flex items-center gap-2 font-semibold text-lg">
          <Image src={ArchiSketchLogo} alt="ArchiSketch Logo" className="h-7 w-7" />
          <h1 className="hidden md:block">ArchiSketch</h1>
        </Link>
      </div>

      <div className="flex items-center">
        {children}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/user/32/32" data-ai-hint="person face" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/console/settings">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
              <Link href="/console/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

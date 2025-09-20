'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Download, LogOut, Settings, User as UserIcon } from 'lucide-react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

import ArchiSketchLogo from '../../../public/archisketch-logo.svg';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  const handleExport = () => {
    const canvasElement = document.getElementById('diagram-canvas');
    if (!canvasElement) {
      console.error('Canvas element not found for export.');
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
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
      <Link href="/console" className="flex items-center gap-2 font-semibold">
        <Image src={ArchiSketchLogo} alt="ArchiSketch Logo" className="h-6 w-6" />
        <span className="">ArchiSketch</span>
      </Link>
      <div className="ml-auto flex items-center gap-2">
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
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
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

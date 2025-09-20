import type { Metadata } from 'next';
import { ConsoleHeader } from '@/components/console/header';
import { ConsoleSidebar } from '@/components/console/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export const metadata: Metadata = {
  title: 'ArchiSketch Console',
  description: 'Create, export, and edit architecture diagrams.',
};

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen flex-col">
        <ConsoleHeader />
        <div className="flex flex-1 overflow-hidden">
          <ConsoleSidebar />
          <main className="flex-1 overflow-y-auto bg-background">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

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
      <div className="flex min-h-screen">
        <ConsoleSidebar />
        <main className="flex-1 flex flex-col w-full">
          <ConsoleHeader />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}

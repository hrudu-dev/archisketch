import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  BookUser,
  CircleUser,
  Package,
  Plus,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DiagramAnalyticsChart } from '@/components/console/charts/diagram-analytics-chart';
import { MostUsedShapesChart } from '@/components/console/charts/most-used-shapes-chart';
import { CollaboratorBreakdownChart } from '@/components/console/charts/collaborator-breakdown-chart';

const recentDiagrams = [
    {
        id: 'diag-1',
        title: 'Architecture 3.0 (AWS)',
        editor: 'Jane',
        timestamp: '15 minutes ago',
        avatar: '/avatars/01.png'
    },
    {
        id: 'diag-2',
        title: 'Kubernetes Cluster v2',
        editor: 'You',
        timestamp: '1 hour ago',
        avatar: '/avatars/02.png'
    },
    {
        id: 'diag-3',
        title: 'Internal Microservices API',
        editor: 'Alex',
        timestamp: '3 hours ago',
        avatar: '/avatars/03.png'
    },
    {
        id: 'diag-4',
        title: 'Data Lake Pipeline',
        editor: 'Bob',
        timestamp: 'yesterday',
        avatar: '/avatars/04.png'
    },
    {
        id: 'diag-5',
        title: 'Security Best Practices',
        editor: 'Alex',
        timestamp: '2 days ago',
        avatar: '/avatars/03.png'
    },
]

const projectActivity = [
    {
        id: 'act-1',
        editor: 'Jane',
        action: 'edited',
        diagram: 'Architecture 3.0 (AWS)'
    },
    {
        id: 'act-2',
        editor: 'Alex',
        action: 'commented on',
        diagram: 'Internal Microservices API'
    },
    {
        id: 'act-3',
        editor: 'Bob',
        action: 'created a new diagram',
        diagram: 'Data Ingestion Pipeline'
    },
    {
        id: 'act-4',
        editor: 'You',
        action: 'added a new collaborator to the project',
        diagram: ''
    }
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                    variant="outline"
                    size="lg"
                    className="w-[280px] justify-between"
                    >
                    <div className='flex items-center gap-2'>
                        <Package className='w-4 h-4' />
                        <span className="font-semibold">ArchiSketch Main Project</span>
                    </div>
                    <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[280px]">
                    <DropdownMenuLabel>Switch Project</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Project Alpha</DropdownMenuItem>
                    <DropdownMenuItem>Project Beta</DropdownMenuItem>
                    <DropdownMenuItem>Project Gamma</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                    <Link href="/console/projects" className='w-full'>View All Projects</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="ml-auto flex items-center gap-2">
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> New Diagram
                </Button>
            </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card className="sm:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Recent Diagrams</CardTitle>
                <Button asChild size="sm" variant="outline" className="ml-auto gap-1">
                  <Link href="/console/projects">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentDiagrams.map(diagram => (
                        <div key={diagram.id} className="flex items-center gap-4">
                             <Avatar className="hidden h-9 w-9 sm:flex">
                                <AvatarImage src={diagram.avatar} alt="Avatar" />
                                <AvatarFallback>{diagram.editor.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">{diagram.title}</p>
                                <p className="text-sm text-muted-foreground">Edited by {diagram.editor} &middot; {diagram.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Project Activity</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectActivity.map(activity => (
                    <div key={activity.id} className="grid gap-1">
                        <p className="text-sm">
                            <span className='font-medium'>{activity.editor}</span>
                            {' '}{activity.action}{' '}
                            {activity.diagram && <span className='font-medium'>{activity.diagram}</span>}
                        </p>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Collaborator Breakdown</CardTitle>
              <BookUser className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <CollaboratorBreakdownChart />
            </CardContent>
          </Card>
           <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Diagrams Created</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <DiagramAnalyticsChart />
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Most Used Shapes</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <MostUsedShapesChart />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

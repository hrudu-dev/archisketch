
import { Dashboard } from '@/components/console/dashboard';

const projectData = {
  'main': {
    recentDiagrams: [
      { id: 'diag-1', title: 'Architecture 3.0 (AWS)', editor: 'Jane', timestamp: '15 minutes ago', avatar: '/avatars/01.png' },
      { id: 'diag-2', title: 'Kubernetes Cluster v2', editor: 'You', timestamp: '1 hour ago', avatar: '/avatars/02.png' },
      { id: 'diag-3', title: 'Internal Microservices API', editor: 'Alex', timestamp: '3 hours ago', avatar: '/avatars/03.png' },
      { id: 'diag-4', title: 'Data Lake Pipeline', editor: 'Bob', timestamp: 'yesterday', avatar: '/avatars/04.png' },
      { id: 'diag-5', title: 'Security Best Practices', editor: 'Alex', timestamp: '2 days ago', avatar: '/avatars/03.png' },
    ],
    projectActivity: [
      { id: 'act-1', editor: 'Jane', action: 'edited', diagram: 'Architecture 3.0 (AWS)' },
      { id: 'act-2', editor: 'Alex', action: 'commented on', diagram: 'Internal Microservices API' },
      { id: 'act-3', editor: 'Bob', action: 'created a new diagram', diagram: 'Data Ingestion Pipeline' },
      { id: 'act-4', editor: 'You', action: 'added a new collaborator to the project', diagram: '' },
    ],
    diagramAnalytics: [
      { name: "Day 1", diagrams: 2 }, { name: "Day 5", diagrams: 5 }, { name: "Day 10", diagrams: 8 },
      { name: "Day 15", diagrams: 9 }, { name: "Day 20", diagrams: 11 }, { name: "Day 25", diagrams: 12 },
      { name: "Day 30", diagrams: 15 },
    ],
    mostUsedShapes: [
      { name: "EC2", uses: 56 }, { name: "Arrow", uses: 45 }, { name: "DB", uses: 28 },
      { name: "Text", uses: 21 }, { name: "Pod", uses: 17 },
    ],
    collaboratorBreakdown: [
      { name: "You", value: 45 }, { name: "Jane", value: 30 }, { name: "Alex", value: 20 }, { name: "Bob", value: 5 },
    ],
  },
  'alpha': {
    recentDiagrams: [
      { id: 'diag-alpha-1', title: 'Alpha API Gateway', editor: 'Charlie', timestamp: '2 hours ago', avatar: '/avatars/05.png' },
      { id: 'diag-alpha-2', title: 'Alpha DB Schema', editor: 'You', timestamp: '5 hours ago', avatar: '/avatars/02.png' },
    ],
    projectActivity: [
      { id: 'act-alpha-1', editor: 'Charlie', action: 'created', diagram: 'Alpha API Gateway' },
    ],
    diagramAnalytics: [
      { name: "Day 1", diagrams: 1 }, { name: "Day 5", diagrams: 2 }, { name: "Day 10", diagrams: 2 },
      { name: "Day 15", diagrams: 3 }, { name: "Day 20", diagrams: 5 }, { name: "Day 25", diagrams: 7 },
      { name: "Day 30", diagrams: 8 },
    ],
    mostUsedShapes: [
      { name: "Lambda", uses: 30 }, { name: "API GW", uses: 25 }, { name: "DynamoDB", uses: 22 },
      { name: "Arrow", uses: 15 }, { name: "Text", uses: 10 },
    ],
    collaboratorBreakdown: [
      { name: "You", value: 60 }, { name: "Charlie", value: 40 },
    ],
  },
  'beta': {
    recentDiagrams: [
      { id: 'diag-beta-1', title: 'Beta Feature Mockup', editor: 'Dana', timestamp: '1 day ago', avatar: '/avatars/01.png' },
    ],
    projectActivity: [
      { id: 'act-beta-1', editor: 'Dana', action: 'shared', diagram: 'Beta Feature Mockup' },
    ],
    diagramAnalytics: [
      { name: "Day 1", diagrams: 0 }, { name: "Day 5", diagrams: 0 }, { name: "Day 10", diagrams: 1 },
      { name: "Day 15", diagrams: 1 }, { name: "Day 20", diagrams: 1 }, { name: "Day 25", diagrams: 2 },
      { name: "Day 30", diagrams: 3 },
    ],
    mostUsedShapes: [
      { name: "Rectangle", uses: 10 }, { name: "User", uses: 8 }, { name: "Arrow", uses: 5 },
    ],
    collaboratorBreakdown: [
      { name: "You", value: 50 }, { name: "Dana", value: 50 },
    ],
  },
  'gamma': {
    recentDiagrams: [],
    projectActivity: [
      { id: 'act-gamma-1', editor: 'You', action: 'created project', diagram: 'Project Gamma' },
    ],
    diagramAnalytics: [
      { name: "Day 1", diagrams: 0 }, { name: "Day 5", diagrams: 0 }, { name: "Day 10", diagrams: 0 },
      { name: "Day 15", diagrams: 0 }, { name: "Day 20", diagrams: 0 }, { name: "Day 25", diagrams: 0 },
      { name: "Day 30", diagrams: 0 },
    ],
    mostUsedShapes: [],
    collaboratorBreakdown: [
      { name: "You", value: 100 },
    ],
  },
};

const projects = [
  { id: 'main', name: 'ArchiSketch Main Project' },
  { id: 'alpha', name: 'Project Alpha' },
  { id: 'beta', name: 'Project Beta' },
  { id: 'gamma', name: 'Project Gamma' },
];

export default function DashboardPage() {
  return (
    <Dashboard projects={projects} projectData={projectData} />
  );
}

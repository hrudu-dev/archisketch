import { BrainCircuit, Cloud, Code, Database, Server, Shield, User } from 'lucide-react';
import type { LibraryComponent, DiagramTemplate } from './types';

export const componentLibrary: LibraryComponent[] = [
  { id: 'user', name: 'User', category: 'Dev', icon: User },
  { id: 'server', name: 'Server', category: 'Cloud', icon: Server },
  { id: 'database', name: 'Database', category: 'Data', icon: Database },
  { id: 'cloud', name: 'Cloud Provider', category: 'Cloud', icon: Cloud },
  { id: 'ai-model', name: 'AI Model', category: 'AI', icon: BrainCircuit },
  { id: 'firewall', name: 'Firewall', category: 'Security', icon: Shield },
  { id: 'api', name: 'API', category: 'Dev', icon: Code },
];

export const diagramTemplates: DiagramTemplate[] = [
  {
    id: 'simple-web-app',
    name: 'Simple Web App',
    description: 'A basic 3-tier web application architecture.',
    diagram: {
      nodes: [
        { id: 'user-1', type: 'user', position: { x: 100, y: 250 }, data: { label: 'User' } },
        { id: 'server-1', type: 'server', position: { x: 400, y: 250 }, data: { label: 'Web Server' } },
        { id: 'database-1', type: 'database', position: { x: 700, y: 250 }, data: { label: 'Database' } },
      ],
      edges: [
        { id: 'e1-2', source: 'user-1', target: 'server-1' },
        { id: 'e2-3', source: 'server-1', target: 'database-1' },
      ],
    },
  },
  {
    id: 'ai-inference',
    name: 'AI Inference API',
    description: 'Architecture for an API that serves AI model predictions.',
    diagram: {
      nodes: [
        { id: 'user-2', type: 'user', position: { x: 100, y: 250 }, data: { label: 'Client App' } },
        { id: 'api-1', type: 'api', position: { x: 350, y: 150 }, data: { label: 'API Gateway' } },
        { id: 'server-2', type: 'server', position: { x: 600, y: 250 }, data: { label: 'Inference Server' } },
        { id: 'ai-model-1', type: 'ai-model', position: { x: 850, y: 250 }, data: { label: 'ML Model' } },
      ],
      edges: [
        { id: 'e2-1', source: 'user-2', target: 'api-1' },
        { id: 'e1-2', source: 'api-1', target: 'server-2' },
        { id: 'e2-3', source: 'server-2', target: 'ai-model-1' },
      ],
    },
  },
];

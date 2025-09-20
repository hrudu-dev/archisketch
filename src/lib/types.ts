import type { LucideIcon } from 'lucide-react';

export type DiagramNode = {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { label: string };
};

export type DiagramEdge = {
  id: string;
  source: string;
  target: string;
};

export type Diagram = {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

export type ComponentCategory = 'AI' | 'Cloud' | 'Dev' | 'Security' | 'Data';

export type LibraryComponent = {
  id: string;
  name: string;
  category: ComponentCategory;
  icon: LucideIcon;
};

export type DiagramTemplate = {
  id: string;
  name: string;
  description: string;
  diagram: Diagram;
};

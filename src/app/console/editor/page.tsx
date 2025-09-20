
'use client';

import { EditorLayout } from '@/components/console/editor-layout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function EditorPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <EditorLayout />
    </DndProvider>
  );
}

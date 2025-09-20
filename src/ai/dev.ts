import { config } from 'dotenv';
config();

import '@/ai/flows/generate-diagram-from-prompt.ts';
import '@/ai/flows/suggest-components-and-connections.ts';
import '@/ai/flows/get-context-aware-suggestions.ts';
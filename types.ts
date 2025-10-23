export interface Strategy {
  id: string;
  title: string;
  steps: string[];
}

export interface Emotion {
  id:string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  relatedWords: string[];
  strategies: {
    immediate: Strategy[];
    shortTerm: Strategy[];
    longTerm: Strategy[];
  };
  helpingOthers: Strategy[];
  relationshipRepair: Strategy[];
}

export interface EmotionCategory {
  id: string;
  name: string;
  isCollapsible: boolean;
  emotions: Emotion[];
}

export interface EmotionLog {
  logId: string;
  emotionId: string;
  emotionName: string;
  emotionEmoji: string;
  emotionColor: string;
  timestamp: number;
}

// Fix: Add missing JournalEntry interface used by the JournalView component.
export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}
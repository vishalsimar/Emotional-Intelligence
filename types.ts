export interface Strategy {
  id: string;
  title: string;
  steps: string[];
}

export interface Emotion {
  id: string;
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
}

export interface EmotionLog {
  logId: string;
  emotionId: string;
  emotionName: string;
  emotionEmoji: string;
  emotionColor: string;
  timestamp: number;
}

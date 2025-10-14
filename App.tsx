import React, { useState, useCallback, useEffect, FormEvent, useMemo } from 'react';
import EmotionSelector from './components/EmotionSelector';
import StrategyDisplay, { StrategyCategory } from './components/StrategyDisplay';
import HistoryView from './components/HistoryView';
import GraphView from './components/GraphView';
import ThemePicker from './components/ThemePicker';
import BreatheView from './components/BreatheView';
import JournalView from './components/JournalView';
import FirstAidView from './components/FirstAidView';
import SimpleStrategyView from './components/SimpleStrategyView';
import PhilosophyModal from './components/PhilosophyModal'; // Import the new modal
import { Emotion, Strategy, EmotionLog, EmotionCategory, JournalEntry } from './types';
import { EMOTION_CATEGORIES } from './constants';
import { useTheme } from './hooks/useTheme';

type PlacementInfo = { type: 'existing' | 'new'; categoryId: string; categoryName: string };

// Inlined EditorModal to avoid creating a new file
export type ModalConfig = 
  | { type: 'emotion'; mode: 'add' }
  | { type: 'emotion'; mode: 'edit'; emotion: Emotion }
  | { type: 'strategy'; mode: 'add'; emotionId: string; category: StrategyCategory | 'helpingOthers' }
  | { type: 'strategy'; mode: 'edit'; emotionId: string; category: StrategyCategory | 'helpingOthers'; strategy: Strategy };

interface EditorModalProps {
  config: ModalConfig | null;
  onSave: (data: Emotion | Strategy, placement?: PlacementInfo) => void;
  onClose: () => void;
  categories: EmotionCategory[];
}

const emotionColors = ['red', 'blue', 'purple', 'yellow', 'green', 'orange', 'slate', 'teal', 'indigo', 'stone', 'lime', 'rose', 'cyan', 'sky'];

const EditorModal: React.FC<EditorModalProps> = ({ config, onSave, onClose, categories }) => {
  const [emotionData, setEmotionData] = useState<Omit<Emotion, 'strategies' | 'helpingOthers'>>({ id: '', name: '', emoji: '', color: 'blue', description: '', relatedWords: [] });
  const [strategyData, setStrategyData] = useState<Omit<Strategy, 'id'>>({ title: '', steps: [] });
  const [relatedWordsStr, setRelatedWordsStr] = useState('');
  const [stepsStr, setStepsStr] = useState('');
  
  // State for new emotion placement
  const [placementType, setPlacementType] = useState<'existing' | 'new'>('existing');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categories[0]?.id || 'cat-basic');
  const [newCategoryName, setNewCategoryName] = useState('');


  useEffect(() => {
    if (config?.type === 'emotion' && config.mode === 'edit') {
      const { strategies, helpingOthers, ...data } = config.emotion;
      setEmotionData(data);
      setRelatedWordsStr(data.relatedWords.join(', '));
    } else if (config?.type === 'emotion' && config.mode === 'add') {
      setEmotionData({ id: '', name: '', emoji: '⚪️', color: 'blue', description: '', relatedWords: [] });
      setRelatedWordsStr('');
      setPlacementType('existing');
      setSelectedCategoryId(categories[0]?.id || 'cat-basic');
      setNewCategoryName('');
    } else if (config?.type === 'strategy' && config.mode === 'edit') {
      setStrategyData(config.strategy);
      setStepsStr(config.strategy.steps.join('\n'));
    } else if (config?.type === 'strategy' && config.mode === 'add') {
      setStrategyData({ title: '', steps: [] });
      setStepsStr('');
    }
  }, [config, categories]);

  if (!config) return null;

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (config.type === 'emotion') {
      const placement: PlacementInfo = {
        type: placementType,
        categoryId: selectedCategoryId,
        categoryName: newCategoryName.trim(),
      };
      onSave({ 
        ...emotionData,
        relatedWords: relatedWordsStr.split(',').map(s => s.trim()).filter(Boolean),
        // Keep existing strategies when editing
        strategies: (config.mode === 'edit' ? config.emotion.strategies : { immediate: [], shortTerm: [], longTerm: [] }),
        helpingOthers: (config.mode === 'edit' ? config.emotion.helpingOthers : []),
      }, placement);
    } else { // strategy
      onSave({ 
        ...strategyData,
        id: (config.mode === 'edit' ? config.strategy.id : ''),
        steps: stepsStr.split('\n').map(s => s.trim()).filter(Boolean)
      });
    }
  };
  
  const getTitle = () => {
    if (!config) return '';
    if (config.type === 'emotion') {
      return config.mode === 'add' ? 'Describe a New Feeling' : `Editing '${emotionData.name}'`;
    }
    return config.mode === 'add' ? 'Create a New Strategy' : `Editing '${strategyData.title}'`;
  };

  const renderEmotionForm = () => (
    <>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)]">Name</label>
          <input type="text" id="name" value={emotionData.name} onChange={e => setEmotionData({...emotionData, name: e.target.value})} className="mt-1 block w-full px-3 py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-md shadow-sm focus:outline-none focus:ring-[var(--accent-ring)] focus:border-[var(--accent-ring)]" required />
        </div>
        <div className="flex gap-4">
            <div className="flex-1">
                <label htmlFor="emoji" className="block text-sm font-medium text-[var(--text-secondary)]">Icon (Emoji)</label>
                <input type="text" id="emoji" value={emotionData.emoji} onChange={e => setEmotionData({...emotionData, emoji: e.target.value})} className="mt-1 block w-full px-3 py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-md shadow-sm focus:outline-none focus:ring-[var(--accent-ring)] focus:border-[var(--accent-ring)]" required />
            </div>
            <div>
                <label htmlFor="color" className="block text-sm font-medium text-[var(--text-secondary)]">Color</label>
                <select id="color" value={emotionData.color} onChange={e => setEmotionData({...emotionData, color: e.target.value})} className="mt-1 block w-full pl-3 pr-10 py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-md shadow-sm focus:outline-none focus:ring-[var(--accent-ring)] focus:border-[var(--accent-ring)]">
                    {emotionColors.map(color => <option key={color} value={color} className="capitalize">{color}</option>)}
                </select>
            </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[var(--text-secondary)]">Description</label>
          <textarea id="description" value={emotionData.description} onChange={e => setEmotionData({...emotionData, description: e.target.value})} rows={2} className="mt-1 block w-full px-3 py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-md shadow-sm focus:outline-none focus:ring-[var(--accent-ring)] focus:border-[var(--accent-ring)]"></textarea>
        </div>
        <div>
          <label htmlFor="relatedWords" className="block text-sm font-medium text-[var(--text-secondary)]">Related Words (comma-separated)</label>
          <input type="text" id="relatedWords" value={relatedWordsStr} onChange={e => setRelatedWordsStr(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-md shadow-sm focus:outline-none focus:ring-[var(--accent-ring)] focus:border-[var(--accent-ring)]" />
        </div>

        {config?.type === 'emotion' && config.mode === 'add' && (
          <div className="pt-2">
            <label className="block text-sm font-medium text-[var(--text-secondary)]">Placement</label>
            <div className="mt-2 space-y-2 rounded-md bg-[var(--bg-secondary)] p-3 border border-[var(--border-primary)]">
              {categories.map(cat => (
                <div key={cat.id} className="flex items-center">
                  <input id={`cat-${cat.id}`} name="placement" type="radio" checked={placementType === 'existing' && selectedCategoryId === cat.id} onChange={() => { setPlacementType('existing'); setSelectedCategoryId(cat.id); }} className="h-4 w-4 text-[var(--accent-primary)] border-[var(--border-secondary)] focus:ring-[var(--accent-ring)]" />
                  <label htmlFor={`cat-${cat.id}`} className="ml-3 block text-sm text-[var(--text-primary)]">Add to "{cat.name}"</label>
                </div>
              ))}
              <div className="flex items-center">
                <input id="cat-new" name="placement" type="radio" checked={placementType === 'new'} onChange={() => setPlacementType('new')} className="h-4 w-4 text-[var(--accent-primary)] border-[var(--border-secondary)] focus:ring-[var(--accent-ring)]" />
                <label htmlFor="cat-new" className="ml-3 block text-sm text-[var(--text-primary)]">Create new category</label>
              </div>
              {placementType === 'new' && (
                <div className="pl-7 pt-1">
                  <input type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} placeholder="New category name..." className="block w-full px-3 py-1.5 text-sm bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-md shadow-sm focus:outline-none focus:ring-[var(--accent-ring)] focus:border-[var(--accent-ring)]" required />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );

  const renderStrategyForm = () => (
    <>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[var(--text-secondary)]">Title</label>
          <input type="text" id="title" value={strategyData.title} onChange={e => setStrategyData({...strategyData, title: e.target.value})} className="mt-1 block w-full px-3 py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-md shadow-sm focus:outline-none focus:ring-[var(--accent-ring)] focus:border-[var(--accent-ring)]" required />
        </div>
        <div>
          <label htmlFor="steps" className="block text-sm font-medium text-[var(--text-secondary)]">Steps (one per line)</label>
          <textarea id="steps" value={stepsStr} onChange={e => setStepsStr(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-md shadow-sm focus:outline-none focus:ring-[var(--accent-ring)] focus:border-[var(--accent-ring)]"></textarea>
        </div>
      </div>
    </>
  );

  return (
    <div 
        className="fixed inset-0 bg-black/40 dark:bg-black/60 z-50 flex items-center justify-center p-0 sm:p-4 transition-opacity"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-[var(--bg-tertiary)] w-full h-full sm:h-auto sm:max-w-md sm:rounded-lg sm:shadow-xl flex flex-col transition-transform transform scale-100"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-[var(--border-primary)] flex-shrink-0">
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">{getTitle()}</h3>
            <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-[var(--bg-hover)]" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </header>
        <form onSubmit={handleSave} className="flex-grow flex flex-col">
          <main className="p-6 overflow-y-auto">
            {config.type === 'emotion' ? renderEmotionForm() : renderStrategyForm()}
          </main>
          <footer className="p-4 bg-[var(--bg-secondary)]/50 border-t border-[var(--border-primary)] flex justify-end space-x-3 flex-shrink-0">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-[var(--text-primary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] border border-[var(--border-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-ring)]">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-[var(--text-on-accent)] bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-ring)]">
              Save
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const GraphIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
);

const JournalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
);
  
const BreatheIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 12h2.5c1.5 0 2.5-1.5 2.5-3V6.5" />
        <path d="M8 17.5v-5c0-1.5 1-3 2.5-3H16" />
        <path d="M16 8.5V6" />
        <path d="M21 12h-2.5c-1.5 0-2.5 1.5-2.5 3v2.5" />
    </svg>
);

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
);

type View = 'firstAid' | 'selector' | 'strategy' | 'quickStrategy' | 'history' | 'graph' | 'breathe' | 'journal';

const App: React.FC = () => {
  const [emotionCategories, setEmotionCategories] = useState<EmotionCategory[]>(() => {
    try {
      const saved = localStorage.getItem('emotionCategories');
      return saved ? JSON.parse(saved) : EMOTION_CATEGORIES;
    } catch (error) {
      console.error("Failed to parse emotion categories from localStorage", error);
      return EMOTION_CATEGORIES;
    }
  });
  const [history, setHistory] = useState<EmotionLog[]>(() => {
    try {
      const savedHistory = localStorage.getItem('emotionHistory');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error("Failed to parse history from localStorage", error);
      return [];
    }
  });
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    try {
        const saved = localStorage.getItem('journalEntries');
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error("Failed to parse journal entries from localStorage", error);
        return [];
    }
  });
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [view, setView] = useState<View>('firstAid');
  const [quickStrategyType, setQuickStrategyType] = useState<'overwhelmed' | 'down' | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const { themeId, setThemeId } = useTheme();
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const [isPhilosophyModalOpen, setIsPhilosophyModalOpen] = useState(false);


  useEffect(() => {
    localStorage.setItem('emotionCategories', JSON.stringify(emotionCategories));
  }, [emotionCategories]);

  useEffect(() => {
    localStorage.setItem('emotionHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    if (['strategy', 'history', 'graph', 'breathe', 'journal', 'quickStrategy'].includes(view)) {
      document.body.classList.add('strategy-view-active');
    } else {
      document.body.classList.remove('strategy-view-active');
    }
  }, [view]);

  const handleSelectEmotion = useCallback((emotion: Emotion) => {
    const newLog: EmotionLog = {
      logId: `log-${Date.now()}`,
      emotionId: emotion.id,
      emotionName: emotion.name,
      emotionEmoji: emotion.emoji,
      emotionColor: emotion.color,
      timestamp: Date.now(),
    };
    setHistory(prev => [newLog, ...prev]);

    const allEmotions = emotionCategories.flatMap(c => c.emotions);
    const currentEmotionState = allEmotions.find(e => e.id === emotion.id) || emotion;
    setSelectedEmotion(currentEmotionState);
    setView('strategy');
  }, [emotionCategories]);

  const handleGoBackToSelector = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      setSelectedEmotion(null);
      setIsLeaving(false);
      setView('selector');
    }, 300);
  }, []);
  
  const handleGoBackToFirstAid = useCallback(() => {
     setView('firstAid');
  }, []);
  
  const allEmotions = useMemo(() => emotionCategories.flatMap(c => c.emotions), [emotionCategories]);

  const overwhelmedStrategies = useMemo(() => {
      const anger = allEmotions.find(e => e.name === 'Anger');
      const fear = allEmotions.find(e => e.name === 'Fear');
      const anticipation = allEmotions.find(e => e.name === 'Anticipation');
      let strategies: (Strategy & { originEmotionId: string; originCategory: StrategyCategory | 'helpingOthers' })[] = [];
      if (anger) strategies.push(...anger.strategies.immediate.map(s => ({ ...s, originEmotionId: anger.id, originCategory: 'immediate' as const })));
      if (fear) strategies.push(...fear.strategies.immediate.map(s => ({ ...s, originEmotionId: fear.id, originCategory: 'immediate' as const })));
      if (anticipation) strategies.push(...anticipation.strategies.immediate.map(s => ({ ...s, originEmotionId: anticipation.id, originCategory: 'immediate' as const })));
      
      const uniqueStrategies = strategies.reduce<(Strategy & { originEmotionId: string; originCategory: StrategyCategory | 'helpingOthers' })[]>((acc, current) => {
          if (!acc.some(item => item.title === current.title)) {
              acc.push(current);
          }
          return acc;
      }, []);
      return uniqueStrategies;
  }, [allEmotions]);

  const downStrategies = useMemo(() => {
      const sadness = allEmotions.find(e => e.name === 'Sadness');
      return sadness ? sadness.strategies.immediate.map(s => ({ ...s, originEmotionId: sadness.id, originCategory: 'immediate' as const })) : [];
  }, [allEmotions]);

  const handleReorderEmotions = useCallback((categoryId: string, reorderedEmotions: Emotion[]) => {
    setEmotionCategories(prev => prev.map(cat => 
        cat.id === categoryId 
            ? { ...cat, emotions: reorderedEmotions }
            : cat
    ));
  }, []);

  const handleReorderStrategies = useCallback((emotionId: string, newStrategies: Emotion['strategies']) => {
    const newCategories = emotionCategories.map(cat => ({
        ...cat,
        emotions: cat.emotions.map(e =>
            e.id === emotionId
                ? { ...e, strategies: newStrategies }
                : e
        )
    }));
    setEmotionCategories(newCategories);
    
    if (selectedEmotion?.id === emotionId) {
        const updatedEmotion = newCategories.flatMap(c => c.emotions).find(e => e.id === emotionId);
        setSelectedEmotion(updatedEmotion || null);
    }
  }, [emotionCategories, selectedEmotion]);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to delete your entire emotion history? This cannot be undone.')) {
        setHistory([]);
    }
  };

  const handleSaveJournalEntry = (entry: JournalEntry) => {
    setJournalEntries(prev => {
        const index = prev.findIndex(e => e.id === entry.id);
        if (index > -1) {
            const newEntries = [...prev];
            newEntries[index] = entry;
            return newEntries;
        }
        return [entry, ...prev];
    });
  };

  const handleDeleteJournalEntry = (entryId: string) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
        setJournalEntries(prev => prev.filter(e => e.id !== entryId));
    }
  };


  // --- CRUD Handlers ---
  const handleEditStrategy = (emotionId: string, category: StrategyCategory | 'helpingOthers', strategy: Strategy) => {
    setModalConfig({ type: 'strategy', mode: 'edit', emotionId, category, strategy });
  };
  
  const handleDeleteEmotion = (emotionId: string) => {
    if (window.confirm('Are you sure you want to delete this emotion and all its strategies? This cannot be undone.')) {
      setEmotionCategories(prev => prev
        .map(cat => ({
            ...cat,
            emotions: cat.emotions.filter(e => e.id !== emotionId),
        }))
        .filter(cat => cat.emotions.length > 0 || ['cat-basic', 'cat-complex'].includes(cat.id))
      );
    }
  };

  const handleDeleteStrategy = (emotionId: string, category: StrategyCategory | 'helpingOthers', strategyId: string) => {
     if (window.confirm('Are you sure you want to delete this strategy?')) {
        const newEmotionCategories = emotionCategories.map(cat => ({
            ...cat,
            emotions: cat.emotions.map(e => {
                if (e.id === emotionId) {
                    const updatedEmotion = { ...e };
                    if (category === 'helpingOthers') {
                        updatedEmotion.helpingOthers = updatedEmotion.helpingOthers.filter(s => s.id !== strategyId);
                    } else {
                        updatedEmotion.strategies = {
                            ...updatedEmotion.strategies,
                            [category]: updatedEmotion.strategies[category].filter(s => s.id !== strategyId)
                        };
                    }
                    return updatedEmotion;
                }
                return e;
            })
        }));
        setEmotionCategories(newEmotionCategories);
        if (selectedEmotion?.id === emotionId) {
            const updatedEmotion = newEmotionCategories.flatMap(c => c.emotions).find(e => e.id === emotionId);
            setSelectedEmotion(updatedEmotion || null);
        }
    }
  };
  
  const handleSave = (data: Emotion | Strategy, placement?: PlacementInfo) => {
    if (!modalConfig) return;

    if (modalConfig.type === 'emotion') {
      const emotionData = data as Emotion;
      if (modalConfig.mode === 'add') {
        const newEmotion = { ...emotionData, id: `emotion-${Date.now()}` };
        if (placement?.type === 'existing') {
          setEmotionCategories(prev => prev.map(cat => 
            cat.id === placement.categoryId
              ? { ...cat, emotions: [...cat.emotions, newEmotion] }
              : cat
          ));
        } else if (placement?.type === 'new' && placement.categoryName) {
          const newCategory: EmotionCategory = {
            id: `cat-${Date.now()}`,
            name: placement.categoryName,
            isCollapsible: true, // New categories are collapsible by default
            emotions: [newEmotion]
          };
          setEmotionCategories(prev => [...prev, newCategory]);
        }
      } else { // mode === 'edit'
        setEmotionCategories(prev => prev.map(cat => ({
          ...cat,
          emotions: cat.emotions.map(e => e.id === emotionData.id ? emotionData : e)
        })));
      }
    } else if (modalConfig.type === 'strategy') {
      const strategyData = data as Strategy;
      const { emotionId, category } = modalConfig;
      
      const newEmotionCategories = emotionCategories.map(cat => ({
        ...cat,
        emotions: cat.emotions.map(e => {
          if (e.id === emotionId) {
            const updatedEmotion = JSON.parse(JSON.stringify(e)); // Deep copy
            const list = category === 'helpingOthers' ? updatedEmotion.helpingOthers : updatedEmotion.strategies[category];
            
            if (modalConfig.mode === 'add') {
              list.push({ ...strategyData, id: `strategy-${Date.now()}` });
            } else {
              const index = list.findIndex((s: Strategy) => s.id === strategyData.id);
              if (index !== -1) list[index] = strategyData;
            }
            return updatedEmotion;
          }
          return e;
        })
      }));
      setEmotionCategories(newEmotionCategories);
      if (selectedEmotion?.id === emotionId) {
          const updatedEmotion = newEmotionCategories.flatMap(c => c.emotions).find(e => e.id === emotionId);
          setSelectedEmotion(updatedEmotion || null);
      }
    }
    setModalConfig(null);
  };
  
  const streak = useMemo(() => {
    if (!history || history.length === 0) return 0;

    const logDates = history.map(log => log.timestamp);
    const uniqueDateStrings = [...new Set(logDates.map(ts => new Date(ts).toDateString()))];

    const uniqueDays = uniqueDateStrings
      .map(dateStr => new Date(dateStr as string).getTime())
      .sort((a, b) => b - a);

    if (uniqueDays.length === 0) return 0;
    
    const today = new Date();
    const todayTime = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const yesterdayTime = todayTime - 86400000;

    const lastLogTime = uniqueDays[0];
    
    if (lastLogTime < yesterdayTime) return 0;

    let currentStreak = 1;
    for (let i = 0; i < uniqueDays.length - 1; i++) {
        const day = uniqueDays[i];
        const prevDay = uniqueDays[i+1];
        
        const expectedPrevDayTime = day - 86400000;

        if (prevDay === expectedPrevDayTime) {
            currentStreak++;
        } else {
            break;
        }
    }
    
    return currentStreak;
  }, [history]);

  const renderContent = () => {
    switch (view) {
      case 'firstAid':
        return <FirstAidView 
          onSelect={(type) => { setQuickStrategyType(type); setView('quickStrategy'); }} 
          onBreathe={() => setView('breathe')} 
          onBrowseAll={() => setView('selector')} 
        />;
      case 'selector':
        return <EmotionSelector 
          categories={emotionCategories} 
          onSelectEmotion={handleSelectEmotion} 
          onReorder={handleReorderEmotions}
          onEditClick={(emotion) => setModalConfig({ type: 'emotion', mode: 'edit', emotion })}
          onDeleteClick={handleDeleteEmotion}
          onAddEmotionClick={() => setModalConfig({ type: 'emotion', mode: 'add' })}
          onBack={handleGoBackToFirstAid}
        />;
      case 'strategy':
        return selectedEmotion && <StrategyDisplay 
          key={selectedEmotion.id}
          emotion={selectedEmotion} 
          onBack={handleGoBackToSelector} 
          onReorderStrategies={handleReorderStrategies}
          onAddStrategyClick={(category) => setModalConfig({ type: 'strategy', mode: 'add', emotionId: selectedEmotion.id, category })}
          onEditStrategyClick={(category, strategy) => setModalConfig({ type: 'strategy', mode: 'edit', emotionId: selectedEmotion.id, category, strategy })}
          onDeleteStrategyClick={handleDeleteStrategy}
        />;
      case 'quickStrategy':
        return quickStrategyType === 'overwhelmed' ? 
          <SimpleStrategyView title="To Help You Feel Grounded" emotionColor="purple" emotionName="feeling overwhelmed" strategies={overwhelmedStrategies} onBack={handleGoBackToFirstAid} onFindMore={() => setView('selector')} onEditStrategy={handleEditStrategy} onDeleteStrategy={handleDeleteStrategy} /> :
          <SimpleStrategyView title="A Few Gentle Things to Try" emotionColor="blue" emotionName="feeling down" strategies={downStrategies} onBack={handleGoBackToFirstAid} onFindMore={() => setView('selector')} onEditStrategy={handleEditStrategy} onDeleteStrategy={handleDeleteStrategy} />;
      case 'history':
        return <HistoryView history={history} onBack={() => setView('firstAid')} onClearHistory={handleClearHistory} />;
      case 'graph':
        return <GraphView history={history} onBack={() => setView('firstAid')} />;
      case 'breathe':
        return <BreatheView onBack={() => setView('firstAid')} />;
      case 'journal':
        return <JournalView entries={journalEntries} onSave={handleSaveJournalEntry} onDelete={handleDeleteJournalEntry} onBack={() => setView('firstAid')} />;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="min-h-screen w-full text-[var(--text-primary)] font-sans flex flex-col">
        <header className="w-full bg-[var(--bg-secondary)] shadow-sm sticky top-0 z-10 p-4 border-b border-[var(--border-primary)]">
          <div className="max-w-5xl mx-auto flex justify-between items-center h-10">
            <div className="flex-shrink-0 flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => setIsPhilosophyModalOpen(true)}
                className="p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)] focus:ring-[var(--accent-ring)] transition-colors"
                aria-label="About this app"
              >
                <InfoIcon />
              </button>
              <ThemePicker selectedThemeId={themeId} onThemeChange={setThemeId} />
              <div className={`flex items-center space-x-1 font-medium ${streak > 0 ? 'text-orange-500' : 'text-slate-400'}`} title={`${streak}-day streak`}>
                  <span className={`text-xl ${streak > 0 ? '' : 'grayscale'}`}>🔥</span>
                  <span className="text-sm">{streak}</span>
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center space-x-1 sm:space-x-2">
               <button
                onClick={() => setView('journal')}
                className="p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)] focus:ring-[var(--accent-ring)] transition-colors"
                aria-label="View journal"
              >
                <JournalIcon />
              </button>
              <button
                onClick={() => setView('graph')}
                className="p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)] focus:ring-[var(--accent-ring)] transition-colors"
                aria-label="View emotion trends"
              >
                <GraphIcon />
              </button>
              <button
                onClick={() => setView('history')}
                className="p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)] focus:ring-[var(--accent-ring)] transition-colors"
                aria-label="View emotion history"
              >
                <ClockIcon />
              </button>
            </div>
          </div>
        </header>
        
        <main className="w-full max-w-5xl mx-auto flex-grow p-4 sm:p-6 md:p-8">
            {renderContent()}
        </main>
      </div>

      {view === 'selector' && (
        <button 
            onClick={() => setView('breathe')}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--text-on-accent)] rounded-full px-5 py-3 shadow-lg z-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] focus:ring-[var(--accent-ring)] transition-transform transform active:scale-95 flex items-center space-x-2"
            aria-label="Breathing exercise"
        >
            <BreatheIcon className="w-6 h-6" />
            <span className="font-semibold">Breathe</span>
        </button>
      )}
      
      <EditorModal config={modalConfig} onSave={handleSave} onClose={() => setModalConfig(null)} categories={emotionCategories} />
      {isPhilosophyModalOpen && <PhilosophyModal onClose={() => setIsPhilosophyModalOpen(false)} />}
    </>
  );
};

export default App;
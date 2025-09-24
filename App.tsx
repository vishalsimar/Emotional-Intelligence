import React, { useState, useCallback, useEffect, FormEvent } from 'react';
import EmotionSelector from './components/EmotionSelector';
import StrategyDisplay, { StrategyCategory } from './components/StrategyDisplay';
import { Emotion, Strategy } from './types';
import { EMOTIONS } from './constants';

// Inlined EditorModal to avoid creating a new file
export type ModalConfig = 
  | { type: 'emotion'; mode: 'add' }
  | { type: 'emotion'; mode: 'edit'; emotion: Emotion }
  | { type: 'strategy'; mode: 'add'; emotionId: string; category: StrategyCategory | 'helpingOthers' }
  | { type: 'strategy'; mode: 'edit'; emotionId: string; category: StrategyCategory | 'helpingOthers'; strategy: Strategy };

interface EditorModalProps {
  config: ModalConfig | null;
  onSave: (data: Emotion | Strategy) => void;
  onClose: () => void;
}

const emotionColors = ['red', 'blue', 'purple', 'yellow', 'green', 'orange', 'slate', 'teal', 'indigo', 'stone', 'lime', 'rose', 'cyan', 'sky'];

const EditorModal: React.FC<EditorModalProps> = ({ config, onSave, onClose }) => {
  const [emotionData, setEmotionData] = useState<Omit<Emotion, 'strategies' | 'helpingOthers'>>({ id: '', name: '', emoji: '', color: 'blue', description: '', relatedWords: [] });
  const [strategyData, setStrategyData] = useState<Omit<Strategy, 'id'>>({ title: '', steps: [] });
  const [relatedWordsStr, setRelatedWordsStr] = useState('');
  const [stepsStr, setStepsStr] = useState('');

  useEffect(() => {
    if (config?.type === 'emotion' && config.mode === 'edit') {
      const { strategies, helpingOthers, ...data } = config.emotion;
      setEmotionData(data);
      setRelatedWordsStr(data.relatedWords.join(', '));
    } else if (config?.type === 'emotion' && config.mode === 'add') {
      setEmotionData({ id: '', name: '', emoji: '⚪️', color: 'blue', description: '', relatedWords: [] });
      setRelatedWordsStr('');
    } else if (config?.type === 'strategy' && config.mode === 'edit') {
      setStrategyData(config.strategy);
      setStepsStr(config.strategy.steps.join('\n'));
    } else if (config?.type === 'strategy' && config.mode === 'add') {
      setStrategyData({ title: '', steps: [] });
      setStepsStr('');
    }
  }, [config]);

  if (!config) return null;

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (config.type === 'emotion') {
      onSave({ 
        ...emotionData,
        relatedWords: relatedWordsStr.split(',').map(s => s.trim()).filter(Boolean),
        // Keep existing strategies when editing
        strategies: (config.mode === 'edit' ? config.emotion.strategies : { immediate: [], shortTerm: [], longTerm: [] }),
        helpingOthers: (config.mode === 'edit' ? config.emotion.helpingOthers : []),
      });
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
      return config.mode === 'add' ? 'Add New Emotion' : 'Edit Emotion';
    }
    return config.mode === 'add' ? 'Add New Strategy' : 'Edit Strategy';
  }

  const renderEmotionForm = () => (
    <>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Name</label>
          <input type="text" id="name" value={emotionData.name} onChange={e => setEmotionData({...emotionData, name: e.target.value})} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" required />
        </div>
        <div className="flex gap-4">
            <div className="flex-1">
                <label htmlFor="emoji" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Icon (Emoji)</label>
                <input type="text" id="emoji" value={emotionData.emoji} onChange={e => setEmotionData({...emotionData, emoji: e.target.value})} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" required />
            </div>
            <div>
                <label htmlFor="color" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Color</label>
                <select id="color" value={emotionData.color} onChange={e => setEmotionData({...emotionData, color: e.target.value})} className="mt-1 block w-full pl-3 pr-10 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500">
                    {emotionColors.map(color => <option key={color} value={color} className="capitalize">{color}</option>)}
                </select>
            </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Description</label>
          <textarea id="description" value={emotionData.description} onChange={e => setEmotionData({...emotionData, description: e.target.value})} rows={2} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"></textarea>
        </div>
        <div>
          <label htmlFor="relatedWords" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Related Words (comma-separated)</label>
          <input type="text" id="relatedWords" value={relatedWordsStr} onChange={e => setRelatedWordsStr(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
        </div>
      </div>
    </>
  );

  const renderStrategyForm = () => (
    <>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Title</label>
          <input type="text" id="title" value={strategyData.title} onChange={e => setStrategyData({...strategyData, title: e.target.value})} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" required />
        </div>
        <div>
          <label htmlFor="steps" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Steps (one per line)</label>
          <textarea id="steps" value={stepsStr} onChange={e => setStepsStr(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"></textarea>
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
        className="bg-white dark:bg-slate-900 w-full h-full sm:h-auto sm:max-w-md sm:rounded-lg sm:shadow-xl flex flex-col transition-transform transform scale-100"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{getTitle()}</h3>
            <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </header>
        <form onSubmit={handleSave} className="flex-grow flex flex-col">
          <main className="p-6 overflow-y-auto">
            {config.type === 'emotion' ? renderEmotionForm() : renderStrategyForm()}
          </main>
          <footer className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 flex justify-end space-x-3 flex-shrink-0">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Save
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};


const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);


const App: React.FC = () => {
  const [emotions, setEmotions] = useState<Emotion[]>(() => {
    try {
      const savedEmotions = localStorage.getItem('emotions');
      return savedEmotions ? JSON.parse(savedEmotions) : EMOTIONS;
    } catch (error) {
      console.error("Failed to parse emotions from localStorage", error);
      return EMOTIONS;
    }
  });
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            return 'dark';
        }
    }
    return 'light';
  });
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);

  useEffect(() => {
    localStorage.setItem('emotions', JSON.stringify(emotions));
  }, [emotions]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (selectedEmotion) {
      document.body.classList.add('strategy-view-active');
    } else {
      document.body.classList.remove('strategy-view-active');
    }
  }, [selectedEmotion]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectEmotion = useCallback((emotion: Emotion) => {
    const currentEmotionState = emotions.find(e => e.id === emotion.id) || emotion;
    setSelectedEmotion(currentEmotionState);
  }, [emotions]);

  const handleGoBack = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      setSelectedEmotion(null);
      setIsLeaving(false);
    }, 300);
  }, []);
  
  const handleReorderEmotions = useCallback((reorderedEmotions: Emotion[]) => {
    setEmotions(reorderedEmotions);
  }, []);

  const handleReorderStrategies = useCallback((emotionId: string, newStrategies: Emotion['strategies']) => {
    const newEmotions = emotions.map(e => 
      e.id === emotionId
        ? { ...e, strategies: newStrategies }
        : e
    );
    setEmotions(newEmotions);
    
    if (selectedEmotion?.id === emotionId) {
        setSelectedEmotion(prev => prev ? { ...prev, strategies: newStrategies } : null);
    }
  }, [emotions, selectedEmotion]);

  // --- CRUD Handlers ---
  const handleDeleteEmotion = (emotionId: string) => {
    if (window.confirm('Are you sure you want to delete this emotion and all its strategies? This cannot be undone.')) {
      setEmotions(prev => prev.filter(e => e.id !== emotionId));
    }
  };

  const handleDeleteStrategy = (emotionId: string, category: StrategyCategory | 'helpingOthers', strategyId: string) => {
     if (window.confirm('Are you sure you want to delete this strategy?')) {
        const newEmotions = emotions.map(e => {
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
        });
        setEmotions(newEmotions);
        if (selectedEmotion?.id === emotionId) {
            setSelectedEmotion(newEmotions.find(e => e.id === emotionId) || null);
        }
    }
  };
  
  const handleSave = (data: Emotion | Strategy) => {
    if (!modalConfig) return;

    if (modalConfig.type === 'emotion') {
      const emotionData = data as Emotion;
      if (modalConfig.mode === 'add') {
        setEmotions(prev => [...prev, { ...emotionData, id: `emotion-${Date.now()}` }]);
      } else {
        setEmotions(prev => prev.map(e => e.id === emotionData.id ? emotionData : e));
      }
    } else if (modalConfig.type === 'strategy') {
      const strategyData = data as Strategy;
      const { emotionId, category } = modalConfig;
      
      const newEmotions = emotions.map(e => {
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
      });
      setEmotions(newEmotions);
      if (selectedEmotion?.id === emotionId) {
          setSelectedEmotion(newEmotions.find(e => e.id === emotionId) || null);
      }
    }
    setModalConfig(null);
  };


  return (
    <>
      <div className="min-h-screen w-full text-slate-900 dark:text-white font-sans flex flex-col">
        <header className="w-full bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-10 p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div className="text-left flex items-center gap-3">
              <img src="/icon.svg" className="w-8 h-8" alt="App Logo" />
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Emotional Intelligence
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-xs hidden sm:block">An emotional management toolkit.</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="flex-shrink-0 p-2 rounded-full text-slate-500 dark:text-yellow-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-purple-500 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
        </header>
        
        <main className="w-full max-w-5xl mx-auto flex-grow p-4 sm:p-6 md:p-8">
          <div className="relative w-full">
            <div className={`transition-opacity duration-300 ease-in-out ${selectedEmotion ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <EmotionSelector 
                emotions={emotions} 
                onSelectEmotion={handleSelectEmotion} 
                onReorder={handleReorderEmotions}
                onEditClick={(emotion) => setModalConfig({ type: 'emotion', mode: 'edit', emotion })}
                onDeleteClick={handleDeleteEmotion}
              />
            </div>
            <div className={`absolute top-0 left-0 w-full transition-all duration-300 ease-in-out ${selectedEmotion && !isLeaving ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              {selectedEmotion && (
                <StrategyDisplay 
                  key={selectedEmotion.id} // Re-mount when emotion changes to reset animations
                  emotion={selectedEmotion} 
                  onBack={handleGoBack} 
                  onReorderStrategies={handleReorderStrategies}
                  onAddStrategyClick={(category) => setModalConfig({ type: 'strategy', mode: 'add', emotionId: selectedEmotion.id, category })}
                  onEditStrategyClick={(category, strategy) => setModalConfig({ type: 'strategy', mode: 'edit', emotionId: selectedEmotion.id, category, strategy })}
                  onDeleteStrategyClick={handleDeleteStrategy}
                />
              )}
            </div>
          </div>
        </main>
      </div>

      {!selectedEmotion && (
        <button 
            onClick={() => setModalConfig({ type: 'emotion', mode: 'add' })}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg z-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-950 focus:ring-purple-500 transition-transform transform active:scale-95"
            aria-label="Add new emotion"
        >
            <PlusIcon className="w-6 h-6" />
        </button>
      )}

      <EditorModal config={modalConfig} onSave={handleSave} onClose={() => setModalConfig(null)} />
    </>
  );
};

export default App;

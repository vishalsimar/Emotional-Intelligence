import React, { useState, useEffect } from 'react';
import { Emotion, Strategy } from '../types';
import StrategyCard from './StrategyCard';

interface StrategyDisplayProps {
  emotion: Emotion;
  onBack: () => void;
  onReorderStrategies: (emotionId: string, strategies: Emotion['strategies']) => void;
  onAddStrategyClick: (category: StrategyCategory | 'helpingOthers' | 'relationshipRepair') => void;
  onEditStrategyClick: (category: StrategyCategory | 'helpingOthers' | 'relationshipRepair', strategy: Strategy) => void;
  onDeleteStrategyClick: (emotionId: string, category: StrategyCategory | 'helpingOthers' | 'relationshipRepair', strategyId: string) => void;
}

const PlusIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export type StrategyCategory = 'immediate' | 'shortTerm' | 'longTerm';

const getTabLabels = (emotionName: string) => {
    switch (emotionName.toLowerCase()) {
        case 'anger':
            return { me: "I'm Angry", others: "Someone is Angry", repair: "I Angered Someone" };
        case 'sadness':
            return { me: "I'm Sad", others: "Someone is Sad", repair: "I Caused Sadness" };
        case 'fear':
            return { me: "I'm Scared", others: "Someone is Scared", repair: "I Scared Someone" };
        case 'happiness':
            return { me: "I'm Happy", others: "Celebrating with Someone", repair: "I Diminished Their Joy" };
        case 'disgust':
            return { me: "I'm Disgusted", others: "Someone is Disgusted", repair: "I Caused Disgust" };
        case 'surprise':
            return { me: "I'm Surprised", others: "Someone is Surprised", repair: "I Caused a Bad Surprise" };
        case 'anticipation':
            return { me: "I'm Feeling Anticipation", others: "Someone is Anticipating", repair: "I Caused Anxiety" };
        case 'trust':
            return { me: "Building Self-Trust", others: "Earning Someone's Trust", repair: "I Broke Their Trust" };
        default:
            return { me: `Managing ${emotionName}`, others: `Helping with ${emotionName}`, repair: `Relationship Repair` };
    }
};

const StrategyDisplay: React.FC<StrategyDisplayProps> = ({ emotion, onBack, onReorderStrategies, onAddStrategyClick, onEditStrategyClick, onDeleteStrategyClick }) => {
  const { id: emotionId, name, emoji, color, helpingOthers, relationshipRepair } = emotion;
  const strategies = emotion.strategies || { immediate: [], shortTerm: [], longTerm: [] };
  const headingColorClass = `text-[var(--color-${color}-text)]`;

  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'me' | 'others' | 'repair'>('me');
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean[]>>({});
  
  const tabLabels = getTabLabels(name);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    const allStrategies = [
      ...strategies.immediate,
      ...strategies.shortTerm,
      ...strategies.longTerm,
      ...emotion.helpingOthers,
      ...(emotion.relationshipRepair || []),
    ];
    const initialCheckedState: Record<string, boolean[]> = {};
    allStrategies.forEach(strategy => {
      initialCheckedState[strategy.id] = Array(strategy.steps.length).fill(false);
    });
    setCheckedSteps(initialCheckedState);
    return () => clearTimeout(timer);
  }, [emotion]);
  
  const handleToggleStep = (strategyId: string, stepIndex: number) => {
    setCheckedSteps(prev => {
      const newSteps = [...(prev[strategyId] || [])];
      newSteps[stepIndex] = !newSteps[stepIndex];
      return { ...prev, [strategyId]: newSteps };
    });
  };

  const handleResetSteps = (strategyId: string) => {
    const strategy = [...strategies.immediate, ...strategies.shortTerm, ...strategies.longTerm, ...helpingOthers, ...(relationshipRepair || [])].find(s => s.id === strategyId);
    if (!strategy) return;

    setCheckedSteps(prev => ({
      ...prev,
      [strategyId]: Array(strategy.steps.length).fill(false)
    }));
  };
  
  const handleMoveStrategy = (category: StrategyCategory, index: number, direction: 'up' | 'down') => {
    const newStrategies = JSON.parse(JSON.stringify(strategies));
    const list = newStrategies[category];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= list.length) return;

    [list[index], list[newIndex]] = [list[newIndex], list[index]];
    
    onReorderStrategies(emotionId, newStrategies);
  };
  
  const STRATEGY_CATEGORIES_CONFIG: { category: StrategyCategory; title: string; icon: string }[] = [
    { category: "immediate", title: "In the Moment", icon: "⚡️" },
    { category: "shortTerm", title: "For Today", icon: "🗓️" },
    { category: "longTerm", title: "Building Resilience", icon: "🧠" },
  ];

  return (
    <div className="flex flex-col animate-fade-in w-full">
      <header className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="mr-2 p-2 rounded-full hover:bg-[var(--bg-hover)] transition-colors"
          aria-label="Go back to emotion selection"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
        </button>
        <div className="flex items-center">
            <span className="text-4xl mr-3" aria-hidden="true">{emoji}</span>
            <h2 className={`text-3xl sm:text-4xl font-bold ${headingColorClass} font-serif`}>
                Managing {name}
            </h2>
        </div>
      </header>

      <div className="border-b border-[var(--border-primary)] mb-8">
        <div className="flex items-center space-x-2">
            <button 
                onClick={() => setActiveTab('me')}
                className={`px-4 py-3 text-sm sm:text-base font-semibold transition-all duration-200 ease-out-quad focus:outline-none relative transform active:scale-95
                ${activeTab === 'me' ? `text-[var(--accent-primary)]` : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                aria-pressed={activeTab === 'me'}
            >
                {tabLabels.me}
                {activeTab === 'me' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--accent-primary)]"></span>}
            </button>
            <button 
                onClick={() => setActiveTab('others')}
                className={`px-4 py-3 text-sm sm:text-base font-semibold transition-all duration-200 ease-out-quad focus:outline-none relative transform active:scale-95
                 ${activeTab === 'others' ? `text-[var(--accent-primary)]` : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                aria-pressed={activeTab === 'others'}
            >
                {tabLabels.others}
                {activeTab === 'others' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--accent-primary)]"></span>}
            </button>
             <button 
                onClick={() => setActiveTab('repair')}
                className={`px-4 py-3 text-sm sm:text-base font-semibold transition-all duration-200 ease-out-quad focus:outline-none relative transform active:scale-95
                 ${activeTab === 'repair' ? `text-[var(--accent-primary)]` : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                aria-pressed={activeTab === 'repair'}
            >
                {tabLabels.repair}
                {activeTab === 'repair' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--accent-primary)]"></span>}
            </button>
        </div>
      </div>

      {activeTab === 'me' && (
        <div className="grid gap-8 max-w-2xl mx-auto w-full animate-fade-in-content">
          {STRATEGY_CATEGORIES_CONFIG.map(({ category, title, icon }) => {
            const categoryStrategies = strategies[category];
            
            return (
              <div key={category}>
                <div 
                  className="w-full flex justify-between items-center p-3 mb-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]"
                >
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]/80 flex items-center">
                    <span className="mr-2">{icon}</span> {title}
                  </h3>
                   <span className="ml-2 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-xs font-semibold px-2 py-0.5 rounded-full">{categoryStrategies.length}</span>
                </div>
                <div 
                  id={`section-${category}`}
                  className="space-y-4"
                >
                    {categoryStrategies.map((strategy, index) => (
                        <StrategyCard
                          key={strategy.id}
                          strategy={strategy}
                          emotionName={name}
                          color={color}
                          visible={visible}
                          delay={index * 50}
                          showControls={true}
                          onMove={(direction) => handleMoveStrategy(category, index, direction)}
                          checkedState={checkedSteps[strategy.id] || []}
                          onToggleStep={(stepIndex) => handleToggleStep(strategy.id, stepIndex)}
                          onReset={() => handleResetSteps(strategy.id)}
                          onEdit={() => onEditStrategyClick(category, strategy)}
                          onDelete={() => onDeleteStrategyClick(emotionId, category, strategy.id)}
                        />
                    ))}
                    <button onClick={() => onAddStrategyClick(category)} className="w-full flex items-center justify-center p-3 rounded-lg border-2 border-dashed border-[var(--border-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:border-[var(--accent-ring)] transition-colors">
                        <PlusIcon className="w-5 h-5 mr-2" /> Add Strategy
                    </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'others' && (
        <div className="space-y-6 animate-fade-in-content max-w-2xl mx-auto w-full">
           <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]/80 mb-4 pb-2">How to Support Someone Experiencing {name}</h3>
           {helpingOthers.map((strategy, index) => (
             <StrategyCard
                key={strategy.id}
                strategy={strategy}
                emotionName={name}
                color={color}
                visible={visible}
                delay={index * 50}
                showControls={true}
                checkedState={checkedSteps[strategy.id] || []}
                onToggleStep={(stepIndex) => handleToggleStep(strategy.id, stepIndex)}
                onReset={() => handleResetSteps(strategy.id)}
                onEdit={() => onEditStrategyClick('helpingOthers', strategy)}
                onDelete={() => onDeleteStrategyClick(emotionId, 'helpingOthers', strategy.id)}
              />
           ))}
            <button onClick={() => onAddStrategyClick('helpingOthers')} className="w-full flex items-center justify-center p-3 rounded-lg border-2 border-dashed border-[var(--border-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:border-[var(--accent-ring)] transition-colors">
                <PlusIcon className="w-5 h-5 mr-2" /> Add Tip
            </button>
        </div>
      )}
      
      {activeTab === 'repair' && (
        <div className="space-y-6 animate-fade-in-content max-w-2xl mx-auto w-full">
           <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]/80 mb-4 pb-2">When You're the Cause of Their {name}</h3>
           {(relationshipRepair || []).map((strategy, index) => (
             <StrategyCard
                key={strategy.id}
                strategy={strategy}
                emotionName={name}
                color={color}
                visible={visible}
                delay={index * 50}
                showControls={true}
                checkedState={checkedSteps[strategy.id] || []}
                onToggleStep={(stepIndex) => handleToggleStep(strategy.id, stepIndex)}
                onReset={() => handleResetSteps(strategy.id)}
                onEdit={() => onEditStrategyClick('relationshipRepair', strategy)}
                onDelete={() => onDeleteStrategyClick(emotionId, 'relationshipRepair', strategy.id)}
              />
           ))}
            <button onClick={() => onAddStrategyClick('relationshipRepair')} className="w-full flex items-center justify-center p-3 rounded-lg border-2 border-dashed border-[var(--border-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:border-[var(--accent-ring)] transition-colors">
                <PlusIcon className="w-5 h-5 mr-2" /> Add Tip
            </button>
        </div>
      )}

    </div>
  );
};

const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
.animate-fade-in { animation: fade-in 0.3s ease-out-quad forwards; }
@keyframes fade-in-content { 0% { opacity: 0; } 100% { opacity: 1; } }
.animate-fade-in-content { animation: fade-in-content 0.4s ease-out-quad forwards; }
`;
document.head.appendChild(style);


export default StrategyDisplay;
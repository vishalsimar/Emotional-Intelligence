
import React, { useState, useEffect } from 'react';
import { Emotion, Strategy } from '../types';

interface StrategyDisplayProps {
  emotion: Emotion;
  onBack: () => void;
  onReorderStrategies: (emotionId: string, strategies: Emotion['strategies']) => void;
  onAddStrategyClick: (category: StrategyCategory | 'helpingOthers') => void;
  onEditStrategyClick: (category: StrategyCategory | 'helpingOthers', strategy: Strategy) => void;
  onDeleteStrategyClick: (emotionId: string, category: StrategyCategory | 'helpingOthers', strategyId: string) => void;
}

const EditIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
);
  
const TrashIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

const ResetIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 2v6h6"/>
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L3 12"/>
    </svg>
);

const ArrowUpIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
);

const ArrowDownIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
);

const StrategyCard: React.FC<{ 
    strategy: Strategy; 
    color: string; 
    visible: boolean; 
    delay: number;
    isDraggable?: boolean;
    onMove?: (direction: 'up' | 'down') => void;
    onEdit: () => void; 
    onDelete: () => void;
    checkedState: boolean[];
    onToggleStep: (stepIndex: number) => void;
    onReset: () => void;
}> = ({ strategy, color, visible, delay, isDraggable = true, onMove, onEdit, onDelete, checkedState, onToggleStep, onReset }) => {
    
    const progress = checkedState.length > 0 ? (checkedState.filter(Boolean).length / checkedState.length) * 100 : 0;
    
    return (
        <div 
          style={{ transitionDelay: `${delay}ms` }}
          className={`bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] transition-all duration-300 ease-out shadow-sm group overflow-hidden flex flex-col
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
            <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg text-[var(--text-primary)] break-words flex-1 pr-2">{strategy.title}</h4>
                    
                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 flex-shrink-0">
                        {isDraggable && onMove && (
                            <>
                                <button onClick={(e) => { e.stopPropagation(); onMove('up'); }} className="p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-full" aria-label={`Move ${strategy.title} up`}>
                                    <ArrowUpIcon className="w-4 h-4" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); onMove('down'); }} className="p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-full" aria-label={`Move ${strategy.title} down`}>
                                    <ArrowDownIcon className="w-4 h-4" />
                                </button>
                            </>
                        )}
                        <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-full" aria-label={`Edit ${strategy.title}`}>
                            <EditIcon className="w-4 h-4" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1.5 text-[var(--color-red-text)] hover:bg-[var(--color-red-bg)] rounded-full" aria-label={`Delete ${strategy.title}`}>
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                 <ol className="list-none space-y-3">
                    {strategy.steps.map((step, index) => (
                        <li key={index}>
                            <label className="flex items-start cursor-pointer group/item">
                                <input
                                    type="checkbox"
                                    checked={checkedState?.[index] || false}
                                    onChange={() => onToggleStep(index)}
                                    className="peer sr-only"
                                />
                                <span className={`w-6 h-6 rounded-full border-2 border-[var(--border-secondary)] peer-checked:bg-[var(--accent-primary)] peer-checked:border-[var(--accent-primary)] flex items-center justify-center transition mt-0.5 flex-shrink-0 bg-[var(--bg-primary)] peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-[var(--accent-ring)] ring-offset-[var(--bg-secondary)]`}>
                                    <svg className="w-4 h-4 text-white transform scale-0 peer-checked:scale-100 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </span>
                                <span className={`ml-3 flex-1 transition text-base ${checkedState?.[index] ? 'line-through text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}`}>
                                    {step}
                                </span>
                            </label>
                        </li>
                    ))}
                </ol>
            </div>
            
            <footer className="px-5 py-3 bg-[var(--bg-tertiary)]/50 border-t border-[var(--border-primary)] flex items-center justify-between">
                <div className="w-full bg-[var(--bg-hover)] rounded-full h-2.5 overflow-hidden">
                    <div 
                        className="h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%`, backgroundColor: `var(--color-${color}-text)` }}
                    ></div>
                </div>
                {progress > 0 && (
                    <button onClick={onReset} className="ml-3 p-1 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-full" aria-label={`Reset checklist for ${strategy.title}`}>
                        <ResetIcon className="w-5 h-5" />
                    </button>
                )}
            </footer>
        </div>
    );
};

export type StrategyCategory = 'immediate' | 'shortTerm' | 'longTerm';

const StrategyDisplay: React.FC<StrategyDisplayProps> = ({ emotion, onBack, onReorderStrategies, onAddStrategyClick, onEditStrategyClick, onDeleteStrategyClick }) => {
  const { id: emotionId, name, emoji, color, helpingOthers } = emotion;
  const strategies = emotion.strategies || { immediate: [], shortTerm: [], longTerm: [] };
  const headingColorClass = `text-[var(--color-${color}-text)]`;

  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'me' | 'others'>('me');
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean[]>>({});
  const [openSections, setOpenSections] = useState<Record<StrategyCategory, boolean>>({
    immediate: true,
    shortTerm: false,
    longTerm: false,
  });
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    const allStrategies = [
      ...strategies.immediate,
      ...strategies.shortTerm,
      ...strategies.longTerm,
      ...emotion.helpingOthers,
    ];
    const initialCheckedState: Record<string, boolean[]> = {};
    allStrategies.forEach(strategy => {
      initialCheckedState[strategy.id] = Array(strategy.steps.length).fill(false);
    });
    setCheckedSteps(initialCheckedState);
    return () => clearTimeout(timer);
  }, [emotion]);
  
  const toggleSection = (category: StrategyCategory) => {
    setOpenSections(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const handleToggleStep = (strategyId: string, stepIndex: number) => {
    setCheckedSteps(prev => {
      const newSteps = [...(prev[strategyId] || [])];
      newSteps[stepIndex] = !newSteps[stepIndex];
      return { ...prev, [strategyId]: newSteps };
    });
  };

  const handleResetSteps = (strategyId: string) => {
    const strategy = [...strategies.immediate, ...strategies.shortTerm, ...strategies.longTerm, ...helpingOthers].find(s => s.id === strategyId);
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
    { category: "immediate", title: "Immediate", icon: "⚡️" },
    { category: "shortTerm", title: "Short-Term", icon: "🗓️" },
    { category: "longTerm", title: "Long-Term", icon: "🧠" },
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
            <h2 className={`text-3xl sm:text-4xl font-bold ${headingColorClass}`}>
                Managing {name}
            </h2>
        </div>
      </header>

      <div className="border-b border-[var(--border-primary)] mb-8">
        <div className="flex items-center space-x-2">
            <button 
                onClick={() => setActiveTab('me')}
                className={`px-4 py-3 text-sm sm:text-base font-semibold transition-colors duration-200 focus:outline-none relative
                ${activeTab === 'me' ? `text-[var(--accent-primary)]` : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                aria-pressed={activeTab === 'me'}
            >
                For Myself
                {activeTab === 'me' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--accent-primary)]"></span>}
            </button>
            <button 
                onClick={() => setActiveTab('others')}
                className={`px-4 py-3 text-sm sm:text-base font-semibold transition-colors duration-200 focus:outline-none relative
                 ${activeTab === 'others' ? `text-[var(--accent-primary)]` : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                aria-pressed={activeTab === 'others'}
            >
                For Others
                {activeTab === 'others' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--accent-primary)]"></span>}
            </button>
        </div>
      </div>

      {activeTab === 'me' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-8 gap-y-6 animate-fade-in-content">
          {STRATEGY_CATEGORIES_CONFIG.map(({ category, title, icon }, categoryIndex) => {
            const categoryStrategies = strategies[category];
            const itemOffset = STRATEGY_CATEGORIES_CONFIG.slice(0, categoryIndex).reduce((acc, c) => acc + strategies[c.category].length, 0);
            
            return (
              <div key={category} className="space-y-4">
                <button 
                  onClick={() => toggleSection(category)}
                  className="w-full flex justify-between items-center p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] lg:pointer-events-none lg:p-0 lg:bg-transparent lg:border-none"
                  aria-expanded={openSections[category]}
                  aria-controls={`section-${category}`}
                >
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]/80 flex items-center">
                    <span className="mr-2">{icon}</span> {title}
                  </h3>
                   <span className="ml-2 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-xs font-semibold px-2 py-0.5 rounded-full">{categoryStrategies.length}</span>
                  <ChevronDownIcon className={`w-6 h-6 text-[var(--text-secondary)] transition-transform lg:hidden ${openSections[category] ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  id={`section-${category}`}
                  className={`space-y-4 transition-all duration-300 ease-in-out overflow-hidden lg:block ${openSections[category] ? 'grid-open' : 'grid-closed'}`}
                >
                  {categoryStrategies.map((strategy, index) => (
                      <StrategyCard
                        key={strategy.id}
                        strategy={strategy}
                        color={color}
                        visible={visible}
                        delay={(itemOffset + index) * 50}
                        isDraggable={true}
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
        <div className="space-y-6 animate-fade-in-content max-w-2xl">
           <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]/80 mb-4 pb-2">How to Support Someone Experiencing {name}</h3>
           {helpingOthers.map((strategy, index) => (
             <StrategyCard
                key={strategy.id}
                strategy={strategy}
                color={color}
                visible={visible}
                delay={index * 50}
                isDraggable={false}
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

    </div>
  );
};

const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
.animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
@keyframes fade-in-content { 0% { opacity: 0; } 100% { opacity: 1; } }
.animate-fade-in-content { animation: fade-in-content 0.4s ease-out forwards; }
.grid-closed {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
}
.grid-open {
    display: grid;
    grid-template-rows: 1fr;
    opacity: 1;
}
@media (min-width: 1024px) {
    .grid-closed, .grid-open {
        display: block;
        opacity: 1;
    }
}
`;
document.head.appendChild(style);


export default StrategyDisplay;
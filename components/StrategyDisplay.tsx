import React, { useState, useEffect, useRef } from 'react';
import { Emotion, Strategy } from '../types';

interface StrategyDisplayProps {
  emotion: Emotion;
  onBack: () => void;
  onReorderStrategies: (emotionId: string, strategies: Emotion['strategies']) => void;
  onAddStrategyClick: (category: StrategyCategory | 'helpingOthers') => void;
  onEditStrategyClick: (category: StrategyCategory | 'helpingOthers', strategy: Strategy) => void;
  onDeleteStrategyClick: (emotionId: string, category: StrategyCategory | 'helpingOthers', strategyId: string) => void;
}

const GripVerticalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[var(--text-secondary)]/60 group-hover:text-[var(--text-secondary)] transition-colors flex-shrink-0 cursor-grab active:cursor-grabbing">
      <circle cx="9" cy="12" r="1"></circle>
      <circle cx="9" cy="5" r="1"></circle>
      <circle cx="9" cy="19" r="1"></circle>
      <circle cx="15" cy="12" r="1"></circle>
      <circle cx="15" cy="5" r="1"></circle>
      <circle cx="15" cy="19" r="1"></circle>
    </svg>
);

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

const StrategyCard: React.FC<{ 
    strategy: Strategy; 
    color: string; 
    visible: boolean; 
    delay: number; 
    isDraggable?: boolean; 
    isBeingDragged: boolean; 
    onEdit: () => void; 
    onDelete: () => void;
    dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
    checkedState: boolean[];
    onToggleStep: (stepIndex: number) => void;
    onReset: () => void;
}> = ({ strategy, color, visible, delay, isDraggable = true, isBeingDragged, onEdit, onDelete, dragHandleProps, checkedState, onToggleStep, onReset }) => {
    const hasCheckedStep = checkedState?.some(Boolean);
    
    return (
        <div 
          style={{ transitionDelay: `${delay}ms` }}
          className={`bg-[var(--bg-secondary)] p-5 rounded-lg border-l-4 border-[var(--color-${color}-border)] transition-all duration-300 ease-out shadow-md group
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          ${isBeingDragged ? 'opacity-40' : 'opacity-100'}
          flex items-start space-x-3`}
        >
            {isDraggable && <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing touch-none pt-1" aria-label="Drag to reorder"><GripVerticalIcon /></div>}
            <div className="flex-1">
                <h4 className="font-bold text-lg text-[var(--text-primary)]">{strategy.title}</h4>
                 <ol className="list-none space-y-2 mt-2 text-base">
                    {strategy.steps.map((step, index) => (
                        <li key={index}>
                            <label className="flex items-center cursor-pointer group/item">
                                <input
                                    type="checkbox"
                                    checked={checkedState?.[index] || false}
                                    onChange={() => onToggleStep(index)}
                                    className="form-checkbox h-5 w-5 rounded text-[var(--accent-primary)] border-[var(--border-secondary)] focus:ring-offset-0 focus:ring-2 focus:ring-[var(--accent-ring)] transition"
                                />
                                <span className={`ml-3 transition ${checkedState?.[index] ? 'line-through text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}`}>
                                    {step}
                                </span>
                            </label>
                        </li>
                    ))}
                </ol>
            </div>
             <div className="flex items-center">
                {hasCheckedStep && (
                    <button onClick={onReset} className="p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-full" aria-label={`Reset checklist for ${strategy.title}`}>
                        <ResetIcon className="w-4 h-4" />
                    </button>
                )}
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button onClick={onEdit} className="p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-full" aria-label={`Edit ${strategy.title}`}>
                        <EditIcon className="w-4 h-4" />
                    </button>
                    <button onClick={onDelete} className="p-1.5 text-[var(--color-red-text)] hover:bg-[var(--color-red-bg)] rounded-full" aria-label={`Delete ${strategy.title}`}>
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
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

  const dragItem = useRef<{ category: StrategyCategory; index: number } | null>(null);
  const dragOverItem = useRef<{ category: StrategyCategory; index: number } | null>(null);
  const [dragOverInfo, setDragOverInfo] = useState<{ category: StrategyCategory; index: number } | null>(null);
  const [draggedInfo, setDraggedInfo] = useState<{ category: StrategyCategory; index: number } | null>(null);

  // Touch Drag State
  const dragStartTimeout = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const didDrag = useRef(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, category: StrategyCategory, index: number) => {
    dragItem.current = { category, index };
    setDraggedInfo({ category, index });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, category: StrategyCategory, index: number) => {
    if (dragItem.current?.category === category) {
      dragOverItem.current = { category, index };
      setDragOverInfo({ category, index });
    } else {
      dragOverItem.current = null;
      setDragOverInfo(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleDragLeave = () => setDragOverInfo(null);
  const handleDragEnd = () => {
    dragItem.current = null;
    dragOverItem.current = null;
    setDragOverInfo(null);
    setDraggedInfo(null);
  };
  const handleDrop = () => {
    if (!dragItem.current || !dragOverItem.current || dragItem.current.category !== dragOverItem.current.category || (dragItem.current.index === dragOverItem.current.index)) return;

    const newStrategies = JSON.parse(JSON.stringify(strategies)); // Deep copy
    const sourceList = newStrategies[dragItem.current.category];
    
    const draggedContent = sourceList[dragItem.current.index];
    sourceList.splice(dragItem.current.index, 1);
    sourceList.splice(dragOverItem.current.index, 0, draggedContent);
    
    onReorderStrategies(emotionId, newStrategies);
  };

    // Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, category: StrategyCategory, index: number) => {
    didDrag.current = false;
    if (dragStartTimeout.current) clearTimeout(dragStartTimeout.current);
    dragStartTimeout.current = window.setTimeout(() => {
        dragItem.current = { category, index };
        setDraggedInfo({ category, index });
        isDraggingRef.current = true;
        if (navigator.vibrate) navigator.vibrate(50);
    }, 200);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (dragStartTimeout.current) { clearTimeout(dragStartTimeout.current); dragStartTimeout.current = null; }
    if (!isDraggingRef.current || !dragItem.current) return;

    didDrag.current = true;
    const touch = e.touches[0];
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!targetElement) return;

    const draggableDiv = targetElement.closest('[data-drag-category]');
    if (!draggableDiv) return;

    const category = draggableDiv.getAttribute('data-drag-category') as StrategyCategory;
    const index = parseInt(draggableDiv.getAttribute('data-drag-index') || '-1', 10);
    
    if (index !== -1 && dragItem.current?.category === category) {
        if (index !== dragOverItem.current?.index || category !== dragOverItem.current?.category) {
            dragOverItem.current = { category, index };
            setDragOverInfo({ category, index });
        }
    }
  };
  
  const handleTouchEnd = () => {
    if (dragStartTimeout.current) { clearTimeout(dragStartTimeout.current); dragStartTimeout.current = null; }
    if (isDraggingRef.current && didDrag.current) {
        handleDrop();
    }
    handleDragEnd();
    isDraggingRef.current = false;
  };

  const StrategyCategoryList: React.FC<{
    category: StrategyCategory;
    title: string;
    strategies: Strategy[];
    itemOffset: number;
  }> = ({ category, title, strategies, itemOffset }) => (
    <div>
      <h3 className="text-2xl font-semibold text-[var(--text-primary)]/80 mb-6">{title}</h3>
      <div className="flex flex-col space-y-4">
        {strategies.map((strategy, index) => {
          const isBeingDragged = draggedInfo?.category === category && draggedInfo?.index === index;
          const isDropTarget = dragOverInfo?.category === category && dragOverInfo?.index === index;
          
          return (
            <div
              key={strategy.id}
              onDragEnter={(e) => handleDragEnter(e, category, index)}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onTouchMove={handleTouchMove}
              data-drag-category={category}
              data-drag-index={index}
              className="transition-all duration-200"
            >
              {isDropTarget && !isBeingDragged && (
                <div className="h-1.5 bg-[var(--accent-primary)]/50 rounded-full my-2 transition-all" aria-hidden="true" />
              )}
              <StrategyCard
                strategy={strategy}
                color={color}
                visible={visible}
                delay={(itemOffset + index) * 50}
                isDraggable={true}
                isBeingDragged={isBeingDragged}
                checkedState={checkedSteps[strategy.id] || []}
                onToggleStep={(stepIndex) => handleToggleStep(strategy.id, stepIndex)}
                onReset={() => handleResetSteps(strategy.id)}
                onEdit={() => onEditStrategyClick(category, strategy)}
                onDelete={() => onDeleteStrategyClick(emotionId, category, strategy.id)}
                dragHandleProps={{
                  draggable: true,
                  onDragStart: (e) => handleDragStart(e, category, index),
                  onDragEnd: handleDragEnd,
                  onTouchStart: (e) => handleTouchStart(e, category, index),
                  onTouchEnd: handleTouchEnd,
                  onTouchCancel: handleTouchEnd,
                }}
              />
            </div>
          )
        })}
         <button onClick={() => onAddStrategyClick(category)} className="mt-2 w-full flex items-center justify-center p-3 rounded-lg border-2 border-dashed border-[var(--border-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:border-[var(--accent-ring)] transition-colors">
            <PlusIcon className="w-5 h-5 mr-2" /> Add Strategy
        </button>
      </div>
    </div>
  );

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
        <div className="space-y-10 animate-fade-in-content">
          <StrategyCategoryList
            category="immediate"
            title="⚡️ Immediate Strategies"
            strategies={strategies.immediate}
            itemOffset={0}
          />
          <StrategyCategoryList
            category="shortTerm"
            title="🗓️ Short-Term Strategies"
            strategies={strategies.shortTerm}
            itemOffset={strategies.immediate.length}
          />
          <StrategyCategoryList
            category="longTerm"
            title="🧠 Long-Term Strategies"
            strategies={strategies.longTerm}
            itemOffset={strategies.immediate.length + strategies.shortTerm.length}
          />
        </div>
      )}

      {activeTab === 'others' && (
        <div className="space-y-6 animate-fade-in-content">
           <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]/80 mb-4 pb-2">How to Support Someone Experiencing {name}</h3>
           {helpingOthers.map((strategy, index) => (
             <StrategyCard
                key={strategy.id}
                strategy={strategy}
                color={color}
                visible={visible}
                delay={index * 50}
                isDraggable={false}
                isBeingDragged={false}
                checkedState={checkedSteps[strategy.id] || []}
                onToggleStep={(stepIndex) => handleToggleStep(strategy.id, stepIndex)}
                onReset={() => handleResetSteps(strategy.id)}
                onEdit={() => onEditStrategyClick('helpingOthers', strategy)}
                onDelete={() => onDeleteStrategyClick(emotionId, 'helpingOthers', strategy.id)}
              />
           ))}
            <button onClick={() => onAddStrategyClick('helpingOthers')} className="mt-2 w-full flex items-center justify-center p-3 rounded-lg border-2 border-dashed border-[var(--border-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:border-[var(--accent-ring)] transition-colors">
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
.form-checkbox {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  background-origin: border-box;
  border: 1px solid var(--border-secondary);
  padding: 0;
  display: inline-block;
  vertical-align: middle;
  width: 1.25em;
  height: 1.25em;
  border-radius: 6px;
  flex-shrink: 0;
  cursor: pointer;
}
.form-checkbox:checked {
  background-color: var(--accent-primary);
  border-color: var(--accent-primary);
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
`;
document.head.appendChild(style);


export default StrategyDisplay;
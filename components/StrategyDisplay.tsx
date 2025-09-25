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

const emotionTextStyles: { [key: string]: string } = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  purple: 'text-purple-500',
  yellow: 'text-yellow-500',
  green: 'text-green-500',
  orange: 'text-orange-500',
  slate: 'text-slate-500',
  teal: 'text-teal-500',
  indigo: 'text-indigo-500',
  stone: 'text-stone-500',
  lime: 'text-lime-500',
  rose: 'text-rose-500',
  cyan: 'text-cyan-500',
  sky: 'text-sky-500',
};

const emotionBorderStyles: { [key: string]: string } = {
  red: 'border-red-500/50',
  blue: 'border-blue-500/50',
  purple: 'border-purple-500/50',
  yellow: 'border-yellow-500/50',
  green: 'border-green-500/50',
  orange: 'border-orange-500/50',
  slate: 'border-slate-500/50',
  teal: 'border-teal-500/50',
  indigo: 'border-indigo-500/50',
  stone: 'border-stone-500/50',
  lime: 'border-lime-500/50',
  rose: 'border-rose-500/50',
  cyan: 'border-cyan-500/50',
  sky: 'border-sky-500/50',
};

const GripVerticalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors flex-shrink-0 cursor-grab active:cursor-grabbing">
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
}> = ({ strategy, color, visible, delay, isDraggable = true, isBeingDragged, onEdit, onDelete, dragHandleProps }) => {
    const borderColorClass = emotionBorderStyles[color] || 'border-slate-500';
    return (
        <div 
          style={{ transitionDelay: `${delay}ms` }}
          className={`bg-white dark:bg-slate-800/60 p-5 rounded-lg border-l-4 ${borderColorClass} transition-all duration-300 ease-out shadow-md group
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          ${isBeingDragged ? 'opacity-40' : 'opacity-100'}
          flex items-start space-x-3`}
        >
            {isDraggable && <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing touch-none pt-1" aria-label="Drag to reorder"><GripVerticalIcon /></div>}
            <div className="flex-1">
                <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">{strategy.title}</h4>
                <ol className="list-decimal list-inside space-y-2 mt-2 text-slate-600 dark:text-slate-400 text-base">
                    {strategy.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>
            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button onClick={onEdit} className="p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded-full" aria-label={`Edit ${strategy.title}`}>
                    <EditIcon className="w-4 h-4" />
                </button>
                <button onClick={onDelete} className="p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-full" aria-label={`Delete ${strategy.title}`}>
                    <TrashIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export type StrategyCategory = 'immediate' | 'shortTerm' | 'longTerm';

const StrategyDisplay: React.FC<StrategyDisplayProps> = ({ emotion, onBack, onReorderStrategies, onAddStrategyClick, onEditStrategyClick, onDeleteStrategyClick }) => {
  const { id: emotionId, name, emoji, strategies, color, helpingOthers } = emotion;
  const headingColorClass = emotionTextStyles[color] || 'text-cyan-500';

  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'me' | 'others'>('me');
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const dragItem = useRef<{ category: StrategyCategory; index: number } | null>(null);
  const dragOverItem = useRef<{ category: StrategyCategory; index: number } | null>(null);
  const [dragOverInfo, setDragOverInfo] = useState<{ category: StrategyCategory; index: number } | null>(null);
  const [draggedInfo, setDraggedInfo] = useState<{ category: StrategyCategory; index: number } | null>(null);

  // Touch Drag State
  const dragStartTimeout = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

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

    const newStrategies = JSON.parse(JSON.stringify(emotion.strategies)); // Deep copy
    const sourceList = newStrategies[dragItem.current.category];
    
    const draggedContent = sourceList[dragItem.current.index];
    sourceList.splice(dragItem.current.index, 1);
    sourceList.splice(dragOverItem.current.index, 0, draggedContent);
    
    onReorderStrategies(emotionId, newStrategies);
  };

    // Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, category: StrategyCategory, index: number) => {
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
    if (isDraggingRef.current) handleDrop();
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
      <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-6">{title}</h3>
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
                <div className="h-1.5 bg-purple-300 dark:bg-purple-700 rounded-full my-2 transition-all" aria-hidden="true" />
              )}
              <StrategyCard
                strategy={strategy}
                color={color}
                visible={visible}
                delay={(itemOffset + index) * 50}
                isDraggable={true}
                isBeingDragged={isBeingDragged}
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
         <button onClick={() => onAddStrategyClick(category)} className="mt-2 w-full flex items-center justify-center p-3 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">
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
          className="mr-2 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors"
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

      <div className="border-b border-slate-200 dark:border-slate-700 mb-8">
        <div className="flex items-center space-x-2">
            <button 
                onClick={() => setActiveTab('me')}
                className={`px-4 py-3 text-sm sm:text-base font-semibold transition-colors duration-200 focus:outline-none relative
                ${activeTab === 'me' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}
                aria-pressed={activeTab === 'me'}
            >
                For Myself
                {activeTab === 'me' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500"></span>}
            </button>
            <button 
                onClick={() => setActiveTab('others')}
                className={`px-4 py-3 text-sm sm:text-base font-semibold transition-colors duration-200 focus:outline-none relative
                ${activeTab === 'others' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}
                aria-pressed={activeTab === 'others'}
            >
                For Others
                {activeTab === 'others' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500"></span>}
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
           <h3 className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4 pb-2">How to Support Someone Experiencing {name}</h3>
           {helpingOthers.map((strategy, index) => (
             <StrategyCard
                key={strategy.id}
                strategy={strategy}
                color={color}
                visible={visible}
                delay={index * 50}
                isDraggable={false}
                isBeingDragged={false}
                onEdit={() => onEditStrategyClick('helpingOthers', strategy)}
                onDelete={() => onDeleteStrategyClick(emotionId, 'helpingOthers', strategy.id)}
              />
           ))}
            <button onClick={() => onAddStrategyClick('helpingOthers')} className="mt-2 w-full flex items-center justify-center p-3 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">
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
`;
document.head.appendChild(style);


export default StrategyDisplay;
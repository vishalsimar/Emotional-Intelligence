import React, { useState, useEffect, useRef } from 'react';
import { Emotion } from '../types';

interface EmotionSelectorProps {
  emotions: Emotion[];
  onSelectEmotion: (emotion: Emotion) => void;
  onReorder: (emotions: Emotion[]) => void;
  onEditClick: (emotion: Emotion) => void;
  onDeleteClick: (emotionId: string) => void;
}

const emotionColorStyles: { [key: string]: string } = {
  red: 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30 dark:bg-red-500/10 dark:border-red-500/30 dark:hover:bg-red-500/20 dark:hover:border-red-500/40 focus:ring-red-400',
  blue: 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/30 dark:bg-blue-500/10 dark:border-blue-500/30 dark:hover:bg-blue-500/20 dark:hover:border-blue-500/40 focus:ring-blue-400',
  purple: 'bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/30 dark:bg-purple-500/10 dark:border-purple-500/30 dark:hover:bg-purple-500/20 dark:hover:border-purple-500/40 focus:ring-purple-400',
  yellow: 'bg-yellow-500/10 border-yellow-500/20 hover:bg-yellow-500/20 hover:border-yellow-500/30 dark:bg-yellow-500/10 dark:border-yellow-500/30 dark:hover:bg-yellow-500/20 dark:hover:border-yellow-500/40 focus:ring-yellow-400',
  green: 'bg-green-500/10 border-green-500/20 hover:bg-green-500/20 hover:border-green-500/30 dark:bg-green-500/10 dark:border-green-500/30 dark:hover:bg-green-500/20 dark:hover:border-green-500/40 focus:ring-green-400',
  orange: 'bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20 hover:border-orange-500/30 dark:bg-orange-500/10 dark:border-orange-500/30 dark:hover:bg-orange-500/20 dark:hover:border-orange-500/40 focus:ring-orange-400',
  slate: 'bg-slate-500/10 border-slate-500/20 hover:bg-slate-500/20 hover:border-slate-500/30 dark:bg-slate-500/10 dark:border-slate-500/30 dark:hover:bg-slate-500/20 dark:hover:border-slate-500/40 focus:ring-slate-400',
  teal: 'bg-teal-500/10 border-teal-500/20 hover:bg-teal-500/20 hover:border-teal-500/30 dark:bg-teal-500/10 dark:border-teal-500/30 dark:hover:bg-teal-500/20 dark:hover:border-teal-500/40 focus:ring-teal-400',
  indigo: 'bg-indigo-500/10 border-indigo-500/20 hover:bg-indigo-500/20 hover:border-indigo-500/30 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:hover:bg-indigo-500/20 dark:hover:border-indigo-500/40 focus:ring-indigo-400',
  stone: 'bg-stone-500/10 border-stone-500/20 hover:bg-stone-500/20 hover:border-stone-500/30 dark:bg-stone-500/10 dark:border-stone-500/30 dark:hover:bg-stone-500/20 dark:hover:border-stone-500/40 focus:ring-stone-400',
  lime: 'bg-lime-500/10 border-lime-500/20 hover:bg-lime-500/20 hover:border-lime-500/30 dark:bg-lime-500/10 dark:border-lime-500/30 dark:hover:bg-lime-500/20 dark:hover:border-lime-500/40 focus:ring-lime-400',
  rose: 'bg-rose-500/10 border-rose-500/20 hover:bg-rose-500/20 hover:border-rose-500/30 dark:bg-rose-500/10 dark:border-rose-500/30 dark:hover:bg-rose-500/20 dark:hover:border-rose-500/40 focus:ring-rose-400',
  cyan: 'bg-cyan-500/10 border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/30 dark:bg-cyan-500/10 dark:border-cyan-500/30 dark:hover:bg-cyan-500/20 dark:hover:border-cyan-500/40 focus:ring-cyan-400',
  sky: 'bg-sky-500/10 border-sky-500/20 hover:bg-sky-500/20 hover:border-sky-500/30 dark:bg-sky-500/10 dark:border-sky-500/30 dark:hover:bg-sky-500/20 dark:hover:border-sky-500/40 focus:ring-sky-400',
};

const GripVerticalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors">
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


const EmotionSelector: React.FC<EmotionSelectorProps> = ({ emotions, onSelectEmotion, onReorder, onEditClick, onDeleteClick }) => {
  const [isRendered, setIsRendered] = useState(false);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);


  useEffect(() => {
    const timer = setTimeout(() => setIsRendered(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, index: number) => {
    dragItem.current = index;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e: React.DragEvent<HTMLButtonElement>, index: number) => {
    dragOverItem.current = index;
    setDragOverIndex(index);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
  };
  
  const handleDragLeave = () => {
    // Check if the mouse is truly leaving the drop zone, not just entering a child element.
    // This simple implementation might flicker, but it's often good enough.
    // For more complex scenarios, you might need to check relatedTarget.
    setDragOverIndex(null);
  }

  const handleDrop = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    
    const emotionsCopy = [...emotions];
    const dragItemContent = emotionsCopy[dragItem.current];
    emotionsCopy.splice(dragItem.current, 1);
    emotionsCopy.splice(dragOverItem.current, 0, dragItemContent);
    
    onReorder(emotionsCopy);
  };

  const handleDragEnd = () => {
    dragItem.current = null;
    dragOverItem.current = null;
    setDragOverIndex(null);
    setDraggedIndex(null);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-slate-200 mb-8 text-center">How are you feeling right now?</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full pb-20">
        {emotions.map((emotion, index) => {
          const isDividerPosition = index === 6;
          const isBeingDragged = draggedIndex === index;
          const isDropTarget = dragOverIndex === index && !isBeingDragged;

          return (
            <React.Fragment key={emotion.id}>
              {isDividerPosition && (
                 <div className="col-span-2 md:col-span-3 mt-4 mb-2 flex items-center">
                   <div className="flex-grow border-t border-slate-300 dark:border-slate-700"></div>
                   <h3 className="flex-shrink-0 px-4 text-lg font-semibold text-slate-600 dark:text-slate-400">Complex Emotions</h3>
                   <div className="flex-grow border-t border-slate-300 dark:border-slate-700"></div>
                 </div>
              )}
              <button
                onClick={() => onSelectEmotion(emotion)}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                style={{ transitionDelay: `${index * 75}ms` }}
                className={`p-4 bg-white dark:bg-slate-800/50 rounded-2xl shadow-md transition-all duration-300 ease-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-950 text-center border group relative
                ${emotionColorStyles[emotion.color] || 'bg-slate-100 border-slate-200'}
                ${isRendered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                ${isBeingDragged ? 'opacity-40' : ''}
                ${isDropTarget ? 'scale-105 shadow-2xl ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-slate-950' : ''}
                `}
                aria-label={`Select ${emotion.name} or drag to reorder`}
              >
                <div className="absolute top-2 left-2 cursor-grab active:cursor-grabbing p-1 z-10">
                    <GripVerticalIcon />
                </div>
                <div className="absolute top-2 right-2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onEditClick(emotion); }}
                        className="p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded-full"
                        aria-label={`Edit ${emotion.name}`}
                    >
                        <EditIcon className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDeleteClick(emotion.id); }}
                        className="p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-full"
                        aria-label={`Delete ${emotion.name}`}
                    >
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
                <div className="text-5xl sm:text-6xl mb-2 pt-8">{emotion.emoji}</div>
                <div className="font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-100">{emotion.name}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 h-8">
                  {emotion.relatedWords.join(', ')}
                </div>
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default EmotionSelector;

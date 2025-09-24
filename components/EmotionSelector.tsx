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
  const [showComplexEmotions, setShowComplexEmotions] = useState(false);
  
  // For touch drag
  const [isDragging, setIsDragging] = useState(false);
  const dragStartTimeout = useRef<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
    setDragOverIndex(null);
  };

  const handleDrop = () => {
    if (dragItem.current === null || dragOverItem.current === null || dragItem.current === dragOverItem.current) return;
    
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

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>, index: number) => {
    if (dragStartTimeout.current) clearTimeout(dragStartTimeout.current);
    dragStartTimeout.current = window.setTimeout(() => {
      dragItem.current = index;
      setDraggedIndex(index);
      setIsDragging(true);
      if (navigator.vibrate) navigator.vibrate(50);
    }, 200);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (dragStartTimeout.current) {
        clearTimeout(dragStartTimeout.current);
        dragStartTimeout.current = null;
    }

    if (!isDragging || dragItem.current === null) return;
    
    const touch = e.touches[0];
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (!targetElement) return;

    const buttonElement = targetElement.closest('button[draggable]');
    if (!buttonElement || !gridRef.current) return;
    
    const children = Array.from(gridRef.current.children).filter((el: Element) => el.hasAttribute('draggable'));
    const overIndex = children.indexOf(buttonElement);

    if (overIndex !== -1 && overIndex !== dragOverItem.current) {
        const draggableButtons = Array.from(gridRef.current.querySelectorAll('button[draggable]'));
        const trueIndex = draggableButtons.indexOf(buttonElement);
        if (trueIndex !== -1) {
          dragOverItem.current = trueIndex;
          setDragOverIndex(trueIndex);
        }
    }
  };

  const handleTouchEnd = () => {
    if (dragStartTimeout.current) {
        clearTimeout(dragStartTimeout.current);
        dragStartTimeout.current = null;
    }

    if (isDragging) {
        handleDrop();
    }
    
    handleDragEnd();
    
    setTimeout(() => {
        setIsDragging(false);
    }, 50);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, emotion: Emotion) => {
    if (isDragging) {
        e.preventDefault();
        return;
    }
    onSelectEmotion(emotion);
  };

  // FIX: Explicitly typing EmotionCard as a React.FC to resolve type errors with the 'key' prop.
  const EmotionCard: React.FC<{ emotion: Emotion; index: number }> = ({ emotion, index }) => {
    const isBeingDragged = draggedIndex === index;
    const isDropTarget = dragOverIndex === index && !isBeingDragged;

    return (
      <button
        onClick={(e) => handleClick(e, emotion)}
        draggable
        onDragStart={(e) => handleDragStart(e, index)}
        onDragEnter={(e) => handleDragEnter(e, index)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragEnd={handleDragEnd}
        onTouchStart={(e) => handleTouchStart(e, index)}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        style={{ transitionDelay: `${index * 50}ms`, touchAction: 'none' }}
        className={`p-4 bg-white dark:bg-slate-800/50 rounded-2xl shadow-md transition-all duration-300 ease-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-950 text-center border group relative
        ${emotionColorStyles[emotion.color] || 'bg-slate-100 border-slate-200'}
        ${isRendered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${isBeingDragged ? 'opacity-40 scale-105 shadow-2xl' : ''}
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
    );
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-slate-200 mb-2">How are you feeling?</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8 text-center">Select a feeling to explore management strategies.</p>
      
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full pb-20">
        {emotions.slice(0, 6).map((emotion, index) => (
          <EmotionCard key={emotion.id} emotion={emotion} index={index} />
        ))}
        
        {emotions.length > 6 && (
          <div className="col-span-2 md:col-span-3 mt-8 mb-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center">
                  <button
                    onClick={() => setShowComplexEmotions(prev => !prev)}
                    className="bg-slate-100 dark:bg-slate-950 px-4 py-2 text-lg font-medium text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center"
                    aria-expanded={showComplexEmotions}
                    aria-controls="complex-emotions-grid"
                  >
                    Complex Emotions
                    <svg xmlns="http://www.w3.org/2000/svg" className={`ml-2 h-5 w-5 text-slate-500 transition-transform transform ${showComplexEmotions ? 'rotate-180' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
              </div>
            </div>
          </div>
        )}

        {showComplexEmotions && emotions.slice(6).map((emotion, i) => {
          const index = i + 6;
          return <EmotionCard key={emotion.id} emotion={emotion} index={index} />;
        })}
      </div>
    </div>
  );
};

export default EmotionSelector;

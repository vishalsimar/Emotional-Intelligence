import React, { useState, useEffect, useRef } from 'react';
import { Emotion, EmotionCategory } from '../types';

interface EmotionSelectorProps {
  categories: EmotionCategory[];
  onSelectEmotion: (emotion: Emotion) => void;
  onReorder: (categoryId: string, emotions: Emotion[]) => void;
  onEditClick: (emotion: Emotion) => void;
  onDeleteClick: (emotionId: string) => void;
}

const GripVerticalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[var(--text-secondary)]/50 group-hover:text-[var(--text-secondary)] transition-colors">
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

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ categories, onSelectEmotion, onReorder, onEditClick, onDeleteClick }) => {
  const [isRendered, setIsRendered] = useState(false);
  const dragItem = useRef<{ categoryId: string, index: number } | null>(null);
  const dragOverItem = useRef<{ categoryId: string, index: number } | null>(null);
  const [dragOverInfo, setDragOverInfo] = useState<{ categoryId: string, index: number } | null>(null);
  const [draggedInfo, setDraggedInfo] = useState<{ categoryId: string, index: number } | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  
  // For touch drag
  const [isDragging, setIsDragging] = useState(false);
  const dragStartTimeout = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsRendered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setExpandedCategories(prev => {
        const newState = { ...prev };
        categories.forEach(cat => {
            if (cat.isCollapsible && !(cat.id in newState)) {
                newState[cat.id] = false; // Default new collapsible categories to collapsed
            }
        });
        return newState;
    });
  }, [categories]);
  
  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, categoryId: string, index: number) => {
    dragItem.current = { categoryId, index };
    setDraggedInfo({ categoryId, index });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e: React.DragEvent<HTMLButtonElement>, categoryId: string, index: number) => {
    if (dragItem.current?.categoryId === categoryId) {
        dragOverItem.current = { categoryId, index };
        setDragOverInfo({ categoryId, index });
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
  };
  
  const handleDragLeave = () => {
    setDragOverInfo(null);
  };

  const handleDrop = (categoryId: string) => {
    if (!dragItem.current || !dragOverItem.current || dragItem.current.categoryId !== categoryId || dragOverItem.current.categoryId !== categoryId || dragItem.current.index === dragOverItem.current.index) return;
    
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const emotionsCopy = [...category.emotions];
    const dragItemContent = emotionsCopy[dragItem.current.index];
    emotionsCopy.splice(dragItem.current.index, 1);
    emotionsCopy.splice(dragOverItem.current.index, 0, dragItemContent);
    
    onReorder(categoryId, emotionsCopy);
  };

  const handleDragEnd = () => {
    dragItem.current = null;
    dragOverItem.current = null;
    setDragOverInfo(null);
    setDraggedInfo(null);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>, categoryId: string, index: number) => {
    if (dragStartTimeout.current) clearTimeout(dragStartTimeout.current);
    dragStartTimeout.current = window.setTimeout(() => {
      dragItem.current = { categoryId, index };
      setDraggedInfo({ categoryId, index });
      setIsDragging(true);
      if (navigator.vibrate) navigator.vibrate(50);
    }, 200);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (dragStartTimeout.current) { clearTimeout(dragStartTimeout.current); dragStartTimeout.current = null; }
    if (!isDragging || !dragItem.current) return;
    
    const touch = e.touches[0];
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!targetElement) return;

    const buttonElement = targetElement.closest('button[data-emotion-id]');
    if (!buttonElement) return;

    const categoryId = buttonElement.getAttribute('data-category-id');
    const indexStr = buttonElement.getAttribute('data-index');

    if (categoryId === dragItem.current.categoryId && indexStr) {
        const index = parseInt(indexStr, 10);
        if (index !== dragOverItem.current?.index) {
          dragOverItem.current = { categoryId, index };
          setDragOverInfo({ categoryId, index });
        }
    }
  };

  const handleTouchEnd = () => {
    if (dragStartTimeout.current) { clearTimeout(dragStartTimeout.current); dragStartTimeout.current = null; }
    if (isDragging && dragItem.current) { handleDrop(dragItem.current.categoryId); }
    handleDragEnd();
    setTimeout(() => setIsDragging(false), 50);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, emotion: Emotion) => {
    if (isDragging) { e.preventDefault(); return; }
    onSelectEmotion(emotion);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const EmotionCard: React.FC<{ emotion: Emotion; index: number; categoryId: string }> = ({ emotion, index, categoryId }) => {
    const isBeingDragged = draggedInfo?.categoryId === categoryId && draggedInfo?.index === index;
    const isDropTarget = dragOverInfo?.categoryId === categoryId && dragOverInfo?.index === index && !isBeingDragged;

    const colorClasses = `bg-[var(--color-${emotion.color}-bg)] border-[var(--color-${emotion.color}-border)] hover:bg-[var(--color-${emotion.color}-hover-bg)] hover:border-[var(--color-${emotion.color}-hover-border)] focus:ring-[var(--color-${emotion.color}-ring)]`;

    return (
      <button
        data-emotion-id={emotion.id}
        data-category-id={categoryId}
        data-index={index}
        onClick={(e) => handleClick(e, emotion)}
        draggable
        onDragStart={(e) => handleDragStart(e, categoryId, index)}
        onDragEnter={(e) => handleDragEnter(e, categoryId, index)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={() => handleDrop(categoryId)}
        onDragEnd={handleDragEnd}
        onTouchStart={(e) => handleTouchStart(e, categoryId, index)}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        style={{ transitionDelay: `${index * 50}ms`, touchAction: isDragging ? 'none' : 'pan-y' }}
        className={`p-4 bg-[var(--bg-secondary)] rounded-2xl shadow-md transition-all duration-300 ease-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] text-center border group relative
        ${colorClasses}
        ${isRendered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${isBeingDragged ? 'opacity-40 scale-105 shadow-2xl' : ''}
        ${isDropTarget ? `scale-105 shadow-2xl ring-2 ring-[var(--accent-ring)] ring-offset-2 ring-offset-[var(--bg-primary)]` : ''}`}
        aria-label={`Select ${emotion.name} or drag to reorder`}
      >
        <div className="absolute top-2 left-2 cursor-grab active:cursor-grabbing p-1 z-10"><GripVerticalIcon /></div>
        <div className="absolute top-2 right-2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <button onClick={(e) => { e.stopPropagation(); onEditClick(emotion); }} className="p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-full" aria-label={`Edit ${emotion.name}`}><EditIcon className="w-4 h-4" /></button>
            <button onClick={(e) => { e.stopPropagation(); onDeleteClick(emotion.id); }} className="p-1.5 text-[var(--color-red-text)] hover:bg-[var(--color-red-bg)] rounded-full" aria-label={`Delete ${emotion.name}`}><TrashIcon className="w-4 h-4" /></button>
        </div>
        <div className="text-5xl sm:text-6xl mb-2 pt-8">{emotion.emoji}</div>
        <div className="font-bold text-lg sm:text-xl text-[var(--text-primary)]">{emotion.name}</div>
        <div className="text-xs text-[var(--text-secondary)] mt-1 h-8">{emotion.relatedWords.join(', ')}</div>
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] mb-2">How are you feeling?</h2>
      <p className="text-[var(--text-secondary)] mb-8 text-center">Select a feeling to explore management strategies.</p>
      
      <div className="w-full space-y-10 pb-20">
        {categories.map(category => (
          <section key={category.id}>
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center" aria-hidden="true"><div className="w-full border-t border-[var(--border-primary)]"></div></div>
              <div className="relative flex justify-center">
                {category.isCollapsible ? (
                  <button onClick={() => toggleCategory(category.id)} className="bg-[var(--bg-primary)] px-4 py-2 text-lg font-medium text-[var(--text-secondary)] rounded-full hover:bg-[var(--bg-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] flex items-center" aria-expanded={expandedCategories[category.id]} aria-controls={`category-grid-${category.id}`}>
                    {category.name}
                    <svg xmlns="http://www.w3.org/2000/svg" className={`ml-2 h-5 w-5 text-slate-500 transition-transform transform ${expandedCategories[category.id] ? 'rotate-180' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                ) : (
                  <h3 className="bg-[var(--bg-primary)] px-4 text-lg font-medium text-[var(--text-secondary)]">{category.name}</h3>
                )}
              </div>
            </div>

            {(!category.isCollapsible || expandedCategories[category.id]) && (
                <div id={`category-grid-${category.id}`} className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
                {category.emotions.map((emotion, index) => (
                    <EmotionCard key={emotion.id} emotion={emotion} index={index} categoryId={category.id} />
                ))}
                </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default EmotionSelector;
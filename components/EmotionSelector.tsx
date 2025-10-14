import React, { useState, useEffect } from 'react';
import { Emotion, EmotionCategory } from '../types';

interface EmotionSelectorProps {
  categories: EmotionCategory[];
  onSelectEmotion: (emotion: Emotion) => void;
  onReorder: (categoryId: string, emotions: Emotion[]) => void;
  onEditClick: (emotion: Emotion) => void;
  onDeleteClick: (emotionId: string) => void;
  onAddEmotionClick: () => void;
  onBack: () => void;
}

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

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ categories, onSelectEmotion, onReorder, onEditClick, onDeleteClick, onAddEmotionClick, onBack }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

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

  const handleMoveEmotion = (categoryId: string, index: number, direction: 'up' | 'down') => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const emotionsCopy = [...category.emotions];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= emotionsCopy.length) return;
    
    // Swap elements
    [emotionsCopy[index], emotionsCopy[newIndex]] = [emotionsCopy[newIndex], emotionsCopy[index]];

    onReorder(categoryId, emotionsCopy);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const EmotionCard: React.FC<{ emotion: Emotion; index: number; categoryId: string; isFirst: boolean; isLast: boolean; }> = ({ emotion, index, categoryId, isFirst, isLast }) => {
    const colorClasses = `bg-[var(--bg-secondary)] border-[var(--color-${emotion.color}-border)] hover:bg-[var(--color-${emotion.color}-hover-bg)] hover:border-[var(--color-${emotion.color}-hover-border)] focus:ring-[var(--color-${emotion.color}-ring)]`;

    return (
      <button
        onClick={() => onSelectEmotion(emotion)}
        style={{ transitionDelay: `${index * 50}ms` }}
        className={`p-4 rounded-2xl shadow-md transition-all duration-300 ease-out-quad transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] text-center border group relative active:scale-95 group-hover:scale-[1.02]
        ${colorClasses}
        ${isRendered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        aria-label={`Select ${emotion.name}`}
      >
        <div className="absolute top-2 left-2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <button onClick={(e) => { e.stopPropagation(); handleMoveEmotion(categoryId, index, 'up'); }} disabled={isFirst} className="p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-full disabled:opacity-50 disabled:cursor-not-allowed" aria-label={`Move ${emotion.name} up`}>
                <ArrowUpIcon className="w-4 h-4" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleMoveEmotion(categoryId, index, 'down'); }} disabled={isLast} className="p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-full disabled:opacity-50 disabled:cursor-not-allowed" aria-label={`Move ${emotion.name} down`}>
                <ArrowDownIcon className="w-4 h-4" />
            </button>
        </div>
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

  const AddEmotionCard = () => (
     <button
        onClick={onAddEmotionClick}
        style={{ transitionDelay: `${categories.flatMap(c => c.emotions).length * 50}ms` }}
        className={`p-4 rounded-2xl transition-all duration-300 ease-out-quad transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] focus:ring-[var(--accent-ring)] text-center border-2 border-dashed border-[var(--border-secondary)] hover:bg-[var(--bg-hover)] hover:border-[var(--accent-primary)] group flex flex-col justify-center items-center active:scale-95 hover:scale-[1.02]
        ${isRendered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        aria-label="Add new emotion"
    >
        <PlusIcon className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors" />
        <div className="font-bold text-lg sm:text-xl text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors mt-4">Add Emotion</div>
    </button>
  );

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full text-center mb-2">
            <button
                onClick={onBack}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-[var(--bg-hover)] transition-colors"
                aria-label="Go back"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            </button>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] font-serif">How are you feeling?</h2>
      </div>
      <p className="text-[var(--text-secondary)] mb-8 text-center">Choose a feeling to understand it better.</p>

      <div className="w-full space-y-10 pb-20">
        {categories.map((category, catIndex) => (
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
                {category.emotions.map((emotion, index) => {
                    const categoryEmotionsCount = category.emotions.length;
                    return (
                        <EmotionCard 
                            key={emotion.id} 
                            emotion={emotion} 
                            index={index} 
                            categoryId={category.id} 
                            isFirst={index === 0}
                            isLast={index === categoryEmotionsCount - 1}
                        />
                    );
                })}
                {catIndex === categories.length - 1 && <AddEmotionCard />}
                </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default EmotionSelector;
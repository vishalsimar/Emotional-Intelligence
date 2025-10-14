import React, { useState } from 'react';
import { Strategy } from '../types';

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

const ShareIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
        <polyline points="16 6 12 2 8 6"></polyline>
        <line x1="12" y1="2" x2="12" y2="15"></line>
    </svg>
);


interface StrategyCardProps { 
    strategy: Strategy; 
    color: string;
    emotionName: string;
    visible: boolean; 
    delay: number;
    showControls?: boolean;
    onMove?: (direction: 'up' | 'down') => void;
    onEdit?: () => void; 
    onDelete?: () => void;
    checkedState: boolean[];
    onToggleStep: (stepIndex: number) => void;
    onReset: () => void;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ 
    strategy, 
    color,
    emotionName,
    visible, 
    delay, 
    showControls = true, 
    onMove, 
    onEdit, 
    onDelete, 
    checkedState, 
    onToggleStep, 
    onReset 
}) => {
    const [justCopied, setJustCopied] = useState(false);
    const progress = checkedState.length > 0 ? (checkedState.filter(Boolean).length / checkedState.length) * 100 : 0;
    const isComplete = progress === 100;
    
    const cardStyle = {
        '--card-glow-color': `var(--color-${color}-ring)`
    } as React.CSSProperties;

    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const stepsText = strategy.steps.map(step => `- ${step}`).join('\n');
        const shareText = `Here's a strategy that might help when ${emotionName}:\n\n*${strategy.title}*\n\n${stepsText}\n\nShared from the Emo Intel toolkit.`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Strategy for ${emotionName}: ${strategy.title}`,
                    text: shareText,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                setJustCopied(true);
                setTimeout(() => setJustCopied(false), 2000);
            });
        }
    };

    return (
        <div 
          style={{ ...cardStyle, transitionDelay: `${delay}ms` }}
          className={`bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] transition-all duration-300 ease-out-quad shadow-sm group overflow-hidden flex flex-col
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          ${isComplete ? 'shadow-[0_0_15px_var(--card-glow-color)] border-[var(--card-glow-color)]' : ''}`}
        >
            <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg text-[var(--text-primary)] break-words flex-1 pr-2">{strategy.title}</h4>
                    
                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 flex-shrink-0">
                        <button onClick={handleShare} className="p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-full" aria-label={`Share ${strategy.title}`}>
                            {justCopied ? <span className="text-xs px-1">Copied!</span> : <ShareIcon className="w-4 h-4" />}
                        </button>
                        {showControls && onMove && (
                            <>
                                <button onClick={(e) => { e.stopPropagation(); onMove('up'); }} className="p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-full" aria-label={`Move ${strategy.title} up`}>
                                    <ArrowUpIcon className="w-4 h-4" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); onMove('down'); }} className="p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-full" aria-label={`Move ${strategy.title} down`}>
                                    <ArrowDownIcon className="w-4 h-4" />
                                </button>
                            </>
                        )}
                        {showControls && onEdit && <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-full" aria-label={`Edit ${strategy.title}`}>
                            <EditIcon className="w-4 h-4" />
                        </button>}
                        {showControls && onDelete && <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1.5 text-[var(--color-red-text)] hover:bg-[var(--color-red-bg)] rounded-full" aria-label={`Delete ${strategy.title}`}>
                            <TrashIcon className="w-4 h-4" />
                        </button>}
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
                        className="h-2.5 rounded-full transition-all duration-500 ease-out-quad"
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

export default StrategyCard;


import React, { useState, useEffect } from 'react';
import { Strategy } from '../types';
import StrategyCard from './StrategyCard';
import { StrategyCategory } from './StrategyDisplay';

type StrategyWithOrigin = Strategy & { originEmotionId: string; originCategory: StrategyCategory | 'helpingOthers' };

interface SimpleStrategyViewProps {
    title: string;
    emotionColor: string;
    emotionName: string;
    strategies: StrategyWithOrigin[];
    onBack: () => void;
    onFindMore: () => void;
    onEditStrategy: (emotionId: string, category: StrategyCategory | 'helpingOthers', strategy: Strategy) => void;
    onDeleteStrategy: (emotionId: string, category: StrategyCategory | 'helpingOthers', strategyId: string) => void;
}

const SimpleStrategyView: React.FC<SimpleStrategyViewProps> = ({ title, emotionColor, emotionName, strategies, onBack, onFindMore, onEditStrategy, onDeleteStrategy }) => {
    const [visible, setVisible] = useState(false);
    const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean[]>>({});

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100);
        const initialCheckedState: Record<string, boolean[]> = {};
        strategies.forEach(strategy => {
            initialCheckedState[strategy.id] = Array(strategy.steps.length).fill(false);
        });
        setCheckedSteps(initialCheckedState);
        return () => clearTimeout(timer);
    }, [strategies]);

    const handleToggleStep = (strategyId: string, stepIndex: number) => {
        setCheckedSteps(prev => {
            const newSteps = [...(prev[strategyId] || [])];
            newSteps[stepIndex] = !newSteps[stepIndex];
            return { ...prev, [strategyId]: newSteps };
        });
    };

    const handleResetSteps = (strategyId: string) => {
        const strategy = strategies.find(s => s.id === strategyId);
        if (strategy) {
            setCheckedSteps(prev => ({
                ...prev,
                [strategyId]: Array(strategy.steps.length).fill(false)
            }));
        }
    };

    return (
        <div className="flex flex-col animate-fade-in w-full">
            <header className="flex items-center mb-8">
                <button
                    onClick={onBack}
                    className="mr-2 p-2 rounded-full hover:bg-[var(--bg-hover)] transition-colors"
                    aria-label="Go back"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
                </button>
                <h2 className={`text-3xl sm:text-4xl font-bold text-[var(--color-${emotionColor}-text)]`}>
                    {title}
                </h2>
            </header>

            <div className="space-y-4">
                {strategies.map((strategy, index) => (
                    <StrategyCard
                        key={strategy.id}
                        strategy={strategy}
                        emotionName={emotionName}
                        color={emotionColor}
                        visible={visible}
                        delay={index * 50}
                        showControls={true}
                        checkedState={checkedSteps[strategy.id] || []}
                        onToggleStep={(stepIndex) => handleToggleStep(strategy.id, stepIndex)}
                        onReset={() => handleResetSteps(strategy.id)}
                        onEdit={() => onEditStrategy(strategy.originEmotionId, strategy.originCategory, strategy)}
                        onDelete={() => onDeleteStrategy(strategy.originEmotionId, strategy.originCategory, strategy.id)}
                    />
                ))}
            </div>
            
            <div className="mt-12 text-center">
                 <button 
                    onClick={onFindMore}
                    className="px-6 py-3 text-base font-medium text-[var(--text-on-accent)] bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] focus:ring-[var(--accent-ring)]"
                >
                    Explore More Options
                </button>
            </div>
        </div>
    );
};

export default SimpleStrategyView;
import React, { useMemo } from 'react';
import { EmotionLog } from '../types';

interface HistoryViewProps {
  history: EmotionLog[];
  onBack: () => void;
  onClearHistory: () => void;
}

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

const TrashIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);

const getRelativeDateString = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    }
    if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    }
    return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

const HistoryView: React.FC<HistoryViewProps> = ({ history, onBack, onClearHistory }) => {
    const groupedHistory = useMemo(() => {
        return history.reduce((acc, log) => {
            const logDate = new Date(log.timestamp);
            const dateString = getRelativeDateString(logDate);
            if (!acc[dateString]) {
                acc[dateString] = [];
            }
            acc[dateString].push(log);
            return acc;
        }, {} as Record<string, EmotionLog[]>);
    }, [history]);

    const dateKeys = Object.keys(groupedHistory);

    return (
        <div className="flex flex-col animate-fade-in w-full pb-8">
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <button
                        onClick={onBack}
                        className="mr-2 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors"
                        aria-label="Go back to emotion selection"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
                    </button>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-200">
                        Emotion History
                    </h2>
                </div>
                {history.length > 0 && (
                    <button 
                        onClick={onClearHistory}
                        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-500/10 hover:bg-red-200 dark:hover:bg-red-500/20 rounded-md transition-colors"
                        aria-label="Clear all history"
                    >
                        <TrashIcon className="w-4 h-4" />
                        <span>Clear History</span>
                    </button>
                )}
            </header>
            
            {dateKeys.length > 0 ? (
                <div className="space-y-8">
                    {dateKeys.map(dateString => (
                        <section key={dateString} aria-labelledby={`date-heading-${dateString.replace(/\s/g, '-')}`}>
                            <h3 id={`date-heading-${dateString.replace(/\s/g, '-')}`} className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">
                                {dateString}
                            </h3>
                            <ul className="space-y-3">
                                {groupedHistory[dateString].map((log, index) => (
                                    <li 
                                        key={log.logId}
                                        className="animate-fade-in-item"
                                        style={{ animationDelay: `${index * 30}ms` }}
                                    >
                                        <div className={`bg-white dark:bg-slate-800/60 p-4 rounded-lg border-l-4 ${emotionBorderStyles[log.emotionColor] || 'border-slate-500/50'} shadow-sm flex items-center justify-between`}>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-3xl">{log.emotionEmoji}</span>
                                                <div>
                                                    <p className="font-semibold text-slate-800 dark:text-slate-100">{log.emotionName}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 px-4">
                    <p className="text-4xl mb-4">🗂️</p>
                    <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">No History Yet</h3>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Your logged emotions will appear here once you select them from the main screen.</p>
                </div>
            )}
        </div>
    );
};

const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
.animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
@keyframes fade-in-item { 0% { opacity: 0; transform: scale(0.95) translateY(5px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
.animate-fade-in-item { opacity: 0; animation: fade-in-item 0.4s ease-out forwards; }
`;
document.head.appendChild(style);

export default HistoryView;

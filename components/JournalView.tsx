import React, { useState, useMemo } from 'react';
import { JournalEntry } from '../types';

interface JournalViewProps {
  entries: JournalEntry[];
  onSave: (entry: JournalEntry) => void;
  onDelete: (entryId: string) => void;
  onBack: () => void;
}

const getRelativeDateString = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

const PlusIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);


const JournalEditor: React.FC<{
    entry: JournalEntry | { title: string; content: string; };
    onSave: (entry: JournalEntry) => void;
    onCancel: () => void;
    onDelete?: (id: string) => void;
}> = ({ entry, onSave, onCancel, onDelete }) => {
    const [title, setTitle] = useState(entry.title);
    const [content, setContent] = useState(entry.content);
    const isNew = !('id' in entry);

    const handleSave = () => {
        const entryToSave: JournalEntry = {
            id: isNew ? `journal-${Date.now()}` : (entry as JournalEntry).id,
            title: title.trim() || 'Untitled Entry',
            content: content,
            timestamp: isNew ? Date.now() : (entry as JournalEntry).timestamp,
        };
        onSave(entryToSave);
    };

    return (
        <div className="animate-fade-in w-full flex flex-col h-full">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Entry title..."
                className="text-2xl sm:text-3xl font-bold bg-transparent focus:outline-none mb-4 pb-2 border-b border-[var(--border-primary)] w-full font-serif"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your thoughts here..."
                className="flex-grow w-full bg-transparent focus:outline-none resize-none text-lg leading-relaxed"
            />
            <footer className="p-4 bg-[var(--bg-secondary)]/50 -mx-4 -mb-4 mt-4 border-t border-[var(--border-primary)] flex justify-between items-center flex-shrink-0">
                {!isNew && onDelete && (
                    <button onClick={() => onDelete((entry as JournalEntry).id)} className="px-4 py-2 text-sm font-medium text-[var(--color-red-text)] bg-transparent hover:bg-[var(--color-red-bg)] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-red-ring)] flex items-center space-x-2">
                        <TrashIcon className="w-4 h-4" />
                        <span>Delete</span>
                    </button>
                )}
                <div className="flex-grow flex justify-end space-x-3">
                    <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-[var(--text-primary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] border border-[var(--border-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-ring)]">
                    Cancel
                    </button>
                    <button type="button" onClick={handleSave} className="px-4 py-2 text-sm font-medium text-[var(--text-on-accent)] bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-ring)]">
                    Save
                    </button>
                </div>
            </footer>
        </div>
    );
};


const JournalView: React.FC<JournalViewProps> = ({ entries, onSave, onDelete, onBack }) => {
    const [editingEntry, setEditingEntry] = useState<JournalEntry | { title: string; content: string; } | null>(null);

    const groupedEntries = useMemo(() => {
        const sortedEntries = [...entries].sort((a, b) => b.timestamp - a.timestamp);
        return sortedEntries.reduce((acc, entry) => {
            const entryDate = new Date(entry.timestamp);
            const dateString = getRelativeDateString(entryDate);
            if (!acc[dateString]) {
                acc[dateString] = [];
            }
            acc[dateString].push(entry);
            return acc;
        }, {} as Record<string, JournalEntry[]>);
    }, [entries]);

    const dateKeys = Object.keys(groupedEntries);
    
    if (editingEntry) {
        return (
            <div className="flex flex-col w-full min-h-[70vh]">
                <JournalEditor 
                    entry={editingEntry} 
                    onSave={(entry) => { onSave(entry); setEditingEntry(null); }}
                    onCancel={() => setEditingEntry(null)}
                    onDelete={(id) => { onDelete(id); setEditingEntry(null); }}
                />
            </div>
        )
    }

    return (
        <div className="flex flex-col animate-fade-in w-full pb-8">
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <button
                        onClick={onBack}
                        className="mr-2 p-2 rounded-full hover:bg-[var(--bg-hover)] transition-colors"
                        aria-label="Go back to emotion selection"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
                    </button>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] font-serif">
                        Journal
                    </h2>
                </div>
            </header>
            
            {dateKeys.length > 0 ? (
                <div className="space-y-8">
                    {dateKeys.map(dateString => (
                        <section key={dateString} aria-labelledby={`date-heading-${dateString.replace(/\s/g, '-')}`}>
                            <h3 id={`date-heading-${dateString.replace(/\s/g, '-')}`} className="text-xl font-semibold text-[var(--text-primary)]/80 mb-4 pb-2 border-b border-[var(--border-primary)]">
                                {dateString}
                            </h3>
                            <ul className="space-y-3">
                                {groupedEntries[dateString].map((entry, index) => (
                                    <li key={entry.id} className="animate-fade-in-item" style={{ animationDelay: `${index * 30}ms` }}>
                                        <button onClick={() => setEditingEntry(entry)} className="w-full text-left bg-[var(--bg-secondary)] p-4 rounded-lg shadow-sm hover:shadow-md hover:bg-[var(--bg-hover)] transition-all border border-[var(--border-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)]">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold text-[var(--text-primary)]">{entry.title}</p>
                                                    <p className="text-sm text-[var(--text-secondary)] mt-1 truncate max-w-xs sm:max-w-md">
                                                        {entry.content.substring(0, 100) || 'No additional content.'}
                                                    </p>
                                                </div>
                                                <p className="text-sm text-[var(--text-secondary)] flex-shrink-0 ml-4">
                                                    {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 px-4">
                    <p className="text-4xl mb-4">✍️</p>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]/80">Your Journal is Empty</h3>
                    <p className="text-[var(--text-secondary)] mt-2">Press the plus button to write your first entry.</p>
                </div>
            )}
            
            <button 
                onClick={() => setEditingEntry({ title: '', content: ''})}
                className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--text-on-accent)] rounded-full p-4 shadow-lg z-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] focus:ring-[var(--accent-ring)] transition-transform transform active:scale-95"
                aria-label="Add new journal entry"
            >
                <PlusIcon className="w-6 h-6" />
            </button>
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


export default JournalView;
import React, { useState, useEffect } from 'react';

interface FirstAidViewProps {
    onSelect: (type: 'overwhelmed' | 'down') => void;
    onBreathe: () => void;
    onBrowseAll: () => void;
}

const BreatheIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 12h2.5c1.5 0 2.5-1.5 2.5-3V6.5" />
        <path d="M8 17.5v-5c0-1.5 1-3 2.5-3H16" />
        <path d="M16 8.5V6" />
        <path d="M21 12h-2.5c-1.5 0-2.5 1.5-2.5 3v2.5" />
    </svg>
);

const FirstAidView: React.FC<FirstAidViewProps> = ({ onSelect, onBreathe, onBrowseAll }) => {
    const [isRendered, setIsRendered] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => setIsRendered(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const baseClass = "transition-all duration-500 ease-out-quad transform";
    const renderedClass = "opacity-100 translate-y-0";
    const initialClass = "opacity-0 translate-y-4";

    return (
        <div className="flex flex-col items-center justify-center text-center w-full min-h-[60vh] animate-fade-in">
            <h1 className={`${baseClass} ${isRendered ? renderedClass : initialClass} text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4 font-serif`} style={{ transitionDelay: '100ms' }}>
                How are you feeling right now?
            </h1>
            <p className={`${baseClass} ${isRendered ? renderedClass : initialClass} text-lg text-[var(--text-secondary)] mb-12 max-w-md`} style={{ transitionDelay: '200ms' }}>
                In a tough moment? Let's find something to help you through it.
            </p>

            <div className="w-full max-w-sm space-y-4">
                <button
                    onClick={onBreathe}
                    className={`${baseClass} ${isRendered ? renderedClass : initialClass} w-full flex items-center justify-center space-x-3 text-lg font-semibold p-5 rounded-xl bg-[var(--accent-primary)] text-[var(--text-on-accent)] hover:bg-[var(--accent-primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-ring)] ring-offset-[var(--bg-primary)] shadow-lg active:scale-95 transition-transform`}
                    style={{ transitionDelay: '300ms' }}
                >
                    <BreatheIcon className="w-6 h-6" />
                    <span>Just Breathe</span>
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <button
                        onClick={() => onSelect('overwhelmed')}
                        className={`${baseClass} ${isRendered ? renderedClass : initialClass} text-lg font-semibold p-5 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-ring)] ring-offset-[var(--bg-primary)] border border-[var(--border-primary)] shadow-sm active:scale-95 transition-transform`}
                        style={{ transitionDelay: '400ms' }}
                    >
                        Feeling Overwhelmed
                    </button>
                     <button
                        onClick={() => onSelect('down')}
                        className={`${baseClass} ${isRendered ? renderedClass : initialClass} text-lg font-semibold p-5 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-ring)] ring-offset-[var(--bg-primary)] border border-[var(--border-primary)] shadow-sm active:scale-95 transition-transform`}
                        style={{ transitionDelay: '500ms' }}
                    >
                        Feeling Down
                    </button>
                </div>
                
                <div className={`${baseClass} ${isRendered ? renderedClass : initialClass} relative flex py-2 items-center`} style={{ transitionDelay: '600ms' }}>
                    <div className="flex-grow border-t border-[var(--border-primary)]"></div>
                    <span className="flex-shrink mx-4 text-[var(--text-secondary)] text-sm">Or</span>
                    <div className="flex-grow border-t border-[var(--border-primary)]"></div>
                </div>

                <button
                    onClick={onBrowseAll}
                    className={`${baseClass} ${isRendered ? renderedClass : initialClass} w-full text-lg font-medium p-5 rounded-xl bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-ring)] ring-offset-[var(--bg-primary)] border border-[var(--border-primary)] active:scale-95 transition-transform`}
                    style={{ transitionDelay: '700ms' }}
                >
                    Browse All Feelings
                </button>
            </div>
        </div>
    );
};

const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
.animate-fade-in { animation: fade-in 0.5s ease-out-quad forwards; }
`;
document.head.appendChild(style);

export default FirstAidView;
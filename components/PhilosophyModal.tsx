import React from 'react';

interface PhilosophyModalProps {
  onClose: () => void;
}

const PhilosophyModal: React.FC<PhilosophyModalProps> = ({ onClose }) => {
  return (
    <div 
        className="fixed inset-0 bg-black/40 dark:bg-black/60 z-50 flex items-center justify-center p-4 transition-opacity"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-[var(--bg-tertiary)] w-full max-w-md rounded-lg shadow-xl flex flex-col transition-transform transform scale-100"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-[var(--border-primary)] flex-shrink-0">
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">Our Philosophy</h3>
            <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-[var(--bg-hover)]" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </header>
        <main className="p-6 text-[var(--text-secondary)] space-y-4">
            <p>
                This app was created with a single, simple mission: to provide a helpful, safe, and accessible tool for navigating the complexities of our emotional lives.
            </p>
            <ul className="list-none space-y-3">
                <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                        <strong className="text-[var(--text-primary)]">Completely Free, Forever.</strong>
                        <p>There are no hidden costs, subscriptions, or premium features. This toolkit is a gift, with no strings attached.</p>
                    </div>
                </li>
                 <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                        <strong className="text-[var(--text-primary)]">100% Private & Offline.</strong>
                        <p>Your emotional history and journal entries are your own. All data is stored <strong className="underline">only on your device</strong>. It is never sent to a server, collected, or sold. Your privacy is absolute.</p>
                    </div>
                </li>
                 <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                        <strong className="text-[var(--text-primary)]">No Ads, No Tracking.</strong>
                        <p>This space is for reflection, not for commerce. You will never be tracked, and you will never see an advertisement.</p>
                    </div>
                </li>
            </ul>
             <p className="pt-2">
                We hope you find it to be a valuable companion on your journey.
            </p>
        </main>
        <footer className="p-4 bg-[var(--bg-secondary)]/50 border-t border-[var(--border-primary)] flex justify-end">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-[var(--text-on-accent)] bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-ring)]">
                Close
            </button>
        </footer>
      </div>
    </div>
  );
};

export default PhilosophyModal;

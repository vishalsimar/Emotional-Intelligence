import React, { useState, useEffect, useRef } from 'react';

interface BreatheViewProps {
  onBack: () => void;
}

const PHASES = {
  inhale: { duration: 4, instruction: 'Inhale...' },
  hold: { duration: 4, instruction: 'Hold' },
  exhale: { duration: 6, instruction: 'Exhale...' },
};

const BreatheView: React.FC<BreatheViewProps> = ({ onBack }) => {
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [count, setCount] = useState(PHASES.inhale.duration);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const startBreathing = () => {
    setPhase('inhale');
    setCount(PHASES.inhale.duration);
  };

  const stopBreathing = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPhase('idle');
    setCount(PHASES.inhale.duration);
  };

  useEffect(() => {
    if (phase === 'idle') return;

    // Countdown timer
    intervalRef.current = window.setInterval(() => {
      setCount(prev => prev - 1);
    }, 1000);

    // Phase transition timer
    timeoutRef.current = window.setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      if (phase === 'inhale') {
        setPhase('hold');
        setCount(PHASES.hold.duration);
      } else if (phase === 'hold') {
        setPhase('exhale');
        setCount(PHASES.exhale.duration);
      } else if (phase === 'exhale') {
        setPhase('inhale');
        setCount(PHASES.inhale.duration);
      }
    }, PHASES[phase].duration * 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [phase]);

  const getCircleClass = () => {
    switch(phase) {
      case 'inhale': return `scale-150 duration-[${PHASES.inhale.duration}s]`;
      case 'exhale': return `scale-100 duration-[${PHASES.exhale.duration}s]`;
      case 'hold': return 'scale-150';
      default: return 'scale-100';
    }
  };

  const currentInstruction = phase !== 'idle' ? PHASES[phase].instruction : "Ready?";

  return (
    <div className="flex flex-col animate-fade-in w-full pb-8 h-[75vh]">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-2 p-2 rounded-full hover:bg-[var(--bg-hover)] transition-colors"
            aria-label="Go back to emotion selection"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
          </button>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            Breathe
          </h2>
        </div>
      </header>
      
      <div className="flex-grow flex flex-col items-center justify-center space-y-12">
        <div className="relative w-64 h-64 flex items-center justify-center">
            <div className={`absolute inset-0 bg-[var(--accent-primary)]/10 rounded-full transition-transform ease-linear ${getCircleClass()}`} />
            <div className="relative z-10 text-center">
                <p className="text-2xl font-semibold text-[var(--text-secondary)] mb-2">{currentInstruction}</p>
                {phase !== 'idle' && <p className="text-6xl font-bold text-[var(--accent-primary)]">{count}</p>}
            </div>
        </div>

        {phase === 'idle' ? (
          <button onClick={startBreathing} className="px-8 py-3 text-lg font-medium text-[var(--text-on-accent)] bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] focus:ring-[var(--accent-ring)]">
            Start
          </button>
        ) : (
           <button onClick={stopBreathing} className="px-8 py-3 text-lg font-medium text-[var(--text-primary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] border border-[var(--border-secondary)] rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] focus:ring-[var(--accent-ring)]">
            Stop
          </button>
        )}
      </div>
    </div>
  );
};

export default BreatheView;

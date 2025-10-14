import React, { useState, useEffect, useRef } from 'react';
import { themes, Theme } from '../themes';

interface ThemePickerProps {
    selectedThemeId: string;
    onThemeChange: (themeId: string) => void;
}

const PaletteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
    </svg>
);

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
);
  
const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const ThemePicker: React.FC<ThemePickerProps> = ({ selectedThemeId, onThemeChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);
    
    const handleThemeSelect = (themeId: string) => {
        onThemeChange(themeId);
        setIsOpen(false);
    }

    const themeEntries = Object.entries(themes);
    const firstDarkThemeIndex = themeEntries.findIndex(([, theme]) => theme.isDark);

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex-shrink-0 p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)] focus:ring-[var(--accent-ring)] transition-colors"
                aria-label="Choose theme"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <PaletteIcon />
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[var(--bg-secondary)] rounded-md shadow-lg border border-[var(--border-primary)] z-20">
                    <ul className="p-1" role="menu">
                        {themeEntries.map(([id, theme], index) => (
                            <React.Fragment key={id}>
                                {index === firstDarkThemeIndex && firstDarkThemeIndex > 0 && (
                                    <li className="my-1 px-2" role="separator">
                                        <div className="h-px bg-[var(--border-primary)]" />
                                    </li>
                                )}
                                <li>
                                    <button
                                        onClick={() => handleThemeSelect(id)}
                                        className={`w-full text-left flex items-center justify-between px-3 py-2 text-sm rounded-md ${selectedThemeId === id ? 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]' : 'text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'}`}
                                        role="menuitem"
                                    >
                                        <div className="flex items-center space-x-2">
                                            {theme.isDark ? <MoonIcon /> : <SunIcon />}
                                            <span>{theme.name}</span>
                                        </div>
                                        {selectedThemeId === id && <CheckIcon />}
                                    </button>
                                </li>
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ThemePicker;
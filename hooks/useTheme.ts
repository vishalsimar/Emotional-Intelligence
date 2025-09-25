import { useState, useEffect, useMemo } from 'react';
import { themes } from '../themes';

const getInitialThemeId = (): string => {
  try {
    const savedThemeId = window.localStorage.getItem('themeId');
    if (savedThemeId && themes[savedThemeId]) {
      return savedThemeId;
    }
    // Fallback to system preference if no theme is saved
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'default-dark';
    }
  } catch (e) {
    // Silently fail and fallback
  }
  return 'default-light';
};


export const useTheme = () => {
  const [themeId, setThemeId] = useState<string>(getInitialThemeId);

  useEffect(() => {
    const theme = themes[themeId];
    const root = window.document.documentElement;

    if (theme.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    Object.keys(theme.properties).forEach(prop => {
        root.style.setProperty(prop, theme.properties[prop]);
    });

    try {
        window.localStorage.setItem('themeId', themeId);
    } catch (e) {
        console.warn("Could not save theme preference to localStorage.");
    }

  }, [themeId]);

  const currentTheme = useMemo(() => themes[themeId], [themeId]);

  return { themeId, setThemeId, currentTheme };
};
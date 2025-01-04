'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';
import Loader from '@/components/loader';

type ThemeContextType = {
  theme?: string;
  changeTheme?: (nextTheme: string) => void;
};

export const ThemeContext = createContext<ThemeContextType>({});

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}: ThemeProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<string>('light');

  const changeTheme = (nextTheme: string) => {
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  // #region -- Load Theme
  const loadTheme = () => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    setIsMounted(true);
  };

  /* Simulate asynchronous loading to ensure the component mounts after
   * the initial render
   */
  useEffect(() => {
    setTimeout(loadTheme, 300);
  }, []);
  // #endregion -- Load Theme

  if (!isMounted) {
    return <Loader />;
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

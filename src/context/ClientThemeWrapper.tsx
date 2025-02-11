'use client';

import { PropsWithChildren, useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { FontContext } from './FontContext';
import { useEffect } from 'react';

export default function ClientThemeWrapper({ children }: PropsWithChildren) {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!theme) return;
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const { fontClass } = useContext(FontContext);
  return (
    <div data-theme={theme} data-font={fontClass}>
      {children}
    </div>
  );
}

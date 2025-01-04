'use client';

import { useChangeTheme } from '@/utils/hooks';

const ThemeSwap = () => {
  const { changeTheme, theme } = useChangeTheme();

  if (!changeTheme) {
    return null;
  }

  return (
    <div id="theme-toggler">
      <button
        type="button"
        onClick={(e) => {
          if (theme === 'light') {
            changeTheme('dark');
          }
          if (theme === 'dark') {
            changeTheme('light');
          }
        }}
      >
        <span>toggle theme</span>
      </button>
    </div>
  );
};

export default ThemeSwap;

'use client';

import { useChangeTheme } from '@/utils/hooks';

const ThemeSwap = () => {
  const { changeTheme, theme } = useChangeTheme();

  if (!changeTheme) {
    return null;
  }

  // List of available themes
  const themes = [
    { id: 'pixel-princess', label: 'Pixel Princess' },
    { id: 'rainbow', label: 'Rainbow' },
  ];

  return (
    <div id="theme-toggler">
      <label htmlFor="theme-select" className="sr-only">pick theme:</label>
      <select
        id="theme-select"
        value={theme}
        onChange={(e) => changeTheme(e.target.value)}
      >
        {themes.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSwap;

'use client';

import { useEffect, useState } from 'react';
import React from 'react';

const themes = [
  'default', 'light', 'dark', 'debut', 'fearless', 'speaknow', 'nineteen89', 'reputation', 'lover', 'folklore', 'evermore', 'midnights', 'ttpd'
]

type ThemeSwitcherProps = {
w: string;
h: string;
}

function ThemeSwitcher({ w, h }: ThemeControllerProps) {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    localStorage.setItem('theme', theme);
    const localStorageValue = localStorage.getItem('theme');
    const localTheme: string = localStorageValue !== null ? localStorageValue : 'light';
    document.querySelector('html')?.setAttribute('data-theme', localTheme);
  }, [theme]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);

    localStorage.setItem('theme', selectedTheme);
  }

  return (
    <div className='dropdown'>
      <div tabIndex={0} role='button' className='btn'>
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048">
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul tabIndex={0} className='dropdown-content bg-base-300 rounded-box z-[20] w-52 shadow-2xl'>
        {themes.map((theme) => (
          <li key={theme}>
            <input type='radio' name='theme-dropdown' className='theme-controller btn btn-sm btn-block btn-ghost justify-start' aria-label={theme.toUpperCase()} value={theme} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ThemeSwitcher

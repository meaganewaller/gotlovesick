'use client';

import ThemeSwap from '@/components/ThemeSwap';
import React from 'react';

interface LayoutProviderProps {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

export const LayoutProvider = ({
  children,
  header,
  footer,
  leftSidebar,
  rightSidebar,
}: LayoutProviderProps) => {
  if (leftSidebar && rightSidebar) {
    return (
      <div id="default-layout">
        <div id="theme-toggler" aria-hidden="true">
          <button type="button">
            <span>toggle theme</span>
          </button>
        </div>
        <div id="font-toggler" aria-hidden="true">
          <button type="button">
            <span>toggle font</span>
          </button>
        </div>
        <aside id="left-sidebar">{leftSidebar}</aside>
        <aside id="right-sidebar">{rightSidebar}</aside>
        {header}
        {children}
        {footer}
      </div>
    );
  } else if (leftSidebar) {
    return (
      <div id="left-sidebar-layout">
        <div id="theme-toggler" aria-hidden="true">
          <button type="button">
            <span>toggle theme</span>
          </button>
        </div>
        <div id="font-toggler" aria-hidden="true">
          <button type="button">
            <span>toggle font</span>
          </button>
        </div>
        <aside id="left-sidebar">{leftSidebar}</aside>
        {header}
        {children}
        {footer}
      </div>
    );
  } else if (rightSidebar) {
    return (
      <div id="right-sidebar-layout">
        <div id="theme-toggler" aria-hidden="true">
          <button type="button">
            <span>toggle theme</span>
          </button>
        </div>
        <div id="font-toggler" aria-hidden="true">
          <button type="button">
            <span>toggle font</span>
          </button>
        </div>
        {rightSidebar}
        {header}
        {children}
        {footer}
      </div>
    );
  } else {
    return (
      <div id="no-sidebar-layout">
        <ThemeSwap />
        <div id="font-toggler" aria-hidden="true">
          <button type="button">
            <span>toggle font</span>
          </button>
        </div>
        {header}
        {children}
        {footer}
      </div>
    );
  }
};

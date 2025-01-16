'use client';

import ThemeSwap from '@/components/ThemeSwap';
import FontSwap from '@/components/FontSwap';
import React from 'react';
import { usePathname } from 'next/navigation';
import { WPMenu } from '@/types';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import { useEffect } from 'react'

interface LayoutProviderProps {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  menus: { title: string, menu: WPMenu }[];
}

export const LayoutProvider = ({
  children,
  header,
  footer,
  menus,
}: LayoutProviderProps) => {
  const pathname = usePathname();

  const indexPaths = ['/'];
  const pagePaths = ['/meagan', '/about', '/colophon', '/sitemap', '/contact', '/privacy-policy'];
  const slugPaths = ['blog', 'bookmarks', 'fun-extras', 'playlists', 'shrines', 'web-directory', 'tags', 'resource-types', 'resources'];

  const useSlugPage = slugPaths.includes(pathname.split('/')[1]);

  useEffect(() => {
    if (indexPaths.includes(pathname)) {
      document.body.classList.remove("page");
      document.body.classList.add("index");
    }

    if (pagePaths.includes(pathname)) {
      document.body.classList.remove("index");
      document.body.classList.add("page");
    }

    if (useSlugPage) {
      document.body.classList.remove("index");
      document.body.classList.add("page");
    }

    if (pathname.includes('shrines')) {
      document.body.classList.add(`${pathname.split('/')[2]}-shrine`);
    }
  })

  if (indexPaths.includes(pathname)) {
    return (
      <div id="home-layout" className='layout'>
        <ThemeSwap />
        <FontSwap />
        {header}
        <Sidebar menus={menus} />
        {children}
        <RightSidebar />
        {footer}
      </div>
    )
  }

  if (useSlugPage) {
    return (
      <div id="slug-layout" className='layout'>
        <ThemeSwap />
        <FontSwap />
        {header}
        {children}
        {footer}
      </div>
    )
  }

  if (pagePaths.includes(pathname)) {
    return (
      <div id="page-layout" className='layout'>
        <ThemeSwap />
        <FontSwap />
        {header}
        <Sidebar menus={menus} />
        {children}
        {footer}
      </div>
    )
  }
};

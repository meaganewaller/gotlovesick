import type { Metadata } from 'next';
import { CONFIG } from '@/utils/config';
import Link from 'next/link';
import { LayoutProvider, MotionProvider } from '@/utils/providers';
import { ThemeProvider } from '@/context/ThemeContext';
import { FontProvider } from '@/context/FontContext';
import ClientThemeWrapper from '@/context/ClientThemeWrapper';
import Loading from '@/components/loader';

import { fetchMenu } from '@/services/graphql'
import { MenuLocationEnum } from '@/types'

import '@/styles/index.css';

export const metadata: Metadata = {
  metadataBase: CONFIG.url
    ? new URL(CONFIG.url)
    : new URL('http://lvh.me:3000'),
  title: {
    template: '%s | secret gardens',
    default: CONFIG.name,
  },
  description: CONFIG.description,
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: {
      default: CONFIG.name,
      template: '%s | secret gardens',
    },
    description: CONFIG.description,
    siteName: CONFIG.name,
    locale: 'en_US',
    type: 'website',
    url: CONFIG.url,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}

export default async function RootLayout({
  children,
  header,
  footer,
}: RootLayoutProps) {
  const fetchedSidebarMenu = await fetchMenu(MenuLocationEnum.Sidebar);
  const fetchedShrinesMenu = await fetchMenu(MenuLocationEnum.Shrines);
  const fetchedBookmarksMenu = await fetchMenu(MenuLocationEnum.Bookmarks);
  const fetchedResourcesMenu = await fetchMenu(MenuLocationEnum.Resources);

  if (!fetchedSidebarMenu.nodes ||
    !fetchedShrinesMenu.nodes ||
    !fetchedBookmarksMenu.nodes ||
    !fetchedResourcesMenu.nodes) {
    return <Loading />;
  }

  const menus = [
    { title: 'Info', menu: fetchedSidebarMenu },
    { title: 'Shrines', menu: fetchedShrinesMenu },
    { title: 'Collections', menu: fetchedBookmarksMenu },
    { title: 'Resources', menu: fetchedResourcesMenu },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <noscript id="no-js-warning">
          Please enable JavaScript to be able to use all functions of this
          website!
        </noscript>
        <MotionProvider>
          <ThemeProvider>
            <FontProvider>
              <ClientThemeWrapper>
                <Link href="#main" id="skip-to-content-link">
                  Skip to content
                </Link>
                <Link href="/sitemap" id="skip-to-sitemap-link">
                  Go to Sitemap
                </Link>
                <LayoutProvider menus={menus} header={header} footer={footer}>
                  {children}
                </LayoutProvider>
              </ClientThemeWrapper>
            </FontProvider>
          </ThemeProvider>
        </MotionProvider>
      </body>
    </html>
  );
}

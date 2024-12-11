import config from '@/lib/config'
import type { Metadata, Viewport } from 'next'
import '@/styles/globals.scss'
import 'flex-layout-attribute'

/**
 * Setup metadata.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: `${config.siteName} - ${config.siteDescription}`,
  description: config.siteDescription
}

/**
 * Setup viewport.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#18181b'
}

/**
 * Root layout component.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
 */
export default function RootLayout({ children, header, footer }: { children: React.ReactNode, header: React.ReactNode, footer: React.ReactNode; }) {
  return (
    <html lang="en" suppressHydrationWarning className={'font-sans 2xl:text-[24px]'}>
      <body className='debug-screens bg-clouds'>
        <main>
          <section id="root-layout" layout="column">
            {header}
            {children}
            {footer}
          </section>
        </main>
      </body>
    </html>
  )
}

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import HeaderNav from '@/components/HeaderNav'
import Sidebar from '@/components/Sidebar'
import UpdateLog from '@/components/UpdateLog'
import AccessCounter from '@/components/AccessCounter'
import config from '@/lib/config'
import type {Metadata, Viewport} from 'next'
import './globals.css'
import 'flex-layout-attribute'
import Script from 'next/script'

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
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <main>
          <section id="root-layout" layout="column">
            <div layout="row md-column center-justify">
              <div self="md-half sm-full">
                <Header />
              </div>
              <div self="md-half sm-full">
                <HeaderNav />
              </div>
            </div>
            <div layout="lg-column" self="size-x1">
              <div self="size-x1">
                <Sidebar />
              </div>
              <div self="size-x3 sm-first">{children}</div>
              <div self="size-x1">
                <UpdateLog />
              </div>
            </div>
            <div layout="rows-justify">
              <hr className="border-t-2 border-lime-500 w-full border-dashed" />
              <div self="sm-full">
                <Footer />
              </div>
              <div self="sm-full">
                <AccessCounter />
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  )
}

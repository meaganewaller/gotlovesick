import { Mulish } from "next/font/google";
import "./globals.css";
import Header from '@/components/header';

const mulish = Mulish({
  subsets: ['latin'],
  variable: '--font-sans'
})

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: '%s | secret gardens',
    default: 'welcome to my secret gardens'
  },
  robots: {
    index: true,
    follow: true
  },
  description: "The fastest way to build apps with Next.js and Supabase",
};

export const viewport = {
  themeColor: '#1D232A',
  colorScheme: 'dark'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`font-sans ${mulish.variable}`}>
      <body>
        <div className='m-auto min-w-[350px] max-w-6xl'>
          <Header />
          <main className="pt-header-buffer flex min-h-screen flex-col justify-center pb-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import ToggleTheme from '@/shared/components/ui/ToggleTheme';
import { MainProvider } from '@/shared/providers';
import '@/shared/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    absolute: 'Fullstack auth',
    template: '%s | Fullstack auth',
  },
  description:
    "It's a pet project to demostrate the full cycle of users authorization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainProvider>
          <div className='relative flex min-h-screen flex-col'>
            <ToggleTheme className='absolute top-5 left-5' />

            <div className='flex h-screen w-full items-center justify-center px-4'>
              {children}
            </div>
          </div>
        </MainProvider>
      </body>
    </html>
  );
}

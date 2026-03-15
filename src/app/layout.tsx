import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'SaaS Launch Engine | Validate Your Startup in Seconds',
  description: 'AI powered platform that turns any business or SaaS idea into a validated, launch ready blueprint within seconds.',
  manifest: '/manifest.json',
  openGraph: {
    title: 'SaaS Launch Engine | Validate Your Startup in Seconds',
    description: 'Turns any business idea into a validated, launch ready blueprint within seconds.',
  }
};

export const viewport = {
  themeColor: '#030303',
};


import { Providers } from '@/components/Providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}


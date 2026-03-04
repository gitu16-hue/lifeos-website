import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LifeOS - The AI Operating System',
  description: 'Your AI co-pilot that designs, executes, and optimizes your life.',
  icons: {
    icon: [
      { url: '/assets/lifeos-logo.jpeg', sizes: 'any', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/assets/lifeos-logo.jpeg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Force browser to use your logo as favicon */}
        <link rel="icon" href="/assets/lifeos-logo.jpeg" />
        <link rel="apple-touch-icon" href="/assets/lifeos-logo.jpeg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
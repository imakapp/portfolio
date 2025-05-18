import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap' 
});

export const metadata: Metadata = {
  title: 'IMAK.UK - Mobile Development Portfolio',
  description: 'Aejaz Khan - Mobile App Developer specializing in React Native, Flutter, Swift, and Kotlin development',
  metadataBase: new URL('https://imak.uk'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${inter.className} h-full text-base-content bg-gradient-to-br from-gray-900 via-black to-gray-900`}>
        {children}
      </body>
    </html>
  );
} 
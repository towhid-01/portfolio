import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Towhid Sarker | Unity Game Developer',
  description: 'Portfolio of Towhid Sarker – Unity Game Developer specializing in puzzle mechanics, smooth UI animation, and creative game design.',
  keywords: ['Unity', 'Game Developer', 'Towhid Sarker', 'towhid', 'Towhid', 'sarker', 'Puzzle Games', 'UI Animation', 'C#', 'AR Development'],
  authors: [{ name: 'Towhid Sarker', url: 'https://towhidsarker.com' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Towhid Sarker | Unity Game Developer',
    description: 'Unity Game Developer specializing in puzzle games, educational experiences, and smooth UI animations.',
    url: 'https://towhidsarker.com',
    siteName: 'Towhid Sarker Portfolio',
    images: [
      {
        url: 'https://towhidsarker.com/icon-512.png',
        width: 512,
        height: 512,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Towhid Sarker | Unity Game Developer',
    description: 'Unity Game Developer specializing in puzzle games and UI animations.',
    images: ['https://towhidsarker.com/icon-512.png'],
  },
  metadataBase: new URL('https://towhidsarker.com'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
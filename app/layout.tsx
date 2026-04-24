import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Towhid Sarker | Unity Game Developer',
  description: 'Portfolio of Towhid Sarker – Unity Game Developer from Bangladesh specializing in puzzle mechanics, game development, smooth UI animation, and creative game design.',
  keywords: [
    'Towhid', 'Towhid Sarker', 'towhid', 'sarker',
    'Unity', 'Unity Game Developer', 'game developer', 'game development',
    'indie game developer', 'game developer portfolio',
    'Unity game developer Bangladesh', 'Bangladesh game developer',
    'Puzzle Games', 'UI Animation', 'C#', 'AR Development',
    'game designer', 'mobile game developer',
  ],
  alternates: {
    canonical: 'https://towhidsarker.com',
  },
  authors: [{ name: 'Towhid Sarker', url: 'https://towhidsarker.com' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Towhid Sarker | Unity Game Developer',
    description: 'Unity Game Developer from Bangladesh specializing in puzzle games, educational experiences, and smooth UI animations.',
    url: 'https://towhidsarker.com',
    siteName: 'Towhid Sarker Portfolio',
    images: [
      {
        url: 'https://towhidsarker.com/icon-512.png',
        width: 512,
        height: 512,
        alt: 'Towhid Sarker - Unity Game Developer Portfolio',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Towhid Sarker | Unity Game Developer',
    description: 'Unity Game Developer from Bangladesh specializing in puzzle games and UI animations.',
    images: ['https://towhidsarker.com/icon-512.png'],
  },
  metadataBase: new URL('https://towhidsarker.com'),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Towhid Sarker',
  jobTitle: 'Unity Game Developer',
  url: 'https://towhidsarker.com',
  email: 'towhid.sarker3@gmail.com',
  sameAs: [
    'https://www.linkedin.com/in/towhid-sarker/',
    'https://github.com/towhid-01',
  ],
  description: 'Unity Game Developer from Bangladesh specializing in puzzle games, educational experiences, and smooth UI animations. Currently working at Visiontillion.',
  knowsAbout: ['Unity', 'C#', 'Game Development', 'Puzzle Games', 'UI Animation', 'AR Development', 'Game Design'],
  nationality: 'Bangladeshi',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Towhid Sarker | Unity Game Developer',
  description: 'Portfolio of Towhid Sarker – Unity Game Developer specializing in puzzle mechanics, smooth UI animation, and creative game design.',
  keywords: ['Unity', 'Game Developer', 'Towhid Sarker', 'Puzzle Games', 'UI Animation', 'C#', 'AR Development'],
  authors: [{ name: 'Towhid Sarker', url: 'https://towhidsarker.netlify.app/' }],
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

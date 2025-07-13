import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Towhid Sarker | Game Developer & Programmer',
  description: 'Welcome to my personal portfolio. I’m Towhid Sarker — a passionate game developer and programmer. Explore my projects, skills, and experience.',
  keywords: ['Towhid Sarker', 'Game Developer', 'Unity Developer', 'Portfolio', 'Indie Games'],
  authors: [{ name: 'Towhid Sarker' }],
  themeColor: '#000000',
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

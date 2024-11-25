import './globals.css'
import { Inter } from 'next/font/google'
import MainLayout from '@/layouts/MainLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Favour Bawa Portfolio',
  description: 'A web-design showcase of my work and skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  )
}
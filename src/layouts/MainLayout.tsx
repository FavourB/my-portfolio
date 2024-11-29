'use client'
import React from 'react'
import { ThemeProvider } from '@/context/ThemeContext'
import { ActiveSectionProvider } from '@/context/ActiveSectionContext'
import CustomCursor from '@/components/common/CustomCursor'
import Navbar from '@/components/common/Navbar'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <ThemeProvider>
      <ActiveSectionProvider>
        <div 
          className={cn(
            "relative min-h-screen overflow-x-hidden overflow-y-auto", 
            className
          )}
        ><CustomCursor />
          <Navbar />
          
          <main className="overflow-y-auto">
            {children}
          </main><CustomCursor />
        </div>
      </ActiveSectionProvider>
    </ThemeProvider>
  )
}
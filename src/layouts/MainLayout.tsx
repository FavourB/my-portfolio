import { ThemeProvider } from '@/context/ThemeContext'
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
      <div className={cn("relative min-h-screen", className)}>
        <Navbar />
        <CustomCursor />
        <main>
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}
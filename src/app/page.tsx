import MainLayout from '@/layouts/MainLayout'
import Hero from '@/app/hero/page'
import About from '@/app/about/page'
import Portfolio from '@/app/portfolio/page'
import Blog from '@/app/blog/page'
import Contact from '@/app/contact/page'

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <About />
      <Portfolio />
      <Blog />
      <Contact />
    </MainLayout>
  )
}
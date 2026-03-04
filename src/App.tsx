import { Routes, Route } from 'react-router-dom'
import { Navigation, Footer } from './components/layout'
import { Hero } from './components/hero'
import { About } from './components/about'
import { Experience } from './components/experience'
import { Projects } from './components/projects'
import { Contact } from './components/contact'
import { ThemeProvider } from './context/ThemeContext'
import { TelevisionPage } from './pages/TelevisionPage'
import { StagePage } from './pages/StagePage'
import { NotFound } from './pages/NotFound'

function HomePage() {
  return (
    <ThemeProvider>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tv" element={<TelevisionPage />} />
      <Route path="/stage" element={<StagePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App

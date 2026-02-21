import { Navigation, Footer } from './components/layout'
import { Hero } from './components/hero'
import { About } from './components/about'
import { Experience } from './components/experience'
import { Projects } from './components/projects'
import { Contact } from './components/contact'
import { ThemeProvider } from './context/ThemeContext'

function App() {
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

export default App

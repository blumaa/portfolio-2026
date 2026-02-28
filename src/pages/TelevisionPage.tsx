import { TelevisionPreview } from '../components/animations/TelevisionPreview'
import { ThemeProvider } from '../context/ThemeContext'

function TelevisionPage() {
  return (
    <ThemeProvider>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          padding: '2rem',
        }}
      >
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <TelevisionPreview />
        </div>
      </div>
    </ThemeProvider>
  )
}

export { TelevisionPage }

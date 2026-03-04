import { PadelPointBerlin } from '../components/animations/PadelPointBerlin'
import { ThemeProvider } from '../context/ThemeContext'

function StagePage() {
  return (
    <ThemeProvider>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <div style={{ maxWidth: '500px', width: '100%' }}>
          <PadelPointBerlin />
        </div>
      </div>
    </ThemeProvider>
  )
}

export { StagePage }

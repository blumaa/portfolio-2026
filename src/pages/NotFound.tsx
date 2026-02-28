import { Link } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext'

function NotFound() {
  return (
    <ThemeProvider>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-background)',
          color: 'var(--color-text)',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '6rem', margin: 0, fontWeight: 700 }}>404</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.8 }}>
          Page not found
        </p>
        <Link
          to="/"
          style={{
            padding: '0.75rem 1.5rem',
            background: 'var(--color-primary)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 500,
            transition: 'opacity 0.2s',
          }}
        >
          Go Home
        </Link>
      </div>
    </ThemeProvider>
  )
}

export { NotFound }

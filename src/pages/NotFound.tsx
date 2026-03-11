import { Link } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext'
import styles from './NotFound.module.css'

function NotFound() {
  return (
    <ThemeProvider>
      <div className={styles.page}>
        <h1 className={styles.heading}>404</h1>
        <p className={styles.message}>Page not found</p>
        <Link to="/" className={styles.link}>
          Go Home
        </Link>
      </div>
    </ThemeProvider>
  )
}

export { NotFound }

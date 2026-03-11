import { PadelPointBerlin } from '../components/animations/PadelPointBerlin'
import { ThemeProvider } from '../context/ThemeContext'
import styles from './StagePage.module.css'

function StagePage() {
  return (
    <ThemeProvider>
      <div className={styles.page}>
        <div className={styles.container}>
          <PadelPointBerlin />
        </div>
      </div>
    </ThemeProvider>
  )
}

export { StagePage }

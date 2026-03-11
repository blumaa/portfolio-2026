import { TelevisionPreview } from '../components/animations/TelevisionPreview'
import { ThemeProvider } from '../context/ThemeContext'
import styles from './TelevisionPage.module.css'

function TelevisionPage() {
  return (
    <ThemeProvider>
      <div className={styles.page}>
        <div className={styles.container}>
          <TelevisionPreview />
        </div>
      </div>
    </ThemeProvider>
  )
}

export { TelevisionPage }

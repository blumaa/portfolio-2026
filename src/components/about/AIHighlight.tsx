import { motion } from 'framer-motion'
import styles from './AIHighlight.module.css'

function AIHighlight() {
  return (
    <motion.div
      className={styles.highlight}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.icon}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>AI-Augmented Development</h4>
        <p className={styles.text}>
          I use AI as a <strong>superpower</strong>. AI coding assistants and agentic workflows help me
          develop in ways I could not have foreseen five years ago-- faster, larger scale, more complex.
          However-- I do not sacrifice code quality for speed. I still believe that code
          needs to be reviewed by developers and that AI needs to be properly managed. But what an exciting time!
        </p>
      </div>
    </motion.div>
  )
}

export { AIHighlight }

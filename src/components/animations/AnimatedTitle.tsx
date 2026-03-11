import { motion } from 'framer-motion'
import styles from './AnimatedTitle.module.css'

const sentence = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
}

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

const title = 'animation gallery'

export function AnimatedTitle() {
  return (
    <motion.div
      variants={sentence}
      initial="hidden"
      animate="visible"
      className={styles.title}
    >
      {title.split('').map((char, index) => {
        return (
          <motion.span key={char + index} variants={letter} className={styles.letter}>
            <span className={styles.letterText}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          </motion.span>
        )
      })}
    </motion.div>
  )
}

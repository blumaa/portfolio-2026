import { motion } from 'framer-motion'

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
      style={{ fontSize: '1.5rem', whiteSpace: 'nowrap' }}
    >
      {title.split('').map((char, index) => {
        return (
          <motion.span key={char + index} variants={letter} style={{ display: 'inline-block' }}>
            <span style={{ fontSize: 'xl', color: 'var(--color-text-primary)' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          </motion.span>
        )
      })}
    </motion.div>
  )
}

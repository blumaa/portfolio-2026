import { useState, type ComponentType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lighthouse } from './Lighthouse'
import { RustlingGrass } from './RustlingGrass'
import styles from './AnimationGalleryPreview.module.css'

const ANIMATIONS: { component: ComponentType; name: string }[] = [
  { component: Lighthouse, name: 'Lighthouse' },
  { component: RustlingGrass, name: 'Rustling Grass' },
]

function AnimationGalleryPreview() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + ANIMATIONS.length) % ANIMATIONS.length)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % ANIMATIONS.length)
  }

  const CurrentAnimation = ANIMATIONS[currentIndex].component

  return (
    <div className={styles.container}>
      <div className={styles.animationWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.animation}
          >
            <CurrentAnimation />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <button className={styles.navButton} onClick={handlePrev} aria-label="Previous animation">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.info}>
          <span className={styles.name}>{ANIMATIONS[currentIndex].name}</span>
          <span className={styles.counter}>
            {currentIndex + 1} / {ANIMATIONS.length}
          </span>
        </div>

        <button className={styles.navButton} onClick={handleNext} aria-label="Next animation">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export { AnimationGalleryPreview }

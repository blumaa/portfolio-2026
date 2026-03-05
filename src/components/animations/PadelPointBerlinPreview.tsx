import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './AnimationGalleryPreview.module.css'

const SCREENSHOTS = [
  { src: '/padel-point-berlin-4.png', name: 'Dark Mode' },
  { src: '/padel-point-berlin-3.png', name: 'Filters' },
  { src: '/padel-point-berlin-2.png', name: 'Add Match' },
  { src: '/padel-point-berlin-1.png', name: 'Light Mode' },
]

function PadelPointBerlinPreview() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let count = 0
    SCREENSHOTS.forEach(({ src }) => {
      const img = new Image()
      img.onload = () => {
        count++
        if (count === SCREENSHOTS.length) setLoaded(true)
      }
      img.src = src
    })
  }, [])

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + SCREENSHOTS.length) % SCREENSHOTS.length)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % SCREENSHOTS.length)
  }

  if (!loaded) {
    return (
      <div className={styles.container}>
        <div className={styles.animationWrapper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
          <div style={{ width: 32, height: 32, border: '3px solid var(--color-border)', borderTopColor: 'var(--color-accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
      </div>
    )
  }

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
            <img
              src={SCREENSHOTS[currentIndex].src}
              alt={`Padel Point Berlin - ${SCREENSHOTS[currentIndex].name}`}
              style={{ width: '100%', display: 'block' }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <button className={styles.navButton} onClick={handlePrev} aria-label="Previous screenshot">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.info}>
          <span className={styles.name}>{SCREENSHOTS[currentIndex].name}</span>
          <span className={styles.counter}>
            {currentIndex + 1} / {SCREENSHOTS.length}
          </span>
        </div>

        <button className={styles.navButton} onClick={handleNext} aria-label="Next screenshot">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export { PadelPointBerlinPreview }

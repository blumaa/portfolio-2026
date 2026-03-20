import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Carousel.module.css'

interface CarouselItem {
  name: string
}

interface CarouselProps<T extends CarouselItem> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
}

function Carousel<T extends CarouselItem>({ items, renderItem, className }: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  return (
    <div
      className={`${styles.container} ${className ?? ''}`}
      role="group"
      aria-roledescription="carousel"
      aria-label="Image carousel"
    >
      <div className={styles.contentWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.content}
            role="group"
            aria-roledescription="slide"
            aria-label={`${currentIndex + 1} of ${items.length}: ${items[currentIndex].name}`}
          >
            {renderItem(items[currentIndex], currentIndex)}
          </motion.div>
        </AnimatePresence>
      </div>

      {items.length > 1 && (
        <div className={styles.controls}>
          <button className={styles.navButton} onClick={handlePrev} aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className={styles.info}>
            <span className={styles.name}>{items[currentIndex].name}</span>
            <span className={styles.counter}>
              {currentIndex + 1} / {items.length}
            </span>
          </div>

          <button className={styles.navButton} onClick={handleNext} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export { Carousel }
export type { CarouselItem }

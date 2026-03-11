import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import sharedStyles from './AnimationGalleryPreview.module.css'
import styles from './ScreenshotCarousel.module.css'

interface ScreenshotCarouselProps {
  screenshots: { src: string; name: string }[]
  alt: string
  orientation?: 'portrait' | 'landscape'
}

function ScreenshotCarousel({ screenshots, alt, orientation = 'portrait' }: ScreenshotCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let count = 0
    screenshots.forEach(({ src }) => {
      const img = new Image()
      img.onload = () => {
        count++
        if (count === screenshots.length) setLoaded(true)
      }
      img.src = src
    })
  }, [screenshots])

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }

  const imageClass = orientation === 'portrait' ? styles.portraitImage : styles.landscapeImage

  if (!loaded) {
    return (
      <div className={sharedStyles.container}>
        <div className={`${sharedStyles.animationWrapper} ${styles.screenshotWrapper}`}>
          <div className={styles.spinner} />
        </div>
      </div>
    )
  }

  return (
    <div className={sharedStyles.container}>
      <div className={`${sharedStyles.animationWrapper} ${styles.screenshotWrapper}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={sharedStyles.animation}
          >
            <img
              src={screenshots[currentIndex].src}
              alt={`${alt} - ${screenshots[currentIndex].name}`}
              className={imageClass}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={sharedStyles.controls}>
        <button className={sharedStyles.navButton} onClick={handlePrev} aria-label="Previous screenshot">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={sharedStyles.info}>
          <span className={sharedStyles.name}>{screenshots[currentIndex].name}</span>
          <span className={sharedStyles.counter}>
            {currentIndex + 1} / {screenshots.length}
          </span>
        </div>

        <button className={sharedStyles.navButton} onClick={handleNext} aria-label="Next screenshot">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export { ScreenshotCarousel }

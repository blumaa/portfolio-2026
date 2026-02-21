import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './FuturisticText.module.css'

export interface FuturisticTextProps {
  phrases: string[]
  className?: string
}

const glitchChars = '!<>-_\\/[]{}—=+*^?#________'

function FuturisticText({ phrases, className = '' }: FuturisticTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDecoding, setIsDecoding] = useState(true)
  const [glitchActive, setGlitchActive] = useState(false)

  const currentPhrase = phrases[phraseIndex]

  const decode = useCallback(() => {
    let iteration = 0
    const maxIterations = currentPhrase.length

    const interval = setInterval(() => {
      setDisplayText(
        currentPhrase
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return char
            }
            if (char === ' ') return ' '
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          })
          .join('')
      )

      if (iteration >= maxIterations) {
        clearInterval(interval)
        setIsDecoding(false)

        // Wait, then trigger glitch and move to next phrase
        setTimeout(() => {
          setGlitchActive(true)
          setTimeout(() => {
            setGlitchActive(false)
            setPhraseIndex((prev) => (prev + 1) % phrases.length)
            setIsDecoding(true)
          }, 300)
        }, 2500)
      }

      iteration += 1 / 3
    }, 30)

    return () => clearInterval(interval)
  }, [currentPhrase, phrases.length])

  useEffect(() => {
    if (isDecoding) {
      return decode()
    }
  }, [isDecoding, decode])

  return (
    <div className={`${styles.container} ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={phraseIndex}
          className={`${styles.text} ${glitchActive ? styles.glitch : ''}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          data-text={displayText}
        >
          {displayText}
        </motion.span>
      </AnimatePresence>
      <span className={styles.cursor}>_</span>
    </div>
  )
}

export { FuturisticText }

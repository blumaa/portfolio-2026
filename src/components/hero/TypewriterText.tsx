import { useState, useEffect, useCallback, useRef } from 'react'
import styles from './TypewriterText.module.css'

export interface TypewriterTextProps {
  phrases: string[]
  className?: string
}

// Typewriter sound simulation with visual feedback
function TypewriterText({ phrases, className = '' }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [keyStrike, setKeyStrike] = useState(false)
  const strikeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const currentPhrase = phrases[phraseIndex]

  const triggerStrike = useCallback(() => {
    setKeyStrike(true)
    if (strikeTimeoutRef.current) {
      clearTimeout(strikeTimeoutRef.current)
    }
    strikeTimeoutRef.current = setTimeout(() => setKeyStrike(false), 50)
  }, [])

  const typeCharacter = useCallback(() => {
    if (isPaused) return

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentPhrase.length) {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1))
        triggerStrike()
      } else {
        // Finished typing, pause before deleting
        setIsPaused(true)
        setTimeout(() => {
          setIsPaused(false)
          setIsDeleting(true)
        }, 2500)
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1))
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % phrases.length)
      }
    }
  }, [displayText, currentPhrase, isDeleting, isPaused, phrases.length, triggerStrike])

  useEffect(() => {
    if (isPaused) return

    // Add slight randomness to typing speed for realism
    const baseSpeed = isDeleting ? 30 : 100
    const randomVariation = Math.random() * 50
    const speed = baseSpeed + randomVariation

    const timer = setTimeout(typeCharacter, speed)
    return () => clearTimeout(timer)
  }, [typeCharacter, isDeleting, isPaused])

  return (
    <div className={`${styles.container} ${className}`}>
      <span className={`${styles.text} ${keyStrike ? styles.strike : ''}`}>
        {displayText}
        <span className={styles.cursor} aria-hidden="true" />
      </span>
    </div>
  )
}

export { TypewriterText }

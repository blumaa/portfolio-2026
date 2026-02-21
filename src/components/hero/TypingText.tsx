import { useState, useEffect, useCallback } from 'react'
import styles from './TypingText.module.css'

export interface TypingTextProps {
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseTime?: number
  className?: string
}

function TypingText({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseTime = 2000,
  className = '',
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const currentPhrase = phrases[phraseIndex]

  const typeCharacter = useCallback(() => {
    if (isPaused) return

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentPhrase.length) {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1))
      } else {
        // Finished typing, pause before deleting
        setIsPaused(true)
        setTimeout(() => {
          setIsPaused(false)
          setIsDeleting(true)
        }, pauseTime)
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
  }, [displayText, currentPhrase, isDeleting, isPaused, pauseTime, phrases.length])

  useEffect(() => {
    if (isPaused) return

    const speed = isDeleting ? deletingSpeed : typingSpeed
    const timer = setTimeout(typeCharacter, speed)

    return () => clearTimeout(timer)
  }, [typeCharacter, isDeleting, typingSpeed, deletingSpeed, isPaused])

  return (
    <span data-testid="typing-text" className={`${styles.typingText} ${className}`}>
      {displayText}
      <span data-testid="typing-cursor" className={styles.cursor} aria-hidden="true">
        |
      </span>
    </span>
  )
}

export { TypingText }

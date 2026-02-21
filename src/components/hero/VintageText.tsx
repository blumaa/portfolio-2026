import { useState, useEffect, useCallback } from 'react'
import styles from './VintageText.module.css'

export interface VintageTextProps {
  phrases: string[]
  className?: string
}

function VintageText({ phrases, className = '' }: VintageTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const currentPhrase = phrases[phraseIndex]

  const type = useCallback(() => {
    if (!isDeleting) {
      if (charIndex < currentPhrase.length) {
        setDisplayText(currentPhrase.slice(0, charIndex + 1))
        setCharIndex((prev) => prev + 1)
      } else {
        setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (charIndex > 0) {
        setDisplayText(currentPhrase.slice(0, charIndex - 1))
        setCharIndex((prev) => prev - 1)
      } else {
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % phrases.length)
      }
    }
  }, [charIndex, currentPhrase, isDeleting, phrases.length])

  useEffect(() => {
    const speed = isDeleting ? 40 : 80
    const timer = setTimeout(type, speed)
    return () => clearTimeout(timer)
  }, [type, isDeleting])

  return (
    <div className={`${styles.container} ${className}`}>
      <span className={styles.prompt}>{'>'}</span>
      <span className={styles.text}>{displayText}</span>
      <span className={styles.cursor}>_</span>
    </div>
  )
}

export { VintageText }

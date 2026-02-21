import styles from './Marquee.module.css'

export interface MarqueeProps {
  text: string
  className?: string
}

function Marquee({ text, className = '' }: MarqueeProps) {
  // Repeat text multiple times to ensure smooth loop
  const repeatedText = Array(10).fill(text).join(' • ')

  return (
    <div className={`${styles.marquee} ${className}`} aria-hidden="true">
      <div className={styles.track}>
        <span className={styles.content}>{repeatedText}</span>
        <span className={styles.content}>{repeatedText}</span>
      </div>
    </div>
  )
}

export { Marquee }

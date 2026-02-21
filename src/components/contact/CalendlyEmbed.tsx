import { useEffect } from 'react'
import styles from './CalendlyEmbed.module.css'

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string
        parentElement: HTMLElement | null
        prefill?: Record<string, string>
        utm?: Record<string, string>
      }) => void
    }
  }
}

export interface CalendlyEmbedProps {
  url?: string
  className?: string
}

function CalendlyEmbed({
  url = 'https://calendly.com/blumaa',
  className = '',
}: CalendlyEmbedProps) {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    // Load Calendly styles
    const link = document.createElement('link')
    link.href = 'https://assets.calendly.com/assets/external/widget.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    return () => {
      // Cleanup
      document.body.removeChild(script)
      document.head.removeChild(link)
    }
  }, [])

  return (
    <div className={`${styles.container} ${className}`}>
      <div
        className={`calendly-inline-widget ${styles.widget}`}
        data-url={url}
      />
    </div>
  )
}

export { CalendlyEmbed }

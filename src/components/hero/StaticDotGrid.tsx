import { useRef, useEffect, useCallback } from 'react'
import styles from './InteractiveGrid.module.css'

export interface StaticDotGridProps {
  dotSpacing?: number
  dotSize?: number
  className?: string
}

function StaticDotGrid({
  dotSpacing = 30,
  dotSize = 2,
  className = '',
}: StaticDotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    const cols = Math.ceil(rect.width / dotSpacing) + 1
    const rows = Math.ceil(rect.height / dotSpacing) + 1

    // Get CSS custom property for accent color
    const accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-accent')
      .trim() || '#4a235a'

    // Parse the hex color
    const r = parseInt(accentColor.slice(1, 3), 16)
    const g = parseInt(accentColor.slice(3, 5), 16)
    const b = parseInt(accentColor.slice(5, 7), 16)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        ctx.beginPath()
        ctx.arc(i * dotSpacing, j * dotSpacing, dotSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.25)`
        ctx.fill()
      }
    }
  }, [dotSpacing, dotSize])

  useEffect(() => {
    draw()
    window.addEventListener('resize', draw)

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          draw()
        }
      })
    })
    observer.observe(document.documentElement, { attributes: true })

    return () => {
      window.removeEventListener('resize', draw)
      observer.disconnect()
    }
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.grid} ${className}`}
      aria-hidden="true"
    />
  )
}

export { StaticDotGrid }

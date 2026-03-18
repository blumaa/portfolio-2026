import { useRef, useEffect, useCallback } from 'react'
import { useThemeContext } from '../../context/ThemeContext'
import { parseAccentColor } from '../../lib/css'
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
  const { mode } = useThemeContext()

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

    const { r, g, b } = parseAccentColor()

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
    return () => window.removeEventListener('resize', draw)
  }, [draw, mode])

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.grid} ${className}`}
      aria-hidden="true"
    />
  )
}

export { StaticDotGrid }

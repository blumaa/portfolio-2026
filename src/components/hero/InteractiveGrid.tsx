import { useRef, useEffect, useCallback } from 'react'
import styles from './InteractiveGrid.module.css'

export interface InteractiveGridProps {
  dotSpacing?: number
  dotSize?: number
  glowRadius?: number
  className?: string
}

interface Dot {
  x: number
  y: number
  baseOpacity: number
  currentOpacity: number
  targetOpacity: number
}

interface Pulse {
  x: number
  y: number
  radius: number
  maxRadius: number
  speed: number
  opacity: number
}

function InteractiveGrid({
  dotSpacing = 30,
  dotSize = 2,
  glowRadius = 150,
  className = '',
}: InteractiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const dotsRef = useRef<Dot[]>([])
  const pulsesRef = useRef<Pulse[]>([])
  const animationRef = useRef<number | null>(null)
  const lastPulseTimeRef = useRef(0)

  const initDots = useCallback((width: number, height: number) => {
    const dots: Dot[] = []
    const cols = Math.ceil(width / dotSpacing) + 1
    const rows = Math.ceil(height / dotSpacing) + 1

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({
          x: i * dotSpacing,
          y: j * dotSpacing,
          baseOpacity: 0.25,
          currentOpacity: 0.25,
          targetOpacity: 0.25,
        })
      }
    }

    dotsRef.current = dots
  }, [dotSpacing])

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  }

  const createPulse = useCallback((canvasWidth: number, canvasHeight: number) => {
    const pulse: Pulse = {
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      radius: 0,
      maxRadius: 200 + Math.random() * 150,
      speed: 2 + Math.random() * 2,
      opacity: 0.6 + Math.random() * 0.3,
    }
    pulsesRef.current.push(pulse)
  }, [])

  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { x: mouseX, y: mouseY } = mouseRef.current

    // Create new pulses periodically
    if (timestamp - lastPulseTimeRef.current > 1500 + Math.random() * 2000) {
      createPulse(canvas.width, canvas.height)
      lastPulseTimeRef.current = timestamp
    }

    // Update pulses
    pulsesRef.current = pulsesRef.current.filter((pulse) => {
      pulse.radius += pulse.speed
      return pulse.radius < pulse.maxRadius
    })

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Get CSS custom property for accent color
    const accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-accent')
      .trim() || '#4a235a'

    // Parse the hex color
    const r = parseInt(accentColor.slice(1, 3), 16)
    const g = parseInt(accentColor.slice(3, 5), 16)
    const b = parseInt(accentColor.slice(5, 7), 16)

    dotsRef.current.forEach((dot) => {
      // Mouse hover effect (desktop)
      const mouseDistance = calculateDistance(dot.x, dot.y, mouseX, mouseY)
      let mouseIntensity = 0
      if (mouseDistance < glowRadius) {
        mouseIntensity = (1 - mouseDistance / glowRadius) * 0.7
      }

      // Pulse/lightning effect (works on all devices)
      let pulseIntensity = 0
      pulsesRef.current.forEach((pulse) => {
        const pulseDistance = calculateDistance(dot.x, dot.y, pulse.x, pulse.y)
        const ringWidth = 40
        const distanceFromRing = Math.abs(pulseDistance - pulse.radius)

        if (distanceFromRing < ringWidth) {
          const fadeProgress = pulse.radius / pulse.maxRadius
          const ringIntensity = (1 - distanceFromRing / ringWidth) * pulse.opacity * (1 - fadeProgress)
          pulseIntensity = Math.max(pulseIntensity, ringIntensity)
        }
      })

      // Combine effects
      dot.targetOpacity = dot.baseOpacity + Math.max(mouseIntensity, pulseIntensity)

      // Smooth transition
      dot.currentOpacity += (dot.targetOpacity - dot.currentOpacity) * 0.15

      ctx.beginPath()
      ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dot.currentOpacity})`
      ctx.fill()
    })

    animationRef.current = requestAnimationFrame(animate)
  }, [dotSize, glowRadius, createPulse])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      initDots(rect.width, rect.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate, initDots])

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.grid} ${className}`}
      aria-hidden="true"
    />
  )
}

export { InteractiveGrid }

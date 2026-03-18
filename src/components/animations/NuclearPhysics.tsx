import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

export function NuclearPhysics() {
  const svgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const ctx = gsap.context(() => {
      // Rotate the entire orbital system slowly
      gsap.to('#orbitalSystem', {
        rotation: -360,
        svgOrigin: '252.6 252.4',
        duration: 60,
        repeat: -1,
        ease: 'none',
      })

      // Animate electrons along their paths
      gsap.to('#electron1', {
        motionPath: {
          path: '#orbit1',
          align: '#orbit1',
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        duration: 4,
        repeat: -1,
        ease: 'none',
      })

      gsap.to('#electron2', {
        motionPath: {
          path: '#orbit2',
          align: '#orbit2',
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        duration: 5,
        repeat: -1,
        ease: 'none',
      })

      gsap.to('#electron3', {
        motionPath: {
          path: '#orbit3',
          align: '#orbit3',
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        duration: 4.5,
        repeat: -1,
        ease: 'none',
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={svgRef}
      style={{
        height: '100%',
        width: '66.67%',
        display: 'flex',
      }}
    >
      <svg viewBox="0 0 506 506" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle fill="#FD8469" cx="253" cy="253" r="253" style={{ opacity: 0.8 }} />

        <g id="orbitalSystem">
          <path
            id="orbit1"
            fill="none"
            stroke="#324A5E"
            strokeWidth="15"
            d="M 423,253 A 170,65 0 1,1 83,253 A 170,65 0 1,1 423,253"
            transform="rotate(-35 253 253)"
          />
          <path
            id="orbit2"
            fill="none"
            stroke="#324A5E"
            strokeWidth="15"
            d="M 423,253 A 170,65 0 1,1 83,253 A 170,65 0 1,1 423,253"
            transform="rotate(90 253 253)"
          />
          <path
            id="orbit3"
            fill="none"
            stroke="#324A5E"
            strokeWidth="15"
            d="M 423,253 A 170,65 0 1,1 83,253 A 170,65 0 1,1 423,253"
            transform="rotate(215 253 253)"
          />

          <g id="electron1">
            <path
              fill="#4CDBC4"
              d="M390.5,133.4c-11.8,0-21.5,9.6-21.5,21.5c0,11.8,9.6,21.5,21.5,21.5s21.5-9.6,21.5-21.5
              S402.4,133.4,390.5,133.4z"
            />
          </g>
          <g id="electron2">
            <path
              fill="#E6E9EE"
              d="M252.5,398.5c-11.8,0-21.5,9.6-21.5,21.5c0,11.8,9.6,21.5,21.5,21.5S274,431.8,274,420
              C274,408.1,264.4,398.5,252.5,398.5z"
            />
          </g>
          <g id="electron3">
            <path
              fill="#84DBFF"
              d="M113.3,133.3c-11.8,0-21.5,9.6-21.5,21.5c0,11.8,9.6,21.5,21.5,21.5s21.5-9.6,21.5-21.5
              C134.8,143,125.2,133.3,113.3,133.3z"
            />
          </g>
        </g>

        <circle fill="#FFD05B" cx="252.6" cy="252.4" r="41.8" />
      </svg>
    </div>
  )
}

import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { useThemeContext } from '../../context/ThemeContext'

function Lighthouse() {
  const container = useRef<SVGSVGElement>(null)
  const leftBeamRef = useRef<SVGPolygonElement>(null)
  const rightBeamRef = useRef<SVGPolygonElement>(null)
  const glowRef = useRef<SVGCircleElement>(null)
  const innerGlowRef = useRef<SVGCircleElement>(null)
  const flashRef = useRef<SVGEllipseElement>(null)
  const { mode } = useThemeContext()

  const bgColor = mode === 'dark' ? '#1a2a3a' : '#87CEEB'
  const waterColor = mode === 'dark' ? '#0d1a26' : '#4682B4'
  const lighthouseWhite = '#E3E3E3'
  const lighthouseRed = '#FF6650'
  const lightColor = '#FFD161'
  const doorColor = '#4A4A4A'
  const baseColor = '#2D415A'

  const CYCLE_DURATION = 6

  useGSAP(
    () => {
      if (!container.current) return

      const LIGHT_Y = 122
      const NEAR_LEFT_X = 195
      const NEAR_RIGHT_X = 317
      const NEAR_TOP = 102
      const NEAR_BOTTOM = 143
      const FAR_HALF_MIN = 25
      const FAR_HALF_MAX = 80

      const state = { angle: 0 }

      gsap.to(state, {
        angle: 2 * Math.PI,
        duration: CYCLE_DURATION,
        repeat: -1,
        ease: 'none',
        onUpdate: () => {
          const θ = state.angle
          const sin = Math.sin(θ)
          const cos = Math.cos(θ)

          const rightVis = Math.max(0, sin)
          const leftVis = Math.max(0, -sin)
          const depth = (1 + cos) / 2
          const farHalf = FAR_HALF_MIN + depth * (FAR_HALF_MAX - FAR_HALF_MIN)
          const facing = Math.max(0, cos)
          const glow = facing
          const flash = facing * facing

          if (flashRef.current) {
            gsap.set(flashRef.current, { opacity: flash })
          }
          if (glowRef.current) {
            gsap.set(glowRef.current, { opacity: glow })
          }
          if (innerGlowRef.current) {
            gsap.set(innerGlowRef.current, { opacity: glow })
          }

          if (leftBeamRef.current) {
            const pts = `0,${LIGHT_Y + farHalf} ${NEAR_LEFT_X},${NEAR_BOTTOM} ${NEAR_LEFT_X},${NEAR_TOP} 0,${LIGHT_Y - farHalf}`
            leftBeamRef.current.setAttribute('points', pts)
            gsap.set(leftBeamRef.current, { opacity: leftVis })
          }

          if (rightBeamRef.current) {
            const pts = `512,${LIGHT_Y + farHalf} ${NEAR_RIGHT_X},${NEAR_BOTTOM} ${NEAR_RIGHT_X},${NEAR_TOP} 512,${LIGHT_Y - farHalf}`
            rightBeamRef.current.setAttribute('points', pts)
            gsap.set(rightBeamRef.current, { opacity: rightVis })
          }
        },
      })

      const waves = container.current.querySelectorAll('.water-wave')
      waves.forEach((wave, i) => {
        gsap.to(wave, {
          x: 10,
          duration: 2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        })
      })
    },
    { scope: container, dependencies: [mode] }
  )

  return (
    <svg
      ref={container}
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'hidden' }}
    >
      <rect fill={bgColor} width="512" height="512" />

      <ellipse fill={waterColor} cx="256" cy="480" rx="300" ry="80" />
      <ellipse className="water-wave" fill={waterColor} cx="150" cy="450" rx="100" ry="20" opacity="0.5" />
      <ellipse className="water-wave" fill={waterColor} cx="380" cy="460" rx="80" ry="15" opacity="0.5" />

      {mode === 'dark' && (
        <g>
          <circle fill="#fff" cx="50" cy="80" r="1.5" opacity="0.8" />
          <circle fill="#fff" cx="120" cy="50" r="1" opacity="0.6" />
          <circle fill="#fff" cx="400" cy="70" r="1.5" opacity="0.8" />
          <circle fill="#fff" cx="450" cy="120" r="1" opacity="0.6" />
          <circle fill="#fff" cx="80" cy="150" r="1" opacity="0.5" />
          <circle fill="#fff" cx="470" cy="60" r="1.2" opacity="0.7" />
          <circle fill="#fff" cx="30" cy="200" r="1" opacity="0.5" />
          <circle fill="#fff" cx="490" cy="180" r="1.3" opacity="0.6" />
        </g>
      )}

      <polygon ref={leftBeamRef} fill={lightColor} points="0,197 195,143 195,102 0,47" opacity="0" />
      <polygon ref={rightBeamRef} fill={lightColor} points="512,197 317,143 317,102 512,47" opacity="0" />

      <defs>
        <filter id="glow-blur" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="15" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="flash-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="40%" stopColor="#FFFDE7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFD161" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g id="lighthouse-body">
        <path fill="#2FB49F" d="M304.266,91.162c0,26.657-21.609,28.266-48.266,28.266s-48.266-1.609-48.266-28.266S229.343,42.896,256,42.896S304.266,64.506,304.266,91.162z" />
        <rect x="206.949" y="87.89" fill={lightColor} width="98.102" height="68.351" />
        <rect x="219.93" y="89.526" fill="#FFFFFF" width="72.14" height="66.715" />
        <path fill={lighthouseRed} d="M311.393,166.058H200.607c-4.518,0-8.181-3.663-8.181-8.181v0c0-4.518,3.663-8.181,8.181-8.181h110.786c4.518,0,8.181,3.663,8.181,8.181v0C319.574,162.395,315.911,166.058,311.393,166.058z" />
        <path fill={lighthouseRed} d="M311.393,96.071H200.607c-4.518,0-8.181-3.663-8.181-8.181v0c0-4.518,3.663-8.181,8.181-8.181h110.786c4.518,0,8.181,3.663,8.181,8.181v0C319.574,92.408,315.911,96.071,311.393,96.071z" />
        <polygon fill={lighthouseRed} points="296.848,156.015 215.152,156.015 213.265,191.015 298.735,191.015" />
        <polygon fill={lighthouseWhite} points="213.265,190.6 211.512,222.505 300.488,222.505 298.735,190.6" />
        <polygon fill={lighthouseRed} points="209.624,257.015 302.376,257.015 300.488,223.015 211.512,223.015" />
        <polygon fill={lighthouseWhite} points="207.916,287.95 304.084,287.95 302.376,256.863 209.624,256.863" />
        <polygon fill={lighthouseRed} points="206.028,322.015 305.972,322.015 304.084,288.015 207.916,288.015" />
        <polygon fill={lighthouseWhite} points="204.275,354.213 307.725,354.213 305.972,322.309 206.028,322.309" />
        <polygon fill={lighthouseRed} points="202.387,389.015 309.613,389.015 307.725,354.015 204.275,354.015" />
        <polygon fill={lighthouseWhite} points="200.679,419.659 311.321,419.659 309.613,388.572 202.387,388.572" />
        <polygon fill="#A6A6A6" points="309.967,395.015 202.033,395.015 200.679,420.015 311.321,420.015" />
        <polygon fill={lighthouseRed} points="166.068,472.015 345.932,472.015 342.044,408.015 169.956,408.015" />
        <polygon fill="#CF5341" points="214.163,174.239 297.837,174.239 296.938,157.877 215.062,157.877" />
        <path fill={doorColor} d="M240.991,257.015v-8.634c0-8.191,6.64-14.832,14.832-14.832h0.354c8.191,0,14.832,6.64,14.832,14.832v8.634" />
        <path fill={doorColor} d="M238.886,322.015v-9.845c0-9.34,7.572-16.912,16.912-16.912h0.403c9.34,0,16.912,7.572,16.912,16.912v9.845" />
        <path fill={doorColor} d="M235.943,389.015v-11.539c0-10.946,8.874-19.82,19.82-19.82h0.473c10.946,0,19.82,8.874,19.82,19.82v11.539" />
        <path fill={doorColor} d="M227,472.015v-16.684c0-15.827,12.831-28.658,28.658-28.658h0.684c15.827,0,28.658,12.831,28.658,28.658v16.684" />
        <circle fill={lighthouseRed} cx="256" cy="25.015" r="12" />
        <path fill={lighthouseWhite} d="M267.592,44.896h-23.184c-3.281,0-5.941-2.66-5.941-5.941v0c0-3.281,2.66-5.941,5.941-5.941h23.184c3.281,0,5.941,2.66,5.941,5.941v0C273.533,42.237,270.873,44.896,267.592,44.896z" />
      </g>

      <path fill={baseColor} d="M417.645,491.561c-4.042-1.451-99.678-35.546-160.76-35.546c-61.053,0-158.374,34.08-162.487,35.53c-2.343,0.827-3.435,2.432-2.674,3.934c0.761,1.501,3.189,2.536,5.952,2.536h316.649c2.754,0,5.176-1.028,5.944-2.522C421.039,493.997,419.968,492.396,417.645,491.561z" />

      <circle ref={glowRef} fill={lightColor} cx="256" cy="122" r="40" opacity="0" filter="url(#glow-blur)" />
      <circle ref={innerGlowRef} fill="#FFFFFF" cx="256" cy="122" r="20" opacity="0" />
      <ellipse ref={flashRef} fill="url(#flash-gradient)" cx="256" cy="122" rx="200" ry="150" opacity="0" />
    </svg>
  )
}

export { Lighthouse }

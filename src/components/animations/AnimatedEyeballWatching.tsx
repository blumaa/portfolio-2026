import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

export function AnimatedEyeballWatching() {
  const leftIrisRef = useRef(null)
  const rightIrisRef = useRef(null)
  const leftEyeRef = useRef(null)
  const rightEyeRef = useRef(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const mousePos = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  })
  const isTrackingRef = useRef(true)
  const mouseMoveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const trackingInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const driftingInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  useGSAP(
    () => {
      // Wait for refs to be ready
      if (
        !leftEyeRef.current ||
        !rightEyeRef.current ||
        !leftIrisRef.current ||
        !rightIrisRef.current ||
        !svgRef.current
      ) {
        return
      }

      // Function to look at mouse
      const trackMouse = () => {
        if (!leftIrisRef.current || !rightIrisRef.current || !svgRef.current) return

        // Convert screen coordinates to SVG coordinates using SVG's coordinate system
        const svg = svgRef.current
        const pt = svg.createSVGPoint()
        pt.x = mousePos.current.x
        pt.y = mousePos.current.y

        // Transform the point from screen space to SVG space
        const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse())
        const svgMouseX = svgP.x
        const svgMouseY = svgP.y

        // Left eye center is at 256, 256 in the viewBox
        const leftCenterX = 256
        const leftCenterY = 256

        // Right eye center is at 612 + 256 = 868, 256 in the viewBox
        const rightCenterX = 868
        const rightCenterY = 256

        const maxDistance = 100

        // Track left eye
        const leftDeltaX = svgMouseX - leftCenterX
        const leftDeltaY = svgMouseY - leftCenterY
        const leftDistance = Math.sqrt(leftDeltaX * leftDeltaX + leftDeltaY * leftDeltaY)
        const leftConstrainedDistance = Math.min(leftDistance * 0.2, maxDistance)
        const leftAngle = Math.atan2(leftDeltaY, leftDeltaX)
        const leftIrisX = Math.cos(leftAngle) * leftConstrainedDistance
        const leftIrisY = Math.sin(leftAngle) * leftConstrainedDistance

        // Track right eye
        const rightDeltaX = svgMouseX - rightCenterX
        const rightDeltaY = svgMouseY - rightCenterY
        const rightDistance = Math.sqrt(rightDeltaX * rightDeltaX + rightDeltaY * rightDeltaY)
        const rightConstrainedDistance = Math.min(rightDistance * 0.2, maxDistance)
        const rightAngle = Math.atan2(rightDeltaY, rightDeltaX)
        const rightIrisX = Math.cos(rightAngle) * rightConstrainedDistance
        const rightIrisY = Math.sin(rightAngle) * rightConstrainedDistance

        gsap.to(leftIrisRef.current, {
          x: leftIrisX,
          y: leftIrisY,
          duration: 0.3,
          ease: 'power2.out',
        })

        gsap.to(rightIrisRef.current, {
          x: rightIrisX,
          y: rightIrisY,
          duration: 0.3,
          ease: 'power2.out',
        })
      }

      // Function to drift randomly
      const driftRandomly = () => {
        if (!leftIrisRef.current || !rightIrisRef.current) return

        const randomX = gsap.utils.random(-100, 100, 1)
        const randomY = gsap.utils.random(-100, 100, 1)
        const randomDuration = gsap.utils.random(0.8, 1.5, 0.1)

        gsap.to([leftIrisRef.current, rightIrisRef.current], {
          x: randomX,
          y: randomY,
          duration: randomDuration,
          ease: 'power1.inOut',
        })
      }

      // Start tracking mode initially
      const startTracking = () => {
        if (trackingInterval.current) return

        if (driftingInterval.current) {
          clearInterval(driftingInterval.current)
          driftingInterval.current = null
        }

        trackingInterval.current = setInterval(() => {
          if (isTrackingRef.current) {
            trackMouse()
          }
        }, 30)
      }

      // Start drift mode
      const startDrifting = () => {
        if (driftingInterval.current) return

        if (trackingInterval.current) {
          clearInterval(trackingInterval.current)
          trackingInterval.current = null
        }

        driftRandomly()
        driftingInterval.current = setInterval(() => {
          if (!isTrackingRef.current) {
            driftRandomly()
          }
        }, 1500)
      }

      // Track mouse movement
      const handleMouseMove = (e: MouseEvent) => {
        mousePos.current = { x: e.clientX, y: e.clientY }
        isTrackingRef.current = true

        if (mouseMoveTimeout.current) {
          clearTimeout(mouseMoveTimeout.current)
        }

        if (!trackingInterval.current) {
          startTracking()
        }

        mouseMoveTimeout.current = setTimeout(() => {
          isTrackingRef.current = false
          startDrifting()
        }, 2000)
      }

      window.addEventListener('mousemove', handleMouseMove)

      // Delay initialization to ensure SVG is fully laid out
      const initDelay = setTimeout(() => {
        // Start with tracking mode
        startTracking()

        // Initial look at mouse position
        trackMouse()
      }, 100)

      // Blink animation - blink each eye separately
      const blinkLeft = () => {
        gsap.to(leftEyeRef.current, {
          scaleY: 0.1,
          duration: 0.1,
          transformOrigin: 'center',
          ease: 'power2.in',
          yoyo: true,
          repeat: 1,
        })
      }

      const blinkRight = () => {
        gsap.to(rightEyeRef.current, {
          scaleY: 0.1,
          duration: 0.1,
          transformOrigin: 'center',
          ease: 'power2.in',
          yoyo: true,
          repeat: 1,
        })
      }

      const blinkBoth = () => {
        blinkLeft()
        blinkRight()
        gsap.delayedCall(gsap.utils.random(4, 8), blinkBoth)
      }

      gsap.delayedCall(gsap.utils.random(3, 6), blinkBoth)

      // Cleanup
      return () => {
        clearTimeout(initDelay)
        window.removeEventListener('mousemove', handleMouseMove)
        if (trackingInterval.current) {
          clearInterval(trackingInterval.current)
        }
        if (driftingInterval.current) {
          clearInterval(driftingInterval.current)
        }
        if (mouseMoveTimeout.current) {
          clearTimeout(mouseMoveTimeout.current)
        }
      }
    },
    { dependencies: [leftEyeRef, rightEyeRef, leftIrisRef, rightIrisRef, svgRef] }
  )

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1124 512"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ overflow: 'visible' }}
    >
      {/* Left Eye */}
      <g ref={leftEyeRef}>
        {/* Outer white eyeball */}
        <path
          style={{
            fill: '#FFFFFF',
            filter:
              'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))',
          }}
          d="M511.994,256.001C511.994,397.38,397.385,512,256.005,512C114.614,512,0.006,397.38,0.006,256.001
		C0.006,114.62,114.614,0,256.005,0C397.385,0,511.994,114.62,511.994,256.001z"
        />

        {/* Moving iris group */}
        <g ref={leftIrisRef}>
          {/* Hazel iris */}
          <path
            style={{ fill: '#8B7355' }}
            d="M390.728,256.001c0,74.413-60.299,134.744-134.711,134.744
		c-74.413,0-134.745-60.331-134.745-134.744c0-14.629,2.343-28.71,6.647-41.937c3.383-10.314,7.982-20.114,13.654-29.169
		c23.749-38.204,66.112-63.639,114.444-63.639C330.429,121.256,390.728,181.587,390.728,256.001z"
          />

          {/* Dark pupil */}
          <path
            style={{ fill: '#2C1810' }}
            d="M326.334,256.001c0,38.837-31.491,70.328-70.329,70.328c-38.848,0-70.339-31.491-70.339-70.328
		c0-38.85,31.491-70.341,70.339-70.341C294.843,185.66,326.334,217.151,326.334,256.001z"
          />

          {/* White highlight */}
          <path
            style={{ fill: '#FFFFFF' }}
            d="M256.432,229.13c0,11.114-9,20.114-20.114,20.114c-11.104,0-20.104-9-20.104-20.114
		c0-11.104,9-20.104,20.104-20.104C247.432,209.027,256.432,218.027,256.432,229.13z"
          />
        </g>

        {/* Shadow overlay */}
        <g style={{ opacity: 0.06 }}>
          <path
            style={{ fill: '#231815' }}
            d="M75.799,437.795C122.059,483.652,185.709,512,256.005,512c141.38,0,255.989-114.62,255.989-255.999
			c0-70.286-28.338-133.946-74.194-180.208L75.799,437.795z"
          />
        </g>
      </g>

      {/* Right Eye - translated to x=612 (512 + 100 gap) */}
      <g ref={rightEyeRef} transform="translate(612, 0)">
        {/* Outer white eyeball */}
        <path
          style={{
            fill: '#FFFFFF',
            filter:
              'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))',
          }}
          d="M511.994,256.001C511.994,397.38,397.385,512,256.005,512C114.614,512,0.006,397.38,0.006,256.001
		C0.006,114.62,114.614,0,256.005,0C397.385,0,511.994,114.62,511.994,256.001z"
        />

        {/* Moving iris group */}
        <g ref={rightIrisRef}>
          {/* Hazel iris */}
          <path
            style={{ fill: '#8B7355' }}
            d="M390.728,256.001c0,74.413-60.299,134.744-134.711,134.744
		c-74.413,0-134.745-60.331-134.745-134.744c0-14.629,2.343-28.71,6.647-41.937c3.383-10.314,7.982-20.114,13.654-29.169
		c23.749-38.204,66.112-63.639,114.444-63.639C330.429,121.256,390.728,181.587,390.728,256.001z"
          />

          {/* Dark pupil */}
          <path
            style={{ fill: '#2C1810' }}
            d="M326.334,256.001c0,38.837-31.491,70.328-70.329,70.328c-38.848,0-70.339-31.491-70.339-70.328
		c0-38.85,31.491-70.341,70.339-70.341C294.843,185.66,326.334,217.151,326.334,256.001z"
          />

          {/* White highlight */}
          <path
            style={{ fill: '#FFFFFF' }}
            d="M256.432,229.13c0,11.114-9,20.114-20.114,20.114c-11.104,0-20.104-9-20.104-20.114
		c0-11.104,9-20.104,20.104-20.104C247.432,209.027,256.432,218.027,256.432,229.13z"
          />
        </g>

        {/* Shadow overlay */}
        <g style={{ opacity: 0.06 }}>
          <path
            style={{ fill: '#231815' }}
            d="M75.799,437.795C122.059,483.652,185.709,512,256.005,512c141.38,0,255.989-114.62,255.989-255.999
			c0-70.286-28.338-133.946-74.194-180.208L75.799,437.795z"
          />
        </g>
      </g>
    </svg>
  )
}

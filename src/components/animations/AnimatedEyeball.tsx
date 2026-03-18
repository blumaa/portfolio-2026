import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

export function AnimatedEyeball() {
  const irisRef = useRef(null)
  const container = useRef(null)

  useGSAP(
    () => {
      // Function to look in a random direction
      const lookRandomly = () => {
        // Random position within a much larger range
        const randomX = gsap.utils.random(-100, 100, 1)
        const randomY = gsap.utils.random(-100, 100, 1)
        const randomDuration = gsap.utils.random(0.6, 1, 0.1)
        const randomDelay = gsap.utils.random(0.5, 2, 0.1)

        gsap.to(irisRef.current, {
          x: randomX,
          y: randomY,
          duration: randomDuration,
          ease: 'power1.inOut',
          onComplete: () => {
            // Schedule next random look
            gsap.delayedCall(randomDelay, lookRandomly)
          },
        })
      }

      // Start looking around
      lookRandomly()

      // Blink animation - separate from eye movement
      const blink = () => {
        gsap.to(container.current, {
          scaleY: 0.1,
          duration: 0.1,
          transformOrigin: 'center',
          ease: 'power2.in',
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            // Schedule next blink with random delay
            gsap.delayedCall(gsap.utils.random(2, 5), blink)
          },
        })
      }

      // Start first blink after random delay
      gsap.delayedCall(gsap.utils.random(2, 4), blink)
    },
    { scope: container }
  )

  return (
    <svg
      ref={container}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', overflow: 'visible', padding: '10px' }}
    >
      {/* Outer white eyeball - static */}
      <path
        style={{
          fill: '#FFFFFF',
          filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))',
        }}
        d="M511.994,256.001C511.994,397.38,397.385,512,256.005,512C114.614,512,0.006,397.38,0.006,256.001
		C0.006,114.62,114.614,0,256.005,0C397.385,0,511.994,114.62,511.994,256.001z"
      />

      {/* Decorative light blue accents - static */}
      <polygon
        style={{ fill: '#ADDCE1' }}
        points="256.005,256.001 272.791,276.695 280.226,280.319 275.659,270.07"
      />
      <polygon style={{ fill: '#ADDCE1' }} points="280.226,280.319 310.676,295.134 275.659,270.07" />
      <polygon
        style={{ fill: '#ADDCE1' }}
        points="285.733,292.659 280.226,280.319 272.791,276.695"
      />

      {/* Moving iris group */}
      <g ref={irisRef}>
        {/* Blue iris */}
        <path
          style={{ fill: '#3498CB' }}
          d="M390.728,256.001c0,74.413-60.299,134.744-134.711,134.744
		c-74.413,0-134.745-60.331-134.745-134.744c0-14.629,2.343-28.71,6.647-41.937c3.383-10.314,7.982-20.114,13.654-29.169
		c23.749-38.204,66.112-63.639,114.444-63.639C330.429,121.256,390.728,181.587,390.728,256.001z"
        />

        {/* Dark pupil */}
        <path
          style={{ fill: '#1A2D75' }}
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
    </svg>
  )
}

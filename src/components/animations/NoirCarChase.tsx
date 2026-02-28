import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(useGSAP, MotionPathPlugin)

export function NoirCarChase() {
  const containerRef = useRef<SVGSVGElement>(null)
  const leadCarRef = useRef<SVGGElement>(null)
  const chaseCarRef = useRef<SVGGElement>(null)
  const leadWheelsRef = useRef<SVGGElement>(null)
  const chaseWheelsRef = useRef<SVGGElement>(null)
  const leadHeadlightsRef = useRef<SVGGElement>(null)
  const chaseHeadlightsRef = useRef<SVGGElement>(null)
  const farBuildingsRef = useRef<SVGGElement>(null)
  const midBuildingsRef = useRef<SVGGElement>(null)
  const streetLampsRef = useRef<SVGGElement>(null)
  const searchlightRef = useRef<SVGGElement>(null)
  const copLightRef = useRef<SVGEllipseElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      // Create separate timelines for cars to loop independently
      const leadCarTL = gsap.timeline({ repeat: -1 })
      const chaseCarTL = gsap.timeline({ repeat: -1 })

      // Lead car (getaway) - FIRST HALF: same speed as cop
      leadCarTL.to(
        leadCarRef.current,
        {
          motionPath: {
            path: '#chasePath',
            align: '#chasePath',
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start: 0,
            end: 0.5, // Goes halfway
          },
          duration: 7, // Same speed as cop (0.5 * 14 = 7)
          ease: 'none',
        },
        0
      )

      // Lead car (getaway) - SECOND HALF: speeds up and escapes!
      leadCarTL.to(
        leadCarRef.current,
        {
          motionPath: {
            path: '#chasePath',
            align: '#chasePath',
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start: 0.5, // Continue from halfway
            end: 1, // Finishes the path
          },
          duration: 3.5, // Much faster for the second half
          ease: 'none',
        },
        7 // Starts at 7 seconds (after first half)
      )

      // Chase car (cop) - enters 1 second later, constant slower speed
      chaseCarTL.fromTo(
        chaseCarRef.current,
        {
          motionPath: {
            path: '#chasePath',
            align: '#chasePath',
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start: 0,
          },
        },
        {
          motionPath: {
            path: '#chasePath',
            align: '#chasePath',
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            end: 1,
          },
          duration: 14, // Slower constant speed
          ease: 'none',
        },
        3 // Start 1 second AFTER the beginning
      )

      // Wheel rotations - continuous independent loop
      const leadFrontWheel = leadWheelsRef.current?.querySelector('.front-wheel')
      const leadBackWheel = leadWheelsRef.current?.querySelector('.back-wheel')
      const chaseFrontWheel = chaseWheelsRef.current?.querySelector('.front-wheel')
      const chaseBackWheel = chaseWheelsRef.current?.querySelector('.back-wheel')

      if (leadFrontWheel && leadBackWheel && chaseFrontWheel && chaseBackWheel) {
        gsap.to([leadFrontWheel, leadBackWheel, chaseFrontWheel, chaseBackWheel], {
          rotation: 360,
          duration: 2,
          ease: 'none',
          repeat: -1,
          transformOrigin: 'center center',
        })
      }

      // Parallax scrolling - seamless infinite loop
      // Each layer moves by exactly one set's width, so the repeat is seamless

      // Far buildings: each set is 800px wide, move by -800
      gsap.to(farBuildingsRef.current, {
        x: -800,
        duration: 15,
        ease: 'none',
        repeat: -1,
      })

      // Mid buildings: each set is 1000px wide, move by -1000
      gsap.to(midBuildingsRef.current, {
        x: -1000,
        duration: 15,
        ease: 'none',
        repeat: -1,
      })

      // Street lamps: 8 lamps * 350px spacing = 2800px total, use half (4 lamps worth)
      gsap.to(streetLampsRef.current, {
        x: -1400, // 4 lamps * 350px
        duration: 15,
        ease: 'none',
        repeat: -1,
      })

      // Searchlight sweep - continuous independent loop
      gsap.to(searchlightRef.current, {
        rotation: 50,
        duration: 7.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: '0 0',
      })

      // Window lights blinking
      gsap.to('.window-light', {
        opacity: 0.3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.3,
          from: 'random',
        },
      })

      // Cop car red light flashing
      gsap.to(copLightRef.current, {
        opacity: 0,
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      })
    },
    { scope: containerRef }
  )

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 2000 1000"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'hidden' }}
    >
      {/* Gradients */}
      <defs>
        <radialGradient id="noirSky" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
        <linearGradient id="headlight" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#ffe8a3" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffe8a3" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="lampGlow">
          <stop offset="0%" stopColor="#d4a349" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#d4a349" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="2000" height="1000" fill="url(#noirSky)" />

      {/* Ground */}
      <rect y="700" width="2000" height="300" fill="#0f0f0f" />

      {/* Searchlight in background */}
      <g ref={searchlightRef} transform="translate(150, 300)">
        <path d="M 0 0 L 800 -100 L 800 100 Z" fill="#ffe8a3" opacity="0.08" />
      </g>

      {/* Far buildings layer (parallax - slowest) */}
      <g ref={farBuildingsRef} opacity="0.4">
        {/* Buildings repeated for parallax loop */}
        {[0, 1, 2].map((set) => (
          <g key={set} transform={`translate(${set * 800}, 0)`}>
            {/* Building 1 */}
            <rect x="50" y="400" width="120" height="300" fill="#1a1a1a" />
            <rect x="60" y="410" width="100" height="280" fill="#0f0f0f" />
            {/* Windows */}
            {[0, 1, 2, 3, 4].map((row) =>
              [0, 1, 2].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  className="window-light"
                  x={70 + col * 30}
                  y={430 + row * 50}
                  width="15"
                  height="25"
                  fill="#d4a349"
                  opacity="0.6"
                />
              ))
            )}

            {/* Building 2 */}
            <rect x="200" y="350" width="150" height="350" fill="#1a1a1a" />
            <rect x="210" y="360" width="130" height="330" fill="#0f0f0f" />
            {[0, 1, 2, 3, 4, 5].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  className="window-light"
                  x={220 + col * 30}
                  y={380 + row * 50}
                  width="15"
                  height="25"
                  fill="#d4a349"
                  opacity="0.6"
                />
              ))
            )}

            {/* Building 3 */}
            <rect x="380" y="450" width="100" height="250" fill="#1a1a1a" />
            <rect x="390" y="460" width="80" height="230" fill="#0f0f0f" />
            {[0, 1, 2, 3].map((row) =>
              [0, 1].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  className="window-light"
                  x={400 + col * 30}
                  y={480 + row * 50}
                  width="15"
                  height="25"
                  fill="#d4a349"
                  opacity="0.6"
                />
              ))
            )}
          </g>
        ))}
      </g>

      {/* Mid buildings with venetian blinds (parallax - medium) */}
      <g ref={midBuildingsRef} opacity="0.6">
        {[0, 1, 2].map((set) => (
          <g key={set} transform={`translate(${set * 1000}, 0)`}>
            {/* Building 1 - noir style with blinds */}
            <rect x="100" y="500" width="180" height="200" fill="#2a2a2a" />
            {/* Venetian blind effect */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <rect
                key={i}
                x="110"
                y={510 + i * 22}
                width="160"
                height="3"
                fill="#0a0a0a"
                opacity="0.8"
              />
            ))}
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  className="window-light"
                  x={120 + col * 50}
                  y={520 + row * 60}
                  width="20"
                  height="30"
                  fill="#d4a349"
                  opacity="0.7"
                />
              ))
            )}

            {/* Building 2 */}
            <rect x="320" y="480" width="200" height="220" fill="#2a2a2a" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <rect
                key={i}
                x="330"
                y={490 + i * 22}
                width="180"
                height="3"
                fill="#0a0a0a"
                opacity="0.8"
              />
            ))}
            {[0, 1, 2].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  className="window-light"
                  x={340 + col * 45}
                  y={500 + row * 60}
                  width="20"
                  height="30"
                  fill="#d4a349"
                  opacity="0.7"
                />
              ))
            )}

            {/* Building 3 */}
            <rect x="560" y="520" width="160" height="180" fill="#2a2a2a" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <rect
                key={i}
                x="570"
                y={530 + i * 22}
                width="140"
                height="3"
                fill="#0a0a0a"
                opacity="0.8"
              />
            ))}
            {[0, 1, 2].map((row) =>
              [0, 1].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  className="window-light"
                  x={585 + col * 55}
                  y={540 + row * 55}
                  width="20"
                  height="28"
                  fill="#d4a349"
                  opacity="0.7"
                />
              ))
            )}
          </g>
        ))}
      </g>

      {/* Street lamps (parallax - fastest, foreground) */}
      <g ref={streetLampsRef}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <g key={i} transform={`translate(${200 + i * 350}, 0)`}>
            {/* Lamp post */}
            <rect x="-5" y="600" width="10" height="100" fill="#1a1a1a" />
            {/* Lamp head */}
            <path d="M -20 600 L -30 580 L 30 580 L 20 600 Z" fill="#2a2a2a" />
            {/* Lamp glow */}
            <circle cx="0" cy="590" r="40" fill="url(#lampGlow)" opacity="0.6" />
            {/* Light beam down */}
            <path d="M -15 600 L -30 700 L 30 700 L 15 600 Z" fill="#d4a349" opacity="0.15" />
          </g>
        ))}
      </g>

      {/* The invisible motion path - winding curves at ground level */}
      <path
        id="chasePath"
        d="M -300 680 Q 400 670, 800 685 Q 1200 695, 1600 680 Q 2000 665, 2400 680"
        fill="none"
        stroke="none"
      />

      {/* Lead car (getaway) - SCALED UP 2X */}
      <g ref={leadCarRef} transform="scale(2)">
        {/* Headlight beams */}
        <g ref={leadHeadlightsRef}>
          <path d="M 70 -8 L 200 -15 L 200 15 L 70 8 Z" fill="url(#headlight)" opacity="0.7" />
        </g>

        {/* Car shadow */}
        <ellipse cx="0" cy="35" rx="80" ry="15" fill="#000000" opacity="0.4" />

        {/* Car body */}
        <g>
          {/* Main body */}
          <rect x="-70" y="-15" width="140" height="30" rx="3" fill="#1a1a1a" />
          {/* Roof/cabin */}
          <path d="M -40 -15 L -30 -35 L 30 -35 L 40 -15 Z" fill="#0f0f0f" />
          {/* Windows - noir style dark */}
          <path d="M -38 -16 L -30 -32 L -5 -32 L -5 -16 Z" fill="#2a2a2a" />
          <path d="M 5 -16 L 5 -32 L 30 -32 L 38 -16 Z" fill="#2a2a2a" />
          {/* Hood/trunk accents */}
          <rect x="50" y="-10" width="15" height="20" rx="2" fill="#0f0f0f" />
          <rect x="-65" y="-10" width="15" height="20" rx="2" fill="#0f0f0f" />
          {/* Tail fin (1950s style) */}
          <path d="M -70 -5 L -80 -12 L -80 2 L -70 5 Z" fill="#0f0f0f" />
          {/* Chrome bumper accent */}
          <rect x="60" y="-5" width="8" height="10" fill="#3a3a3a" />
          <rect x="-68" y="-5" width="8" height="10" fill="#3a3a3a" />
        </g>

        {/* Wheels - BIGGER AND BETTER STYLED */}
        <g ref={leadWheelsRef}>
          {/* Front wheel */}
          <g className="front-wheel" transform="translate(40, 15)">
            <circle cx="0" cy="0" r="14" fill="#0f0f0f" />
            <circle cx="0" cy="0" r="10" fill="#1a1a1a" />
            <circle cx="0" cy="0" r="5" fill="#2a2a2a" />
            {/* Spokes */}
            <line x1="0" y1="-10" x2="0" y2="10" stroke="#3a3a3a" strokeWidth="1.5" />
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#3a3a3a" strokeWidth="1.5" />
            {/* Tire wall */}
            <circle cx="0" cy="0" r="14" fill="none" stroke="#0a0a0a" strokeWidth="2" />
          </g>

          {/* Back wheel */}
          <g className="back-wheel" transform="translate(-40, 15)">
            <circle cx="0" cy="0" r="14" fill="#0f0f0f" />
            <circle cx="0" cy="0" r="10" fill="#1a1a1a" />
            <circle cx="0" cy="0" r="5" fill="#2a2a2a" />
            {/* Spokes */}
            <line x1="0" y1="-10" x2="0" y2="10" stroke="#3a3a3a" strokeWidth="1.5" />
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#3a3a3a" strokeWidth="1.5" />
            {/* Tire wall */}
            <circle cx="0" cy="0" r="14" fill="none" stroke="#0a0a0a" strokeWidth="2" />
          </g>
        </g>
      </g>

      {/* Chase car (pursuing) - SCALED UP 2X */}
      <g ref={chaseCarRef} transform="scale(2)">
        {/* Headlight beams */}
        <g ref={chaseHeadlightsRef}>
          <path d="M 70 -8 L 200 -15 L 200 15 L 70 8 Z" fill="url(#headlight)" opacity="0.7" />
        </g>

        {/* Car shadow */}
        <ellipse cx="0" cy="35" rx="75" ry="14" fill="#000000" opacity="0.4" />

        {/* Car body - detective car style */}
        <g>
          {/* Main body */}
          <rect x="-68" y="-15" width="136" height="30" rx="3" fill="#2a2a2a" />
          {/* Roof/cabin - slightly more angular */}
          <path d="M -38 -15 L -28 -30 L 28 -30 L 38 -15 Z" fill="#1a1a1a" />
          {/* Windows */}
          <path d="M -36 -16 L -28 -28 L -5 -28 L -5 -16 Z" fill="#3a3a3a" />
          <path d="M 5 -16 L 5 -28 L 28 -28 L 36 -16 Z" fill="#3a3a3a" />
          {/* Hood/trunk */}
          <rect x="48" y="-10" width="15" height="20" rx="2" fill="#1a1a1a" />
          <rect x="-63" y="-10" width="15" height="20" rx="2" fill="#1a1a1a" />
          {/* Tail fin */}
          <path d="M -68 -5 L -78 -10 L -78 0 L -68 5 Z" fill="#1a1a1a" />
          {/* Chrome details */}
          <rect x="58" y="-5" width="8" height="10" fill="#4a4a4a" />
          <rect x="-66" y="-5" width="8" height="10" fill="#4a4a4a" />
          {/* Police/detective light on roof - flashing */}
          <ellipse
            ref={copLightRef}
            cx="0"
            cy="-32"
            rx="8"
            ry="4"
            fill="#ff0000"
            opacity="0.9"
          />
        </g>

        {/* Wheels - BIGGER AND BETTER STYLED */}
        <g ref={chaseWheelsRef}>
          {/* Front wheel */}
          <g className="front-wheel" transform="translate(38, 15)">
            <circle cx="0" cy="0" r="14" fill="#0f0f0f" />
            <circle cx="0" cy="0" r="10" fill="#1a1a1a" />
            <circle cx="0" cy="0" r="5" fill="#2a2a2a" />
            {/* Spokes */}
            <line x1="0" y1="-10" x2="0" y2="10" stroke="#3a3a3a" strokeWidth="1.5" />
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#3a3a3a" strokeWidth="1.5" />
            {/* Tire wall */}
            <circle cx="0" cy="0" r="14" fill="none" stroke="#0a0a0a" strokeWidth="2" />
          </g>

          {/* Back wheel */}
          <g className="back-wheel" transform="translate(-38, 15)">
            <circle cx="0" cy="0" r="14" fill="#0f0f0f" />
            <circle cx="0" cy="0" r="10" fill="#1a1a1a" />
            <circle cx="0" cy="0" r="5" fill="#2a2a2a" />
            {/* Spokes */}
            <line x1="0" y1="-10" x2="0" y2="10" stroke="#3a3a3a" strokeWidth="1.5" />
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#3a3a3a" strokeWidth="1.5" />
            {/* Tire wall */}
            <circle cx="0" cy="0" r="14" fill="none" stroke="#0a0a0a" strokeWidth="2" />
          </g>
        </g>
      </g>
    </svg>
  )
}

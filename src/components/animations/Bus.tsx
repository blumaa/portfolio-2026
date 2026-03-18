import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { useThemeContext } from '../../context/ThemeContext'

export function Bus() {
  const containerRef = useRef<SVGSVGElement>(null)
  const busRef = useRef<SVGGElement>(null)
  const busBumpRef = useRef<SVGGElement>(null)
  const wheel1Ref = useRef<SVGGElement>(null)
  const wheel2Ref = useRef<SVGGElement>(null)
  const luggage1Ref = useRef<SVGGElement>(null)
  const luggage2Ref = useRef<SVGGElement>(null)
  const luggage3Ref = useRef<SVGGElement>(null)
  const cloud1Ref = useRef<SVGGElement>(null)
  const cloud2Ref = useRef<SVGGElement>(null)
  const cloud3Ref = useRef<SVGGElement>(null)
  const cloud4Ref = useRef<SVGGElement>(null)
  const { mode } = useThemeContext()

  const hillColor = mode === 'dark' ? '#27AE60' : '#2ECC71'
  const skyColor = mode === 'dark' ? '#34495E' : '#ECF0F1'

  useGSAP(
    () => {
      if (!containerRef.current || !busRef.current) return

      let lastPeakTriggered = -1
      let isReversed = false

      // Simple animation: bus travels left to right, then right to left
      gsap.to(busRef.current, {
        motionPath: {
          path: '#roadPath',
          align: '#roadPath',
          alignOrigin: [0.5, 1],
          autoRotate: true,
        },
        duration: 4,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        onRepeat: () => {
          // Flip bus horizontally when changing direction
          const currentScaleX = gsap.getProperty(busRef.current, 'scaleX') as number
          gsap.to(busRef.current, {
            scaleX: currentScaleX * -1,
            duration: 0.3,
            ease: 'power2.inOut',
          })
          lastPeakTriggered = -1 // Reset peak tracking
          isReversed = !isReversed // Toggle direction
        },
        onUpdate: function () {
          const progress = this.progress()

          let afterPeak1, afterPeak2, afterPeak3

          if (isReversed) {
            afterPeak3 = progress > 0.093 && progress < 0.103
            afterPeak2 = progress > 0.51 && progress < 0.52
            afterPeak1 = progress > 0.906 && progress < 0.916
          } else {
            afterPeak1 = progress > 0.114 && progress < 0.124
            afterPeak2 = progress > 0.51 && progress < 0.52
            afterPeak3 = progress > 0.927 && progress < 0.937
          }

          if (afterPeak1 && lastPeakTriggered !== 1) {
            lastPeakTriggered = 1
            jumpLuggage()
          } else if (afterPeak2 && lastPeakTriggered !== 2) {
            lastPeakTriggered = 2
            jumpLuggage()
          } else if (afterPeak3 && lastPeakTriggered !== 3) {
            lastPeakTriggered = 3
            jumpLuggage()
          } else if (!afterPeak1 && !afterPeak2 && !afterPeak3) {
            lastPeakTriggered = -1
          }
        },
      })

      // Luggage jump function
      const jumpLuggage = () => {
        ;[luggage1Ref, luggage2Ref, luggage3Ref].forEach((luggageRef, index) => {
          const randomY = gsap.utils.random(60, 100)
          const randomDelay = index * 0.05
          gsap.to(luggageRef.current, {
            y: -randomY,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
            delay: randomDelay,
          })
        })
      }

      gsap.to(busBumpRef.current, {
        y: -30,
        duration: 0.2,
        yoyo: true,
        repeat: -1,
      })

      // Continuous wheel rotation
      gsap.to([wheel1Ref.current, wheel2Ref.current], {
        rotation: 360,
        duration: 1.5,
        ease: 'none',
        repeat: -1,
        transformOrigin: 'center center',
      })

      // Cloud floating animations
      ;[cloud1Ref, cloud2Ref, cloud3Ref, cloud4Ref].forEach((cloudRef, index) => {
        if (!cloudRef.current) return

        const randomDuration = 3 + Math.random() * 2
        const randomYDistance = 15 + Math.random() * 35
        const randomXDistance = 10 + Math.random() * 30
        const randomDelay = index * 0.5

        gsap.to(cloudRef.current, {
          y: -randomYDistance,
          x: randomXDistance,
          duration: randomDuration,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: randomDelay,
        })
      })
    },
    { scope: containerRef }
  )

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <svg
        ref={containerRef}
        viewBox="0 700 2000 1000"
        xmlns="http://www.w3.org/2000/svg"
        height="100%"
        style={{ overflow: 'hidden' }}
      >
        <rect width="2000" height="1500" fill={skyColor} />

        {/* Clouds */}
        <g opacity="0.7" fill={mode === 'dark' ? '#FFFFFF' : '#546E7A'}>
          {/* Cloud 1 */}
          <g ref={cloud1Ref}>
            <ellipse cx="300" cy="900" rx="80" ry="50" />
            <ellipse cx="350" cy="880" rx="70" ry="45" />
            <ellipse cx="400" cy="900" rx="60" ry="40" />
          </g>

          {/* Cloud 2 */}
          <g ref={cloud2Ref}>
            <ellipse cx="800" cy="1050" rx="100" ry="60" />
            <ellipse cx="870" cy="1030" rx="85" ry="50" />
            <ellipse cx="940" cy="1050" rx="70" ry="45" />
          </g>

          {/* Cloud 3 */}
          <g ref={cloud3Ref}>
            <ellipse cx="1400" cy="850" rx="90" ry="55" />
            <ellipse cx="1470" cy="830" rx="75" ry="48" />
            <ellipse cx="1540" cy="850" rx="65" ry="42" />
          </g>

          {/* Cloud 4 */}
          <g ref={cloud4Ref}>
            <ellipse cx="1700" cy="1100" rx="95" ry="58" />
            <ellipse cx="1780" cy="1080" rx="80" ry="52" />
            <ellipse cx="1860" cy="1100" rx="68" ry="44" />
          </g>
        </g>

        {/* Hills visible shape - positioned lower in square viewBox */}
        <path
          d="M -200 1400 Q 50 1200 250 1400 Q 500 1600 750 1400 Q 1000 1200 1250 1400 Q 1500 1600 1750 1400 Q 2000 1200 2200 1400 L 2200 2000 L -200 2000 Z"
          fill={hillColor}
        />

        {/* Grass blades below the hills - different scales for depth with natural variation */}
        <g fill={mode === 'dark' ? '#1E8449' : '#239B56'} opacity="0.6">
          {/* Far grass (smaller) */}
          {[80, 170, 240, 330, 510, 620, 730, 890, 980, 1090, 1210, 1380, 1520, 1670, 1790, 1880].map(
            (x, i) => {
              const yOffset = Math.sin(x * 0.1) * 25
              const height1 = 25 + Math.sin(x * 0.05) * 8
              const height2 = 20 + Math.cos(x * 0.07) * 6
              const curve = 1 + Math.sin(x * 0.03) * 1
              return (
                <g key={`far-${i}`} transform={`translate(${x}, ${1500 + yOffset})`}>
                  <path
                    d={`M 0 0 Q -${curve} -${height1 * 0.5} 0 -${height1}`}
                    stroke={mode === 'dark' ? '#1E8449' : '#239B56'}
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d={`M 0 0 Q ${curve} -${height2 * 0.5} 0 -${height2}`}
                    stroke={mode === 'dark' ? '#1E8449' : '#239B56'}
                    strokeWidth="1.5"
                    fill="none"
                  />
                </g>
              )
            }
          )}

          {/* Mid grass (medium) */}
          {[120, 270, 390, 540, 690, 820, 970, 1110, 1260, 1420, 1580, 1720, 1860].map((x, i) => {
            const yOffset = Math.cos(x * 0.08) * 35
            const height1 = 45 + Math.sin(x * 0.06) * 12
            const height2 = 35 + Math.cos(x * 0.09) * 10
            const curve = 2 + Math.sin(x * 0.04) * 1.5
            return (
              <g key={`mid-${i}`} transform={`translate(${x}, ${1550 + yOffset})`}>
                <path
                  d={`M 0 0 Q -${curve} -${height1 * 0.5} 0 -${height1}`}
                  stroke={mode === 'dark' ? '#1E8449' : '#239B56'}
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d={`M 0 0 Q ${curve} -${height2 * 0.5} 0 -${height2}`}
                  stroke={mode === 'dark' ? '#1E8449' : '#239B56'}
                  strokeWidth="2"
                  fill="none"
                />
              </g>
            )
          })}

          {/* Near grass (larger) - in front */}
          {[40, 160, 310, 460, 580, 750, 890, 1050, 1190, 1350, 1490, 1640, 1790, 1940].map(
            (x, i) => {
              const yOffset = Math.sin(x * 0.07) * 45
              const height1 = 65 + Math.sin(x * 0.04) * 15
              const height2 = 50 + Math.cos(x * 0.08) * 12
              const curve = 3 + Math.sin(x * 0.05) * 2
              return (
                <g key={`near-${i}`} transform={`translate(${x}, ${1620 + yOffset})`}>
                  <path
                    d={`M 0 0 Q -${curve} -${height1 * 0.5} 0 -${height1}`}
                    stroke={mode === 'dark' ? '#1E8449' : '#239B56'}
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <path
                    d={`M 0 0 Q ${curve} -${height2 * 0.5} 0 -${height2}`}
                    stroke={mode === 'dark' ? '#1E8449' : '#239B56'}
                    strokeWidth="2.5"
                    fill="none"
                  />
                </g>
              )
            }
          )}
        </g>

        {/* Separate path for bus to follow - only the hill curves */}
        <path
          id="roadPath"
          d="M -200 1400 Q 50 1200 250 1400 Q 500 1600 750 1400 Q 1000 1200 1250 1400 Q 1500 1600 1750 1400 Q 2000 1200 2200 1400"
          fill="none"
          stroke="none"
        />

        {/* Bus from original SVG */}
        <g ref={busRef} transform="scale(0.65)">
          <g ref={busBumpRef}>
            <path
              d="M889.5 670.8V400.5c0-41.2-33.7-75-75-75H191.6c-41.2 0-75 33.7-75 75v270.3h772.9z"
              fill="#EDB137"
            />
            <path
              d="M835.5 579.9H116.6v181.9h772.9V633.9c0-29.7-24.3-54-54-54z"
              fill="#F35428"
            />
            <path
              d="M928.3 781.3H74.8c-5.3 0-9.7-4.4-9.7-9.7v-19.8c0-5.3 4.4-9.7 9.7-9.7h853.6c5.3 0 9.7 4.4 9.7 9.7v19.8c-0.1 5.3-4.4 9.7-9.8 9.7z"
              fill="#E7E9E6"
            />
            <path
              d="M65.1 763.8v7.9c0 5.3 4.4 9.7 9.7 9.7h853.6c5.3 0 9.7-4.4 9.7-9.7v-7.9h-873z"
              fill="#C9C9C9"
            />
            <path
              d="M946.9 734.7h-45.4c-6.6 0-12-5.4-12-12V562.6c0-6.6 5.4-12 12-12h45.4c6.6 0 12 5.4 12 12v160.1c0 6.6-5.4 12-12 12z"
              fill="#686868"
            />
            <path
              d="M889.5 669.8v52.9c0 6.6 5.4 11.9 11.9 11.9H947c6.6 0 11.9-5.4 11.9-11.9v-52.9h-69.4z"
              fill="#3F3F3F"
            />
            <path
              d="M363.6 370.4h-58.9c-52.7 0-95.7 32.8-95.7 72.8v93h154.6V370.4zM390 370.4h190.4v165.8H390zM666.9 370.4h-59.7v165.8h155.5v-93c-0.1-40-43.2-72.8-95.8-72.8z"
              fill="#B9E3E8"
            />
            <path
              d="M777.6 627.3H163.9c-2.8 0-5-2.3-5-5v-10.2c0-2.8 2.3-5 5-5h613.7c2.8 0 5 2.3 5 5v10.2c0 2.8-2.2 5-5 5z"
              fill="#F5DED9"
            />
            <path
              d="M704.1 429.5l2.2 1.2c7.8 4.2 17.7 1.3 21.9-6.5 4.2-7.8 1.3-17.7-6.5-21.9l-2.2-1.2c-7.8-4.2-17.7-1.3-21.9 6.5-4.2 7.8-1.3 17.6 6.5 21.9z"
              fill="#EBF5F6"
            />
            <path
              d="M944.1 700.8c-4.8 0-8.8-3.9-8.8-8.8V589.2c0-4.8 3.9-8.8 8.8-8.8 4.8 0 8.8 3.9 8.8 8.8v102.9c-0.1 4.8-4 8.7-8.8 8.7z"
              fill="#C9C9C9"
            />
            <path
              d="M804.2 308.1H195.9c-6.7 0-12.1-5.5-12.1-12.1 0-6.7 5.5-12.1 12.1-12.1h608.3c6.7 0 12.1 5.5 12.1 12.1s-5.4 12.1-12.1 12.1z"
              fill="#383838"
            />

            {/* Luggage pieces */}
            <g ref={luggage3Ref}>
              <path
                d="M401.4 283.8H266.7c-5.5 0-10-4.5-10-10V170c0-5.5 4.5-10 10-10h134.7c5.5 0 10 4.5 10 10v103.8c0 5.5-4.4 10-10 10z"
                fill="#9CCF4C"
              />
              <path
                d="M390 256.5c-5.8 0-10.6-4.8-10.6-10.6v-57.6c0-5.8 4.8-10.6 10.6-10.6s10.6 4.8 10.6 10.6v57.6c-0.1 5.8-4.8 10.6-10.6 10.6z"
                fill="#F1F7E4"
              />
            </g>

            <g ref={luggage2Ref}>
              <path
                d="M544.1 283.8h-81.7c-5.5 0-10-4.5-10-10v-61.3c0-5.5 4.5-10 10-10h81.7c5.5 0 10 4.5 10 10v61.3c0 5.5-4.5 10-10 10z"
                fill="#F35129"
              />
              <path
                d="M533 237.2c-5.8 0-10.6-4.8-10.6-10.6S527.2 216 533 216s10.6 4.8 10.6 10.6c0 5.9-4.8 10.6-10.6 10.6z"
                fill="#F4E7E3"
              />
            </g>

            <g ref={luggage1Ref}>
              <path
                d="M720.7 283.8H590.4c-5.5 0-10-4.5-10-10V173.6c0-5.5 4.5-10 10-10h130.3c5.5 0 10 4.5 10 10v100.2c0 5.5-4.5 10-10 10z"
                fill="#239EC7"
              />
              <path
                d="M702.4 236.3c-5.8 0-10.6-4.8-10.6-10.6v-37.5c0-5.8 4.8-10.6 10.6-10.6s10.6 4.8 10.6 10.6v37.5c-0.1 5.9-4.8 10.6-10.6 10.6z"
                fill="#E0EDEF"
              />
            </g>
          </g>

          {/* Wheels */}
          <g ref={wheel1Ref} transform="translate(315.9, 789.9)">
            <circle cx="0" cy="0" r="74.1" fill="#4A4D4A" />
            <circle cx="0" cy="0" r="33" fill="#E5E5E5" />
            <path
              d="M-63.5-6.1c19.8-35.8 64.9-48.7 100.7-28.9 18.6 10.3 31 27.5 35.9 46.6 4.8-30-9.2-61-37.3-76.6-35.7-19.9-80.8-6.9-100.6 28.9-9.5 17.2-11.5 36.5-7 54.1 1.3-8.2 4.1-16.4 8.3-24.1z"
              fill="#383838"
            />
          </g>

          <g ref={wheel2Ref} transform="translate(702.4, 789.9)">
            <circle cx="0" cy="0" r="74.1" fill="#4A4D4A" />
            <circle cx="0" cy="0" r="33" fill="#E5E5E5" />
            <path
              d="M-63.5-6.1c19.8-35.8 64.9-48.7 100.7-28.9 18.6 10.3 31 27.5 35.9 46.6 4.8-30-9.2-61-37.3-76.6-35.8-19.8-80.9-6.9-100.7 28.9-9.5 17.2-11.5 36.5-7 54.1 1.4-8.2 4.1-16.4 8.4-24.1z"
              fill="#383838"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}

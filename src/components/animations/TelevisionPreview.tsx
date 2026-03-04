import { useState, type ComponentType } from 'react'
import { motion } from 'framer-motion'
import { StaticEffect } from './StaticEffect'
import { Lighthouse } from './Lighthouse'
import { RustlingGrass } from './RustlingGrass'
import { AnimatedMoon } from './AnimatedMoon'
import { AnimatedEyeball } from './AnimatedEyeball'
import { AnimatedEyeballWatching } from './AnimatedEyeballWatching'
import { NoirCarChase } from './NoirCarChase'
import { AlienMoon } from './AlienMoon'
import { AnimatedLamp } from './AnimatedLamp'
import { Bird } from './Bird'
import { AnimatedLoadingAirplane } from './AnimatedLoadingAirplane'
import { AnimatedOctoDude } from './AnimatedOctoDude'
import { NuclearPhysics } from './NuclearPhysics'
import { Bus } from './Bus'
import { PadelPointBerlin } from './PadelPointBerlin'
import styles from './TelevisionPreview.module.css'

const ANIMATIONS: ComponentType[] = [
  Lighthouse,
  RustlingGrass,
  AnimatedMoon,
  AnimatedEyeball,
  AnimatedEyeballWatching,
  NoirCarChase,
  AlienMoon,
  AnimatedLamp,
  Bird,
  AnimatedLoadingAirplane,
  AnimatedOctoDude,
  NuclearPhysics,
  Bus,
  PadelPointBerlin,
]

function TelevisionPreview() {
  const [isPoweredOn, setIsPoweredOn] = useState(false)
  const [currentChannel, setCurrentChannel] = useState(0)
  const [showStatic, setShowStatic] = useState(false)
  const [hasBeenPoweredOn, setHasBeenPoweredOn] = useState(false)
  const [channelRotation, setChannelRotation] = useState(0)

  const handlePowerClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const newState = !isPoweredOn
    setIsPoweredOn(newState)

    if (newState) {
      setShowStatic(true)
      setTimeout(() => setShowStatic(false), 1000)
      if (!hasBeenPoweredOn) {
        setHasBeenPoweredOn(true)
      }
    }
  }

  const handleChannelClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isPoweredOn) return

    setShowStatic(true)
    setChannelRotation((prev) => prev + 60)
    setTimeout(() => {
      setCurrentChannel((prev) => (prev + 1) % ANIMATIONS.length)
      setShowStatic(false)
    }, 500)
  }

  const CurrentAnimation = ANIMATIONS[currentChannel]

  return (
    <div className={styles.container}>
      <svg
        viewBox="0 69 496.2 325"
        className={styles.tv}
        style={{
          filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))',
        }}
      >
        {/* TV Frame */}
        <path
          style={{ fill: '#774518' }}
          d="M415.7,377.4c0,5.4-4.4,9.7-9.7,9.7H90.2c-5.4,0-9.7-4.4-9.7-9.7V178.1c0-5.4,4.4-9.7,9.7-9.7H406c5.4,0,9.7,4.4,9.7,9.7V377.4z"
        />

        {/* Control Panel */}
        <rect x="362.1" y="286.3" style={{ fill: '#60320D' }} width="44.9" height="81.9" />

        {/* Speaker Grills */}
        <g>
          {[296.2, 306.1, 315.7, 325.5, 334.9, 344.7, 354.4, 364.2].map((y) => (
            <path
              key={y}
              style={{ fill: '#774518' }}
              d={`M401,${y}h-33.1c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9H401c1.6,0,2.9,1.3,2.9,2.9S402.6,${y},401,${y}z`}
            />
          ))}
        </g>

        {/* Screen Outer Frame */}
        <path
          style={{ fill: '#262625' }}
          d="M104.5,201.2c0-7.8,6.3-14.1,14.1-14.1h222.7c7.8,0,14.1,6.3,14.1,14.1v152.9c0,7.8-6.3,14.1-14.1,14.1H118.6c-7.8,0-14.1-6.3-14.1-14.1V201.2z"
        />

        {/* Screen Inner Area */}
        <path
          style={{ fill: '#3A3A38' }}
          d="M112.4,207.7c0-7.1,5.8-12.9,12.9-12.9h208.6c7.1,0,12.9,5.8,12.9,12.9v140.1c0,7.1-5.8,12.9-12.9,12.9H125.3c-7.1,0-12.9-5.8-12.9-12.9C112.4,347.8,112.4,207.7,112.4,207.7z"
        />

        {/* Screen Content */}
        <g transform="translate(112.4, 194.8)">
          <foreignObject width="234.4" height="165.9">
            <div className={styles.screenContent}>
              <motion.div
                animate={{ backgroundColor: isPoweredOn ? '#000' : '#3a3a38' }}
                transition={{ duration: 0.3 }}
                className={styles.screenInner}
              >
                {isPoweredOn && (showStatic ? <StaticEffect /> : <CurrentAnimation />)}
              </motion.div>
            </div>
          </foreignObject>
        </g>

        {/* Power Button */}
        <motion.g
          animate={
            !hasBeenPoweredOn
              ? { scale: [1, 1.15, 1, 1.1, 1], rotate: [0, -5, 5, -3, 0] }
              : { scale: 1, rotate: 0 }
          }
          transition={
            !hasBeenPoweredOn
              ? { duration: 2, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }
              : { duration: 0.3 }
          }
          style={{ transformOrigin: '384.9px 208.3px' }}
        >
          <circle
            style={{ fill: '#B79251', cursor: 'pointer' }}
            cx="384.9"
            cy="208.3"
            r="18.8"
            onClick={handlePowerClick}
          />
          <circle
            style={{ fill: isPoweredOn ? '#4ade80' : '#3A3A38', transition: 'fill 0.3s' }}
            cx="384.9"
            cy="208.3"
            r="12.5"
            pointerEvents="none"
          />
          <path
            style={{ fill: '#B79251' }}
            d="M391.6,210.7l-9-9c-0.6-0.6-1.5-0.6-2.1,0l-2.2,2.2c-0.3,0.3-0.4,0.7-0.4,1.1c0,0.4,0.2,0.8,0.4,1.1l9,9c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4l2.2-2.2c0.3-0.3,0.4-0.7,0.4-1.1S391.9,211,391.6,210.7z"
            pointerEvents="none"
          />
        </motion.g>

        {/* Channel Button */}
        <motion.g
          animate={{ rotate: channelRotation }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ transformOrigin: '384.9px 255.4px' }}
        >
          <circle
            style={{ fill: '#B79251', cursor: 'pointer' }}
            cx="384.9"
            cy="255.4"
            r="18.8"
            onClick={handleChannelClick}
          />
          <circle style={{ fill: '#3a3a38' }} cx="384.9" cy="255.4" r="12.5" pointerEvents="none" />
          <path
            style={{ fill: '#b79251' }}
            d="m 382.6,262.1 9,-9 c 0.6,-0.6 0.6,-1.5 0,-2.1 l -2.2,-2.2 c -0.3,-0.3 -0.7,-0.4 -1.1,-0.4 -0.4,0 -0.8,0.2 -1.1,0.4 l -9,9 c -0.3,0.3 -0.4,0.7 -0.4,1.1 0,0.4 0.1,0.8 0.4,1.1 l 2.2,2.2 c 0.3,0.3 0.7,0.4 1.1,0.4 0.4,-0.1 0.8,-0.2 1.1,-0.5 z"
            pointerEvents="none"
          />
        </motion.g>

        {/* Antenna */}
        <g>
          <path
            style={{ fill: '#3a3a38' }}
            d="M 309.9,78.2 C 309,77.5 307.7,77.7 307,78.6 L 246.2,158.7 185,78.6 c -0.7,-0.9 -2,-1.1 -2.9,-0.4 -0.9,0.7 -1.1,2 -0.4,2.9 l 62,84 c 0.6,0.8 1.5,1.2 2.3,1.2 0.1,0 0.2,0 0.2,0 0.1,0 0.2,0 0.2,0 0.9,0 1.8,-0.4 2.3,-1.2 l 61.6,-84 c 0.7,-0.9 0.6,-2.2 -0.4,-2.9 z"
          />
          <circle style={{ fill: '#3a3a38' }} cx="308.7" cy="78.6" r="5.5" />
          <circle style={{ fill: '#3a3a38' }} cx="182.4" cy="78.6" r="5.5" />
        </g>

        {/* Antenna Base */}
        <ellipse style={{ fill: '#774518' }} cx="248.1" cy="170.5" rx="26.1" ry="12" />
      </svg>
    </div>
  )
}

export { TelevisionPreview }

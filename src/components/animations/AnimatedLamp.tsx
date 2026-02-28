import { motion } from 'framer-motion'
import { useState } from 'react'

const variants = {
  on: { opacity: 1, originY: 100 },
  off: { opacity: 0, originY: 0 },
}

const backgroundVariants = {
  on: { backgroundColor: '#f5f5dc' },
  off: { backgroundColor: '#1a1a1a' },
}

const roomObjectVariants = {
  on: { opacity: 0.8 },
  off: { opacity: 0 },
}

export function AnimatedLamp() {
  const [lampOn, setLampOn] = useState(false)
  return (
    <motion.div
      initial={{ backgroundColor: '#1a1a1a' }}
      animate={lampOn ? 'on' : 'off'}
      variants={backgroundVariants}
      style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      transition={{
        type: 'spring',
        duration: 1.5,
      }}
    >
      <svg
        viewBox="0 0 300 300"
        id="Layer_1"
        version="1.1"
        height="100%"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        {/* Room Objects - only visible when light is on */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={lampOn ? 'on' : 'off'}
          variants={roomObjectVariants}
          transition={{ duration: 0.8 }}
        >
          {/* Bookshelf on the left - much bigger */}
          <rect x="10" y="100" width="100" height="190" fill="#8B4513" />
          <rect x="17" y="110" width="86" height="45" fill="#654321" />
          <rect x="17" y="160" width="86" height="45" fill="#654321" />
          <rect x="17" y="210" width="86" height="45" fill="#654321" />
          <rect x="17" y="260" width="86" height="25" fill="#654321" />

          {/* Books on shelf - more and bigger */}
          <rect x="22" y="115" width="12" height="35" fill="#c41e3a" />
          <rect x="36" y="115" width="10" height="35" fill="#0f4c81" />
          <rect x="48" y="115" width="11" height="35" fill="#2d5016" />
          <rect x="61" y="115" width="13" height="35" fill="#7c3f00" />
          <rect x="76" y="115" width="10" height="35" fill="#8b008b" />
          <rect x="88" y="115" width="9" height="35" fill="#1a472a" />

          <rect x="22" y="165" width="14" height="35" fill="#4a5d23" />
          <rect x="38" y="165" width="11" height="35" fill="#800020" />
          <rect x="51" y="165" width="10" height="35" fill="#1c2841" />
          <rect x="63" y="165" width="12" height="35" fill="#5d3a1a" />
          <rect x="77" y="165" width="11" height="35" fill="#2f4f4f" />
          <rect x="90" y="165" width="9" height="35" fill="#8b4513" />

          <rect x="22" y="215" width="13" height="35" fill="#556b2f" />
          <rect x="37" y="215" width="10" height="35" fill="#8b0000" />
          <rect x="49" y="215" width="12" height="35" fill="#191970" />
          <rect x="63" y="215" width="11" height="35" fill="#654321" />
          <rect x="76" y="215" width="13" height="35" fill="#2e8b57" />
          <rect x="91" y="215" width="9" height="35" fill="#b8860b" />
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={lampOn ? 'on' : 'off'}
          variants={roomObjectVariants}
          transition={{ duration: 0.8 }}
        >
          {/* Plant in front of the bookshelf */}
          <ellipse cx="130" cy="275" rx="20" ry="10" fill="#8B4513" />
          <path d="M 130 275 Q 118 250 124 220" stroke="#2d5016" strokeWidth="4" fill="none" />
          <ellipse cx="124" cy="220" rx="16" ry="24" fill="#4a7c59" opacity="0.8" />
          <ellipse cx="136" cy="226" rx="14" ry="20" fill="#5d8a66" opacity="0.7" />
          <ellipse cx="127" cy="212" rx="15" ry="22" fill="#3a6b47" opacity="0.8" />
        </motion.g>

        <g id="Layer_1-2">
          <path
            className="st0"
            d="M180,40L180,40c27.6,0,50,22.4,50,50v200"
            style={{
              fill: 'none',
              stroke: '#2d3642',
              strokeWidth: '10',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
          />
          <motion.path
            initial={{ opacity: 0 }}
            animate={lampOn ? 'on' : 'off'}
            variants={variants}
            transition={{
              type: 'spring',
              bounce: 1,
              duration: 1.5,
            }}
            fill="#e0d671"
            fillOpacity={0.6}
            d="M10 300 110 80 170 80 160 300z"
          />
          <path
            className="st0"
            d="M90,80l53.9-62.8c3.9-4.6,9.6-7.2,15.6-7.2l0,0c11.3,0,20.6,9.2,20.6,20.5c0,0,0,0,0,0V80H90z"
            style={{
              fill: '#2d3642',
              stroke: '#2d3642',
              strokeWidth: '10',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
          />
          <path
            className="st0"
            d="M280 290 180 290"
            style={{
              fill: 'none',
              stroke: '#2d3642',
              strokeWidth: '20',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
          />
          <g className="hover:cursor-pointer">
            <motion.path
              animate={{
                x: [0, 1, -1, 1, -1, 1, 0],
                y: [0, 1, -1, 1, -1, 1, 0],
              }}
              transition={{ duration: 0.5, repeat: 3, repeatDelay: 1 }}
              d="M260,200L260,200c0,5.5-4.5,10-10,10h-10l0,0v-20l0,0h10C255.5,190,260,194.5,260,200z"
              fill="#168c84"
              onClick={() => setLampOn(!lampOn)}
              whileHover={{ scale: 1.1 }}
              cursor={'pointer'}
            />
          </g>
        </g>
      </svg>
    </motion.div>
  )
}

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

export function MuppetPodcaster() {
  const containerRef = useRef<SVGSVGElement>(null)
  const leftEyeRef = useRef<SVGGElement>(null)
  const rightEyeRef = useRef<SVGGElement>(null)
  const headRef = useRef<SVGGElement>(null)
  const paperRef = useRef<SVGGElement>(null)

  // Store blink delayedCall in ref so it persists and can be killed reliably
  const blinkCallbackRef = useRef<gsap.core.Tween | null>(null)

  // Mode state: "talk" or "listenToMusic"
  const [mode, setMode] = useState<'talk' | 'listenToMusic'>('talk')

  // Mouth state for audio sync - easily controllable externally
  const [mouthState, setMouthState] = useState<'closed' | 'half' | 'open'>('closed')

  // Audio mute state
  const [isMuted, setIsMuted] = useState(false)

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !leftEyeRef.current ||
        !rightEyeRef.current ||
        !headRef.current ||
        !paperRef.current
      )
        return

      // Paper animation based on mode - only fade opacity
      if (mode === 'listenToMusic') {
        // Fade out paper when switching to music mode
        gsap.to(paperRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        })
      } else {
        // Fade in paper when switching to talk mode
        gsap.to(paperRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        })
      }

      // CRITICAL: Kill ALL animations and delayedCalls on eye refs to prevent orphaned blinks
      // This kills any ongoing animations AND any scheduled delayedCalls
      if (blinkCallbackRef.current) {
        blinkCallbackRef.current.kill()
        blinkCallbackRef.current = null
      }
      gsap.killTweensOf([leftEyeRef.current, rightEyeRef.current])

      // Eye state based on mode
      if (mode === 'listenToMusic') {
        // Half-closed eyes for relaxed look - use SET (not animate) and NEVER blink
        gsap.set([leftEyeRef.current, rightEyeRef.current], {
          scaleY: 0.6,
          transformOrigin: 'center',
        })
        // NO blinking logic whatsoever in music mode
      } else {
        // Talk mode: Fully open eyes and start blinking
        gsap.set([leftEyeRef.current, rightEyeRef.current], {
          scaleY: 1,
          transformOrigin: 'center',
        })

        // Blinking function - checks mode before executing to prevent orphaned calls
        const blinkEyes = () => {
          // Safety check: Only blink if still in talk mode
          if (mode !== 'talk') return

          const blinkTimeline = gsap.timeline()
          blinkTimeline
            .to([leftEyeRef.current, rightEyeRef.current], {
              scaleY: 0.1,
              duration: 0.08,
              ease: 'power2.in',
              transformOrigin: 'center',
            })
            .to([leftEyeRef.current, rightEyeRef.current], {
              scaleY: 1,
              duration: 0.08,
              ease: 'power2.out',
            })

          // Schedule next blink only if in talk mode
          if (mode === 'talk') {
            blinkCallbackRef.current = gsap.delayedCall(gsap.utils.random(2, 5), blinkEyes)
          }
        }

        // Start blinking after initial delay
        blinkCallbackRef.current = gsap.delayedCall(1, blinkEyes)
      }

      // Head bob/tilt animation - different parameters based on mode
      const headAnimation = gsap.to(headRef.current, {
        y: mode === 'listenToMusic' ? 15 : 5,
        rotation: mode === 'listenToMusic' ? 5 : 2,
        duration: mode === 'listenToMusic' ? 1.2 : 2.5,
        repeat: -1,
        yoyo: true,
        ease: mode === 'listenToMusic' ? 'power1.inOut' : 'sine.inOut',
        transformOrigin: 'center bottom',
      })

      // Mouth animation cycle - only in talk mode
      let mouthCycle: gsap.core.Timeline | null = null

      if (mode === 'talk') {
        mouthCycle = gsap.timeline({ repeat: -1, repeatDelay: 0.5 })
        mouthCycle
          .call(() => setMouthState('half'), [], 0)
          .to({}, { duration: 0.15 })
          .call(() => setMouthState('open'), [], 0.15)
          .to({}, { duration: 0.2 })
          .call(() => setMouthState('half'), [], 0.35)
          .to({}, { duration: 0.15 })
          .call(() => setMouthState('closed'), [], 0.5)
          .to({}, { duration: 0.8 })
      } else {
        // In listenToMusic mode, keep mouth closed (will render smile)
        setMouthState('closed')
      }

      // Cleanup - kill all animations and prevent orphaned blinks
      return () => {
        headAnimation.kill()
        if (mouthCycle) mouthCycle.kill()

        // Kill the blink delayedCall from ref
        if (blinkCallbackRef.current) {
          blinkCallbackRef.current.kill()
          blinkCallbackRef.current = null
        }

        // Kill any pending eye animations
        gsap.killTweensOf([leftEyeRef.current, rightEyeRef.current])
      }
    },
    { scope: containerRef, dependencies: [mode] }
  )

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 800 900"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ overflow: 'visible' }}
    >
      {/* Gradients */}
      <defs>
        <radialGradient id="backgroundGrad" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#f0f4f8" />
          <stop offset="100%" stopColor="#d4dce5" />
        </radialGradient>
        <linearGradient id="deskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b7355" />
          <stop offset="100%" stopColor="#654321" />
        </linearGradient>
        <radialGradient id="furGrad" cx="40%" cy="30%">
          <stop offset="0%" stopColor="#6bb3e0" />
          <stop offset="50%" stopColor="#5b9bd5" />
          <stop offset="100%" stopColor="#4a8bc2" />
        </radialGradient>
        <filter id="furTexture">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      {/* Background */}
      <rect width="800" height="900" fill="url(#backgroundGrad)" />

      {/* Body - simple organic muppet body (behind desk) */}
      <g>
        {/* Main body - rounded and furry */}
        <ellipse
          cx="400"
          cy="680"
          rx="120"
          ry="160"
          fill="url(#furGrad)"
          filter="url(#furTexture)"
        />
        {/* Fur texture details on body */}
        <g opacity="0.4">
          <ellipse cx="320" cy="630" rx="22" ry="32" fill="#4a8bc2" />
          <ellipse cx="480" cy="630" rx="22" ry="32" fill="#4a8bc2" />
          <ellipse cx="400" cy="780" rx="28" ry="38" fill="#4a8bc2" />
          <ellipse cx="340" cy="730" rx="20" ry="28" fill="#4a8bc2" />
          <ellipse cx="460" cy="730" rx="20" ry="28" fill="#4a8bc2" />
        </g>
      </g>

      {/* Simple desk edge at bottom */}
      <rect y="750" width="800" height="150" fill="url(#deskGrad)" />

      {/* Paper on desk - with perspective (trapezoid shape for depth) - animated based on mode */}
      <g ref={paperRef} transform="translate(300, 805) rotate(-8)">
        {/* Paper shadow - slightly offset trapezoid for depth */}
        <polygon points="-37,-70 37,-70 52,70 -52,70" fill="#f5f5f5" />

        {/* Main paper surface - trapezoid with perspective */}
        <polygon points="-35,-68 35,-68 48,68 -48,68" fill="#ffffff" />

        {/* Paper border following perspective */}
        <polygon
          points="-35,-68 35,-68 48,68 -48,68"
          fill="none"
          stroke="#ddd"
          strokeWidth="1.5"
        />

        {/* Text lines on paper - following perspective trapezoid */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
          const yPos = -55 + i * 14
          const progress = (yPos + 55) / 123
          const topWidth = 60
          const bottomWidth = 76
          const lineWidth = topWidth + (bottomWidth - topWidth) * progress
          const halfWidth = lineWidth / 2

          return (
            <line
              key={i}
              x1={-halfWidth}
              y1={yPos}
              x2={halfWidth}
              y2={yPos}
              stroke="#999"
              strokeWidth="1.5"
              opacity="0.6"
            />
          )
        })}

        {/* Subtle fold/crease following perspective width at that depth */}
        <line x1="-42" y1="-30" x2="42" y2="-30" stroke="#e8e8e8" strokeWidth="1" opacity="0.5" />
      </g>

      {/* Arms */}
      <g>
        {/* Left arm and hand - angled outward */}
        <g transform="rotate(15 310 570)">
          <ellipse
            cx="310"
            cy="650"
            rx="25"
            ry="80"
            fill="url(#furGrad)"
            filter="url(#furTexture)"
          />
          {/* Left hand palm */}
          <ellipse cx="310" cy="730" rx="35" ry="25" fill="url(#furGrad)" />
          <ellipse cx="310" cy="730" rx="30" ry="20" fill="#5b9bd5" />
          {/* Fingers - larger and more distinct */}
          <ellipse
            cx="285"
            cy="745"
            rx="10"
            ry="25"
            fill="#5b9bd5"
            transform="rotate(-15 285 745)"
          />
          <ellipse cx="302" cy="750" rx="10" ry="28" fill="#5b9bd5" />
          <ellipse cx="318" cy="750" rx="10" ry="28" fill="#5b9bd5" />
          <ellipse
            cx="335"
            cy="745"
            rx="10"
            ry="25"
            fill="#5b9bd5"
            transform="rotate(15 335 745)"
          />
          {/* Thumb - on right side of left hand */}
          <ellipse
            cx="340"
            cy="735"
            rx="12"
            ry="22"
            fill="#5b9bd5"
            transform="rotate(110 340 735)"
          />
        </g>

        {/* Right arm and hand - angled outward */}
        <g transform="rotate(-15 490 570)">
          <ellipse
            cx="490"
            cy="650"
            rx="25"
            ry="80"
            fill="url(#furGrad)"
            filter="url(#furTexture)"
          />
          {/* Right hand palm */}
          <ellipse cx="490" cy="730" rx="35" ry="25" fill="url(#furGrad)" />
          <ellipse cx="490" cy="730" rx="30" ry="20" fill="#5b9bd5" />
          {/* Fingers - larger and more distinct */}
          <ellipse
            cx="465"
            cy="745"
            rx="10"
            ry="25"
            fill="#5b9bd5"
            transform="rotate(-15 465 745)"
          />
          <ellipse cx="482" cy="750" rx="10" ry="28" fill="#5b9bd5" />
          <ellipse cx="498" cy="750" rx="10" ry="28" fill="#5b9bd5" />
          <ellipse
            cx="515"
            cy="745"
            rx="10"
            ry="25"
            fill="#5b9bd5"
            transform="rotate(15 515 745)"
          />
          {/* Thumb - on left side of right hand */}
          <ellipse
            cx="460"
            cy="735"
            rx="12"
            ry="22"
            fill="#5b9bd5"
            transform="rotate(-110 460 735)"
          />
        </g>
      </g>

      {/* Head group - for bob/tilt animation */}
      <g ref={headRef}>
        {/* Neck */}
        <ellipse cx="400" cy="520" rx="30" ry="25" fill="#5b9bd5" />

        {/* Main head - bright blue shaggy fur */}
        <ellipse
          cx="400"
          cy="350"
          rx="140"
          ry="160"
          fill="url(#furGrad)"
          filter="url(#furTexture)"
        />

        {/* Fur texture details - shaggy tufts */}
        <g opacity="0.4">
          {/* Side tufts */}
          <ellipse cx="270" cy="320" rx="25" ry="35" fill="#4a8bc2" />
          <ellipse cx="530" cy="320" rx="25" ry="35" fill="#4a8bc2" />
          <ellipse cx="260" cy="380" rx="20" ry="30" fill="#4a8bc2" />
          <ellipse cx="540" cy="380" rx="20" ry="30" fill="#4a8bc2" />
        </g>

        {/* Eyes container */}
        <g>
          {/* Left eye white */}
          <g ref={leftEyeRef} transform="translate(340, 320)">
            <ellipse cx="0" cy="0" rx="35" ry="45" fill="#ffffff" />
            {/* Pupil */}
            <ellipse cx="5" cy="8" rx="18" ry="22" fill="#000000" />
            {/* Highlight */}
            <ellipse cx="10" cy="0" rx="8" ry="10" fill="#ffffff" />
          </g>

          {/* Right eye white */}
          <g ref={rightEyeRef} transform="translate(460, 320)">
            <ellipse cx="0" cy="0" rx="35" ry="45" fill="#ffffff" />
            {/* Pupil */}
            <ellipse cx="-5" cy="8" rx="18" ry="22" fill="#000000" />
            {/* Highlight */}
            <ellipse cx="-10" cy="0" rx="8" ry="10" fill="#ffffff" />
          </g>
        </g>

        {/* Pink oval nose */}
        <ellipse cx="400" cy="400" rx="28" ry="22" fill="#ffb6c1" />
        <ellipse cx="400" cy="405" rx="24" ry="18" fill="#ffc9d6" />

        {/* Mouth states - controlled by state variable and mode */}
        <g>
          {mode === 'talk' ? (
            <>
              {/* Talk mode - animated mouth states */}
              {/* Closed mouth */}
              {mouthState === 'closed' && (
                <path
                  d="M 360 440 Q 400 450 440 440"
                  fill="none"
                  stroke="#2a1810"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              )}

              {/* Half open mouth */}
              {mouthState === 'half' && (
                <ellipse
                  cx="400"
                  cy="445"
                  rx="35"
                  ry="18"
                  fill="#2a1810"
                  stroke="#2a1810"
                  strokeWidth="2"
                />
              )}

              {/* Open mouth */}
              {mouthState === 'open' && (
                <g>
                  <ellipse
                    cx="400"
                    cy="450"
                    rx="40"
                    ry="30"
                    fill="#2a1810"
                    stroke="#2a1810"
                    strokeWidth="2"
                  />
                  {/* Tongue hint */}
                  <ellipse cx="400" cy="460" rx="25" ry="15" fill="#ff6b7a" />
                </g>
              )}
            </>
          ) : (
            <>
              {/* Listen to music mode - relaxed smile (bigger and more curved) */}
              <path
                d="M 350 440 Q 400 465 450 440"
                fill="none"
                stroke="#2a1810"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </>
          )}
        </g>
      </g>

      {/* Microphone stand and mic (foreground layer) */}
      <g opacity="1">
        {/* Stand pole - thicker and more visible */}
        <rect x="680" y="480" width="12" height="270" fill="#2a2a2a" rx="3" />
        <rect x="680" y="480" width="12" height="270" fill="#3a3a3a" rx="3" opacity="0.5" />
        {/* Base - larger */}
        <ellipse cx="686" cy="750" rx="45" ry="10" fill="#1a1a1a" />
        <ellipse cx="686" cy="748" rx="40" ry="8" fill="#2a2a2a" />
        {/* Arm extending toward muppet - thicker */}
        <rect
          x="540"
          y="474"
          width="150"
          height="12"
          fill="#2a2a2a"
          rx="3"
          transform="rotate(10 680 480)"
        />
        <rect
          x="540"
          y="474"
          width="150"
          height="12"
          fill="#3a3a3a"
          rx="3"
          opacity="0.5"
          transform="rotate(10 680 480)"
        />
        {/* Microphone head - larger and more prominent */}
        <ellipse cx="570" cy="460" rx="35" ry="50" fill="#3a3a3a" />
        <ellipse cx="570" cy="460" rx="30" ry="45" fill="#1a1a1a" />
        {/* Mic mesh texture - larger */}
        <g opacity="0.4">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <line
              key={i}
              x1="540"
              y1={420 + i * 8}
              x2="600"
              y2={420 + i * 8}
              stroke="#666"
              strokeWidth="1.5"
            />
          ))}
        </g>
        {/* Mic highlight for depth */}
        <ellipse cx="575" cy="450" rx="12" ry="20" fill="#4a4a4a" opacity="0.6" />
      </g>

      {/* Mode toggle button in lower right corner */}
      <g
        onClick={() => setMode(mode === 'talk' ? 'listenToMusic' : 'talk')}
        style={{ cursor: 'pointer' }}
        opacity="0.8"
      >
        {mode === 'talk' ? (
          <>
            {/* Music note icon for switching to listenToMusic mode */}
            <circle cx="735" cy="845" r="25" fill="#5b9bd5" opacity="0.3" />
            <ellipse cx="720" cy="850" rx="8" ry="10" fill="#3a3a3a" />
            <rect x="728" y="830" width="3" height="20" fill="#3a3a3a" />
            <path
              d="M 728 830 Q 745 825 745 840 L 745 855"
              fill="none"
              stroke="#3a3a3a"
              strokeWidth="3"
            />
            <ellipse cx="745" cy="855" rx="8" ry="10" fill="#3a3a3a" />
          </>
        ) : (
          <>
            {/* Microphone icon for switching back to talk mode */}
            <circle cx="735" cy="845" r="25" fill="#ffb6c1" opacity="0.3" />
            <rect x="725" y="830" width="20" height="25" rx="10" fill="#3a3a3a" />
            <rect x="733" y="855" width="4" height="15" fill="#3a3a3a" />
            <rect x="725" y="868" width="20" height="3" fill="#3a3a3a" />
          </>
        )}
      </g>

      {/* Volume/Mute icon in lower left corner */}
      <g onClick={() => setIsMuted(!isMuted)} style={{ cursor: 'pointer' }} opacity="0.8">
        {/* Speaker */}
        <rect x="40" y="835" width="15" height="20" fill="#3a3a3a" rx="2" />
        <path d="M 55 835 L 70 825 L 70 865 L 55 855 Z" fill="#3a3a3a" />

        {/* Sound waves (visible when not muted) */}
        {!isMuted && (
          <g>
            <path
              d="M 75 835 Q 80 835 80 845 Q 80 855 75 855"
              fill="none"
              stroke="#3a3a3a"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 82 830 Q 90 830 90 845 Q 90 860 82 860"
              fill="none"
              stroke="#3a3a3a"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* X through speaker when muted */}
        {isMuted && (
          <g>
            <line
              x1="75"
              y1="830"
              x2="95"
              y2="860"
              stroke="#ff4444"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="95"
              y1="830"
              x2="75"
              y2="860"
              stroke="#ff4444"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        )}
      </g>
    </svg>
  )
}

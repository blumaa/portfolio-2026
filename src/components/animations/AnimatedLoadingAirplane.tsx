import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import styles from './AnimatedLoadingAirplane.module.css'

gsap.registerPlugin(useGSAP)

export function AnimatedLoadingAirplane() {
  const containerRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<SVGGElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current || !planeRef.current) return

      const clouds = containerRef.current.querySelectorAll('.cloud')
      const plane = planeRef.current

      gsap.set(clouds, { opacity: 0 })
      gsap.fromTo(
        clouds,
        { y: -1000, x: 1000, opacity: 0 },
        {
          opacity: 1,
          y: 1000,
          x: -1000,
          duration: 4,
          stagger: 2,
          repeat: -1,
        }
      )

      function random(min: number, max: number) {
        const delta = max - min
        return (direction = 1) => (min + delta * Math.random()) * direction
      }

      const randomX = random(1, 2)
      const randomY = random(2, 3)
      const randomDelay = random(0, 1)
      const randomTime = random(3, 5)
      const randomTime2 = random(5, 10)
      const randomAngle = random(8, 12)

      gsap.set(plane, {
        x: randomX(-1),
        y: randomX(1),
        rotation: randomAngle(-1),
        transformOrigin: 'center center',
      })

      function rotate(target: SVGGElement, direction: number) {
        gsap.to(target, {
          rotation: randomAngle(direction),
          delay: randomDelay(),
          duration: randomTime2(),
          ease: 'sine.inOut',
          onComplete: () => rotate(target, direction * -1),
        })
      }

      function moveX(target: SVGGElement, direction: number) {
        gsap.to(target, {
          x: randomX(direction),
          ease: 'sine.inOut',
          duration: randomTime(),
          onComplete: () => moveX(target, direction * -1),
        })
      }

      function moveY(target: SVGGElement, direction: number) {
        gsap.to(target, {
          y: randomY(direction),
          ease: 'sine.inOut',
          duration: randomTime(),
          onComplete: () => moveY(target, direction * -1),
        })
      }

      moveX(plane, 1)
      moveY(plane, -1)
      rotate(plane, 1)
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className={styles.container}
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 1024 1024">
        <path
          className="cloud"
          fill="#ccd6dd"
          d="M849.016 101.974a79.023 70.271 0 0 0-22.813 3c.056-1.007.17-1.983.17-3a67.906 60.385 0 0 0-133.422-15.837 67.634 60.143 0 0 0-25.077-4.298 67.928 60.405 0 1 0 0 120.81 67.906 60.385 0 0 0 65.494-44.58 67.645 60.153 0 0 0 25.077 4.31c4.245 0 8.378-.393 12.408-1.047-.657 3.624-1.087 7.319-1.087 11.114 0 38.911 35.493 70.473 79.25 70.473s79.25-31.562 79.25-70.473a79.25 70.473 0 0 0-79.25-70.472zM318.37 98.128a79.023 70.271 0 0 0-22.813 3c.056-1.007.17-1.983.17-3a67.906 60.385 0 0 0-133.423-15.836 67.634 60.143 0 0 0-25.076-4.3 67.928 60.405 0 1 0 0 120.811 67.906 60.385 0 0 0 65.494-44.579 67.645 60.153 0 0 0 25.077 4.31c4.245 0 8.378-.394 12.408-1.048-.657 3.624-1.087 7.32-1.087 11.115 0 38.91 35.493 70.472 79.25 70.472s79.25-31.561 79.25-70.472a79.25 70.473 0 0 0-79.25-70.473zM882.04 702.986a79.023 70.271 0 0 0-22.813 3c.056-1.007.17-1.983.17-3a67.906 60.385 0 0 0-133.423-15.836 67.634 60.143 0 0 0-25.077-4.3 67.928 60.405 0 1 0 0 120.811 67.906 60.385 0 0 0 65.495-44.579 67.645 60.153 0 0 0 25.076 4.309c4.246 0 8.378-.393 12.409-1.047-.657 3.624-1.087 7.319-1.087 11.114 0 38.911 35.492 70.473 79.25 70.473 43.757 0 79.25-31.562 79.25-70.473a79.25 70.473 0 0 0-79.25-70.472z"
        />
        <path
          className="cloud"
          fill="#e1e8ed"
          d="M927.325 843.931c-5.287 0-10.302.856-15.16 2.054 2.446-5.296 3.839-11.074 3.839-17.155a50.946 45.304 0 0 0-50.946-45.304 50.482 44.891 0 0 0-30.58 9.272 73.555 65.409 0 0 0-71.313-49.542 73.555 65.409 0 0 0-69.411 43.864 90.571 80.54 0 1 0-26.82 157.486h260.391c31.27 0 56.607-22.53 56.607-50.337 0-27.807-25.337-50.338-56.607-50.338z"
        />
        <g ref={planeRef} transform="scale(0.9)">
          <path
            fill="#c4e4ef"
            d="m178.84 723.599 92.168 93.463c4.493 4.557 8.352 9.29 12.164 14.25l563.515-555.7c36.365-35.861 38.66-92.415 5.181-126.364-33.523-33.995-90.148-32.535-126.513 3.325L161.43 708.678c6.169 4.524 11.973 9.407 17.41 14.92z"
          />
          <path
            fill="#6aa4ca"
            d="m735.862 384.9-18.427 474.335-55.96 55.183L552.854 565.37zm-337.9 333.214-3.457 125.742-66.122 65.205-42.659-80.265zM280.777 591.077l-125.734 1.747-66.03 65.115 79.571 43.775zm334.709-330.068L141.03 272.72l-56.05 55.274 347.543 113.439zM212.26 759.494l21.166 21.463c.988 1.003 1.976 2.186 2.737 3.323l134.84-132.971c8.659-8.538 9.476-21.838 1.792-29.63-7.685-7.793-20.994-7.252-29.698 1.331L208.166 756.07a28.8 28.8 0 0 1 4.094 3.424z"
          />
        </g>
        <path
          className="cloud"
          fill="#e1e8ed"
          d="M894.302 242.92c-5.288 0-10.303.855-15.16 2.053 2.446-5.296 3.838-11.074 3.838-17.155a50.946 45.304 0 0 0-50.946-45.304 50.482 44.891 0 0 0-30.58 9.272 73.555 65.409 0 0 0-71.313-49.542 73.555 65.409 0 0 0-69.411 43.864 90.571 80.54 0 1 0-26.82 157.486h260.392c31.27 0 56.606-22.53 56.606-50.337 0-27.807-25.337-50.338-56.606-50.338z"
        />
        <path
          className="cloud"
          fill="#ccd6dd"
          d="M373.06 723.224a79.023 70.271 0 0 0-22.812 3c.056-1.007.17-1.983.17-3a67.906 60.385 0 0 0-133.423-15.836 67.634 60.143 0 0 0-25.077-4.3 67.928 60.405 0 1 0 0 120.811 67.906 60.385 0 0 0 65.494-44.579 67.645 60.153 0 0 0 25.077 4.309c4.246 0 8.378-.393 12.408-1.047-.656 3.624-1.086 7.319-1.086 11.114 0 38.911 35.492 70.473 79.25 70.473 43.756 0 79.249-31.562 79.249-70.473a79.25 70.473 0 0 0-79.25-70.472z"
        />
        <path
          className="cloud"
          fill="#e1e8ed"
          d="M418.346 864.17c-5.287 0-10.303.855-15.16 2.053 2.446-5.296 3.838-11.074 3.838-17.155a50.946 45.304 0 0 0-50.946-45.304 50.482 44.891 0 0 0-30.579 9.272 73.555 65.409 0 0 0-71.313-49.542 73.555 65.409 0 0 0-69.412 43.864 90.571 80.54 0 1 0-26.82 157.486h260.392c31.27 0 56.607-22.53 56.607-50.337 0-27.807-25.338-50.338-56.607-50.338zM363.655 239.073c-5.287 0-10.302.856-15.159 2.054 2.445-5.295 3.838-11.074 3.838-17.155a50.946 45.304 0 0 0-50.946-45.304 50.482 44.891 0 0 0-30.58 9.272 73.555 65.409 0 0 0-71.313-49.542 73.555 65.409 0 0 0-69.411 43.864 90.571 80.54 0 1 0-26.82 157.487h260.391c31.27 0 56.607-22.532 56.607-50.338 0-27.807-25.337-50.338-56.607-50.338z"
        />
      </svg>
    </div>
  )
}

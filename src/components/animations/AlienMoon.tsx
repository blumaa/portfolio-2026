import { useEffect, useRef } from 'react'
import { gsap, Back, Elastic } from 'gsap'

function random(min: number, max?: number): () => number {
  if (max == null) {
    max = min
    min = 0
  }
  return function () {
    return Math.random() * (max! - min) + min
  }
}

export function AlienMoon() {
  const ufo = useRef<SVGGElement>(null)
  const moon = useRef<SVGGElement>(null)
  const topmoon = useRef<SVGGElement>(null)

  useEffect(() => {
    const master = gsap.timeline({
      reversed: false,
      repeat: -1,
    })

    const ufoFlight = () => {
      const tl = gsap.timeline({
        reversed: false,
        repeat: -1,
      })
      for (let i = 0; i < 100; i++) {
        tl.to(ufo.current, {
          duration: 2,
          x: random(-100, 800)(),
          y: random(-150, 150)(),
          ease: Back.easeIn,
        })
      }
      return tl
    }

    const moonRotate = () => {
      const tl = gsap.timeline({
        repeat: 0,
        reversed: false,
        onComplete: function () {
          this.restart()
        },
      })

      tl.to([topmoon.current, moon.current], {
        duration: 50,
        rotation: 360,
        scale: 0.45,
        repeat: -1,
        yoyo: true,
        transformOrigin: '50% 50%',
        ease: Elastic.easeInOut,
      })
      return tl
    }

    master.add(ufoFlight(), 'ufomove').add(moonRotate())

    return () => {
      master.kill()
    }
  }, [])

  return (
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', height: '100%' }}>
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="100 850 1125 436"
      >
        <title>space_scene</title>

        <g id="moon" ref={moon}>
          <path
            id="circlebackground"
            d="M781.41,1048.21c0,64.89-49.19,117.5-109.86,117.5s-109.86-52.61-109.86-117.5,49.19-117.5,109.86-117.5C732.12,931,781.16,983.43,781.41,1048.21Z"
            transform="translate(0)"
            fill="#565656"
          />
          <path
            id="shine2"
            d="M575.09,1031a3.71,3.71,0,0,1-.67-.07,3.58,3.58,0,0,1-2.62-4.21h0a113.16,113.16,0,0,1,18.27-43.6,3.21,3.21,0,0,1,4.68-.71,3.73,3.73,0,0,1,.67,5,105.4,105.4,0,0,0-17.06,40.73,3.42,3.42,0,0,1-3.27,2.87Z"
            transform="translate(0)"
            fill="#cdcdcd"
          />
          <path
            id="shine1"
            d="M607.09,972.34a3.47,3.47,0,0,1-3.34-3.58,3.7,3.7,0,0,1,1.15-2.7,102.88,102.88,0,0,1,10.69-8.68,3.2,3.2,0,0,1,4.61,1.08,3.73,3.73,0,0,1-.93,4.89,97.77,97.77,0,0,0-10,8.11A3.17,3.17,0,0,1,607.09,972.34Z"
            transform="translate(0)"
            fill="#cdcdcd"
          />
          <ellipse id="hole6" cx="641.93" cy="1018.11" rx="16.9" ry="18.08" fill="#cdcdcd" />
          <path
            id="hole5"
            d="M779.31,1071.18a122.5,122.5,0,0,1-11.14,33c-9.29-1-16-9.89-15.1-19.83s9.25-17.16,18.54-16.14A16.2,16.2,0,0,1,779.31,1071.18Z"
            transform="translate(0)"
            fill="#cdcdcd"
          />
          <ellipse id="hole4" cx="650.54" cy="1094.13" rx="16.9" ry="18.08" fill="#cdcdcd" />
          <ellipse id="hole3" cx="704.39" cy="1106.39" rx="11.46" ry="12.26" fill="#cdcdcd" />
          <ellipse id="hole2" cx="717.77" cy="1024.29" rx="11.46" ry="12.26" fill="#cdcdcd" />
          <ellipse id="hole1" cx="708.19" cy="994.83" rx="5.73" ry="6.13" fill="#cdcdcd" />
        </g>
        <g id="topmoon" ref={topmoon}>
          <path
            id="circlebackground-2"
            data-name="circlebackground"
            d="M781.41,1048.21c0,64.89-49.19,117.5-109.86,117.5s-109.86-52.61-109.86-117.5,49.19-117.5,109.86-117.5C732.12,931,781.16,983.43,781.41,1048.21Z"
            transform="translate(0)"
            fill="#565656"
          />
          <path
            id="shine2-2"
            data-name="shine2"
            d="M575.09,1031a3.71,3.71,0,0,1-.67-.07,3.58,3.58,0,0,1-2.62-4.21h0a113.16,113.16,0,0,1,18.27-43.6,3.21,3.21,0,0,1,4.68-.71,3.73,3.73,0,0,1,.67,5,105.4,105.4,0,0,0-17.06,40.73,3.42,3.42,0,0,1-3.27,2.87Z"
            transform="translate(0)"
            fill="#cdcdcd"
          />
          <path
            id="shine1-2"
            data-name="shine1"
            d="M607.09,972.34a3.47,3.47,0,0,1-3.34-3.58,3.7,3.7,0,0,1,1.15-2.7,102.88,102.88,0,0,1,10.69-8.68,3.2,3.2,0,0,1,4.61,1.08,3.73,3.73,0,0,1-.93,4.89,97.77,97.77,0,0,0-10,8.11A3.17,3.17,0,0,1,607.09,972.34Z"
            transform="translate(0)"
            fill="#cdcdcd"
          />
          <ellipse
            id="hole6-2"
            data-name="hole6"
            cx="641.93"
            cy="1018.11"
            rx="16.9"
            ry="18.08"
            fill="#cdcdcd"
          />
          <path
            id="hole5-2"
            data-name="hole5"
            d="M779.31,1071.18a122.5,122.5,0,0,1-11.14,33c-9.29-1-16-9.89-15.1-19.83s9.25-17.16,18.54-16.14A16.2,16.2,0,0,1,779.31,1071.18Z"
            transform="translate(0)"
            fill="#cdcdcd"
          />
          <ellipse
            id="hole4-2"
            data-name="hole4"
            cx="650.54"
            cy="1094.13"
            rx="16.9"
            ry="18.08"
            fill="#cdcdcd"
          />
          <ellipse
            id="hole3-2"
            data-name="hole3"
            cx="704.39"
            cy="1106.39"
            rx="11.46"
            ry="12.26"
            fill="#cdcdcd"
          />
          <ellipse
            id="hole2-2"
            data-name="hole2"
            cx="717.77"
            cy="1024.29"
            rx="11.46"
            ry="12.26"
            fill="#cdcdcd"
          />
          <ellipse
            id="hole1-2"
            data-name="hole1"
            cx="708.19"
            cy="994.83"
            rx="5.73"
            ry="6.13"
            fill="#cdcdcd"
          />
        </g>
        <g id="ufo" ref={ufo}>
          <path
            id="wheels"
            d="M386.22,1076c-5.05,0-9.18,4.42-9.18,9.82s4.13,9.81,9.18,9.81,9.18-4.41,9.18-9.81S391.27,1076,386.22,1076Zm24.48-6.55c-5.05,0-9.18,4.42-9.18,9.82s4.13,9.82,9.18,9.82,9.18-4.42,9.18-9.82S415.75,1069.48,410.7,1069.48Zm-49,0c-5.05,0-9.18,4.42-9.18,9.82s4.13,9.82,9.18,9.82,9.18-4.42,9.18-9.82S366.79,1069.48,361.74,1069.48Z"
            transform="translate(0)"
            fill="#324d5b"
          />
          <path
            id="base"
            d="M358.07,1044.45c15.53-10.23,40.7-10.23,56.23,0s15.53,26.83,0,37-40.7,10.22-56.23,0S342.54,1054.67,358.07,1044.45Z"
            transform="translate(0)"
            fill="#dfd8c8"
          />
          <path
            id="baseshadow"
            d="M361.9,1079c-15-9.9-15.53-25.69-1.53-35.91-.77.4-1.53.9-2.3,1.39-15.53,10.22-15.53,26.83,0,37s40.7,10.22,56.23,0c.53-.33,1.07-.74,1.53-1.07C400.22,1089.2,376.66,1088.71,361.9,1079Z"
            transform="translate(0)"
            fill="#a39274"
          />
          <path
            id="saucer"
            d="M351.57,1026.2c19.12-12.11,50.1-12.11,69.23,0s19.12,31.83,0,43.94-50.11,12.11-69.23,0S332.44,1038.39,351.57,1026.2Z"
            transform="translate(0)"
            fill="#324d5b"
          />
          <path
            id="saucershadow"
            d="M423.94,1067c-19.13,12.1-50.11,12.1-69.24,0-15.45-9.82-18.43-24.47-9-36.17-12.93,12.11-10.94,28.72,5.89,39.44,19.12,12.11,50.1,12.11,69.23,0a38.91,38.91,0,0,0,8.95-7.77A47.39,47.39,0,0,1,423.94,1067Z"
            transform="translate(0)"
            fill="#2d4552"
          />
          <path
            id="bubble"
            d="M386.22,1000.76c16.91,0,30.6,14.64,30.6,32.72s-13.69,26.18-30.6,26.18-30.6-8.1-30.6-26.18S369.32,1000.76,386.22,1000.76Z"
            transform="translate(0)"
            fill="#e4e7e7"
          />
          <path
            id="leftbubble"
            d="M355.62,1033.48c0,18,13.62,26.1,30.37,26.18h.23v-58.9C369.32,1000.76,355.62,1015.4,355.62,1033.48Z"
            transform="translate(0)"
            fill="#d8dbdb"
          />
          <path
            id="head"
            d="M386.22,1059.66c6.89,0,13.24-1.31,18.36-4.17v-22c0-10.88-8.18-19.63-18.36-19.63s-18.36,8.75-18.36,19.63v22C373,1058.35,379.34,1059.66,386.22,1059.66Z"
            transform="translate(0)"
            fill="#3db39e"
          />
          <path
            id="lefthead"
            d="M367.86,1033.48v22a38,38,0,0,0,18.21,4.17h.15v-45.81C376.05,1013.85,367.86,1022.68,367.86,1033.48Z"
            transform="translate(0)"
            fill="#3aaa96"
          />
          <path
            id="eyebackground"
            d="M386.22,1026.94c5,0,9.18,4.42,9.18,9.82s-4.13,9.81-9.18,9.81-9.18-4.41-9.18-9.81S381.17,1026.94,386.22,1026.94Z"
            transform="translate(0)"
            fill="#fff"
          />
          <path
            id="leftshadow"
            d="M386.22,1026.94c-5.05,0-9.18,4.42-9.18,9.82s4.13,9.81,9.18,9.81Z"
            transform="translate(0)"
            fill="#f2f2f2"
          />
          <path
            id="eye"
            d="M386.22,1031.85a4.92,4.92,0,1,1-4.59,4.91A4.77,4.77,0,0,1,386.22,1031.85Z"
            transform="translate(0)"
            fill="#324d5b"
          />
          <path
            id="lefteye"
            d="M386.22,1031.85a4.92,4.92,0,0,0,0,9.81Z"
            transform="translate(0)"
            fill="#2f4956"
          />
        </g>
      </svg>
    </div>
  )
}

import { ScreenshotCarousel } from './ScreenshotCarousel'

const SCREENSHOTS = [
  { src: '/xclues-films-light.png', name: 'Films Light' },
  { src: '/xclues-music-light.png', name: 'Music Light' },
  { src: '/xclues-films-dark.png', name: 'Films Dark' },
  { src: '/xclues-lit-light.png', name: 'Lit Light' },
]

function XCluesPreview() {
  return <ScreenshotCarousel screenshots={SCREENSHOTS} alt="xClues" />
}

export { XCluesPreview }

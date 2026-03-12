import { ScreenshotCarousel } from './ScreenshotCarousel'

const SCREENSHOTS = [
  { src: '/xclues-films-dark.png', name: 'filmclues.space' },
  { src: '/xclues-films-light.png', name: 'filmclues.space' },
  { src: '/xclues-music-light.png', name: 'musiclues.space' },
  { src: '/xclues-lit-light.png', name: 'litclues.space' },
]

function XCluesPreview() {
  return <ScreenshotCarousel screenshots={SCREENSHOTS} alt="xClues" />
}

export { XCluesPreview }

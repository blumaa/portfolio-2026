import { ScreenshotCarousel } from './ScreenshotCarousel'

const SCREENSHOTS = [
  { src: '/bird-poo-start-screen.png', name: 'Start Screen' },
  { src: '/bird-poo-gameplay.png', name: 'Gameplay' },
  { src: '/bird-poo-gameover.png', name: 'Game Over' },
]

function BirdPooPreview() {
  return <ScreenshotCarousel screenshots={SCREENSHOTS} alt="Bird Poo" />
}

export { BirdPooPreview }

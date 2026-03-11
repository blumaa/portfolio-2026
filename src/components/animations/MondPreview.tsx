import { ScreenshotCarousel } from './ScreenshotCarousel'

const SCREENSHOTS = [
  { src: '/mond-button-variants.png', name: 'Button Variants' },
  { src: '/mond-input-states.png', name: 'Input States' },
  { src: '/mond-colors.png', name: 'Brand Colors' },
  { src: '/mond-button-docs.png', name: 'Button Docs' },
]

function MondPreview() {
  return <ScreenshotCarousel screenshots={SCREENSHOTS} alt="Mond Design System" orientation="landscape" />
}

export { MondPreview }

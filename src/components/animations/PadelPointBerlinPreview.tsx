import { ScreenshotCarousel } from './ScreenshotCarousel'

const SCREENSHOTS = [
  { src: '/padel-point-berlin-4.png', name: 'Dark Mode' },
  { src: '/padel-point-berlin-3.png', name: 'Filters' },
  { src: '/padel-point-berlin-2.png', name: 'Add Match' },
  { src: '/padel-point-berlin-1.png', name: 'Light Mode' },
]

function PadelPointBerlinPreview() {
  return <ScreenshotCarousel screenshots={SCREENSHOTS} alt="Padel Point Berlin" />
}

export { PadelPointBerlinPreview }

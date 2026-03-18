import type { ComponentType } from 'react'
import { Lighthouse } from './Lighthouse'
import { RustlingGrass } from './RustlingGrass'
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
import { Carousel } from './Carousel'

const ANIMATIONS: { component: ComponentType; name: string }[] = [
  { component: Lighthouse, name: 'Lighthouse' },
  { component: AnimatedEyeballWatching, name: 'Watching Eyes' },
  { component: PadelPointBerlin, name: 'Padel Point Berlin' },
  { component: RustlingGrass, name: 'Rustling Grass' },
  { component: AlienMoon, name: 'Alien Moon' },
  { component: AnimatedLamp, name: 'Animated Lamp' },
  { component: Bus, name: 'Bus' },
  { component: Bird, name: 'Bird' },
  { component: AnimatedEyeball, name: 'Animated Eyeball' },
  { component: AnimatedLoadingAirplane, name: 'Loading Airplane' },
  { component: AnimatedOctoDude, name: 'Octo Dude' },
  { component: NuclearPhysics, name: 'Nuclear Physics' },
  { component: NoirCarChase, name: 'Noir Car Chase' },
]

function AnimationGalleryPreview() {
  return (
    <Carousel
      items={ANIMATIONS}
      renderItem={(item) => {
        const Component = item.component
        return <Component />
      }}
    />
  )
}

export { AnimationGalleryPreview }

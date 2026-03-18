import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Carousel } from './Carousel'

describe('Carousel', () => {
  const items = [
    { name: 'Slide 1' },
    { name: 'Slide 2' },
  ]

  it('container has role="group" and aria-roledescription="carousel"', () => {
    const { container } = render(
      <Carousel items={items} renderItem={(item) => <div>{item.name}</div>} />,
    )

    const carousel = container.querySelector('[role="group"][aria-roledescription="carousel"]')
    expect(carousel).toBeInTheDocument()
  })

  it('slide has role="group" and aria-roledescription="slide"', () => {
    const { container } = render(
      <Carousel items={items} renderItem={(item) => <div>{item.name}</div>} />,
    )

    const slide = container.querySelector('[role="group"][aria-roledescription="slide"]')
    expect(slide).toBeInTheDocument()
  })
})

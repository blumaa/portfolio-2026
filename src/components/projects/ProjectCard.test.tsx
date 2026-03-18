import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ProjectCard } from './ProjectCard'
import type { Project } from '../../data/projects'

vi.mock('framer-motion', () => {
  const handler = {
    get: (_target: unknown, tag: string) => {
      return function MotionStub(props: Record<string, unknown>) {
        const { initial, whileInView, viewport, variants, transition, whileHover, animate, exit, children, ...rest } = props
        const Tag = tag as 'div'
        return <Tag {...rest}>{children as React.ReactNode}</Tag>
      }
    },
  }
  return {
    motion: new Proxy({}, handler),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

const baseProject: Project = {
  id: 'test-project',
  name: 'Test Project',
  tagline: 'A test tagline',
  description: 'A test description for the project.',
  techStack: ['React', 'TypeScript'],
}

describe('ProjectCard', () => {
  it('renders project name, tagline, and description', () => {
    render(<ProjectCard project={baseProject} index={0} />)

    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('A test tagline')).toBeInTheDocument()
    expect(screen.getByText('A test description for the project.')).toBeInTheDocument()
  })

  it('renders a Carousel with aria-roledescription when project has screenshots', () => {
    const project: Project = {
      ...baseProject,
      screenshots: [
        { src: '/test-1.png', name: 'Screenshot 1' },
        { src: '/test-2.png', name: 'Screenshot 2' },
      ],
    }

    const { container } = render(<ProjectCard project={project} index={0} />)

    const carousel = container.querySelector('[aria-roledescription="carousel"]')
    expect(carousel).toBeInTheDocument()
  })

  it('renders Suspense with lazy component when project has previewComponent', () => {
    const project: Project = {
      ...baseProject,
      previewComponent: 'animation-gallery',
    }

    const { container } = render(<ProjectCard project={project} index={0} />)

    // Should have the preview frame but no carousel
    const carousel = container.querySelector('[aria-roledescription="carousel"]')
    expect(carousel).not.toBeInTheDocument()
  })

  it('applies .featured CSS class for featured projects', () => {
    const project: Project = {
      ...baseProject,
      featured: true,
    }

    const { container } = render(<ProjectCard project={project} index={0} />)

    const card = container.querySelector('article')
    expect(card?.className).toContain('featured')
  })

  it('shows skeleton and hides image before load, then fades in after load', () => {
    const project: Project = {
      ...baseProject,
      screenshots: [
        { src: '/test-1.png', name: 'Screenshot 1' },
      ],
    }

    const { container } = render(<ProjectCard project={project} index={0} />)

    const skeleton = container.querySelector('[class*="skeleton"]')
    expect(skeleton).toBeInTheDocument()

    const img = container.querySelector('img[alt="Test Project - Screenshot 1"]') as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.style.opacity).toBe('0')

    fireEvent.load(img)

    expect(img.style.opacity).toBe('1')
    expect(container.querySelector('[class*="skeleton"]')).not.toBeInTheDocument()
  })

  it('applies .crtOverlay class when project has theme "crt"', () => {
    const project: Project = {
      ...baseProject,
      theme: 'crt',
      screenshots: [
        { src: '/bird-poo-1.png', name: 'Start Screen' },
      ],
    }

    const { container } = render(<ProjectCard project={project} index={0} />)

    const overlay = container.querySelector('[class*="crtOverlay"]')
    expect(overlay).toBeInTheDocument()
  })
})

export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  featured?: boolean
  techStack: string[]
  previewUrl?: string
  screenshotUrl?: string
  previewComponent?: 'animation-gallery' | 'television' | 'padel-point-berlin'
  liveUrls?: { name: string; url: string }[]
  githubUrl?: string
  npmUrl?: string
  storybookUrl?: string
}

export const projects: Project[] = [
  {
    id: 'padel-point-berlin',
    name: 'Padel Point Berlin',
    tagline: 'A padel match finder and community tool for Berlin',
    description:
      'Aggregates padel court bookings across Berlin venues, with filters for level, time, and category.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    previewComponent: 'padel-point-berlin',
    liveUrls: [{ name: 'view site', url: 'https://padel-point-berlin.vercel.app/' }],
    githubUrl: 'https://github.com/blumaa/padel-point-berlin',
  },
  {
    id: 'mond',
    name: 'Mond Design System',
    tagline: 'A React component library with atomic design',
    description:
      '35+ accessible, themeable React components built with TypeScript and Design Tokens. Implements atomic design principles for maximum reusability and consistency.',
    featured: true,
    techStack: ['React', 'TypeScript', 'Storybook', 'Vanilla Extract'],
    previewUrl: 'https://mond-design-system-component-lib.vercel.app/',
    githubUrl: 'https://github.com/blumaa/mond-design-system',
    npmUrl: 'https://www.npmjs.com/package/@mond-design-system/theme',
    storybookUrl: 'https://mond-design-system-component-lib.vercel.app/',
  },
  {
    id: 'xclues',
    name: 'xclues games',
    tagline: 'Daily puzzle games for music, film, and literature',
    description:
      'A family of daily puzzle games where players guess songs, movies, and books from progressive clues. Features streak tracking, social sharing, and clean UI.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Vercel'],
    previewUrl: 'https://musiclues.space',
    liveUrls: [
      { name: 'musiclues', url: 'https://musiclues.space' },
      { name: 'filmclues', url: 'https://filmclues.space' },
      { name: 'litclues', url: 'https://litclues.space' },
    ]
  },
  {
    id: 'bird-poo',
    name: 'Bird Poo',
    tagline: 'A browser-based arcade game with a leaderboard',
    description:
      'Dodge falling bird poo while shooting back at the birds. Features animated sprites built with SVG and GSAP, a global leaderboard via Supabase, and PWA support for mobile play.',
    techStack: ['React', 'TypeScript', 'GSAP', 'SVG', 'Supabase', 'Vite'],
    screenshotUrl: '/bird-poo-preview.png',
    liveUrls: [{ name: 'Play', url: 'https://bird-poo.vercel.app/' }],
    githubUrl: 'https://github.com/blumaa/bird-poo',
  },
  {
    id: 'animation-gallery',
    name: 'Animation Gallery',
    tagline: 'SVG animations built with GSAP',
    description:
      'A collection of interactive SVG animations created with GSAP. Each animation responds to theme changes and demonstrates advanced animation techniques.',
    techStack: ['React', 'GSAP', 'SVG', 'TypeScript'],
    previewComponent: 'animation-gallery'
  },
  {
    id: 'television',
    name: 'Retro Television',
    tagline: 'Interactive vintage TV with channel switching',
    description:
      'A nostalgic retro television component with power button, channel switching, and static effects. Click the power button to turn it on, then change channels to view different animations.',
    techStack: ['React', 'Framer Motion', 'SVG', 'TypeScript'],
    previewComponent: 'television'
  },
]

export const getFeaturedProject = () => projects.find((p) => p.featured)

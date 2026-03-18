export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  featured?: boolean
  techStack: string[]
  previewUrl?: string
  screenshotUrl?: string
  screenshots?: { src: string; name: string }[]
  theme?: 'crt'
  previewComponent?: 'animation-gallery' | 'television'
  orientation?: 'portrait' | 'landscape' | 'component'
  liveUrls?: { name: string; url: string }[]
  githubUrl?: string
  npmUrl?: string
  storybookUrl?: string
  appStoreUrl?: string
}

export const projects: Project[] = [
  {
    id: 'padel-point-berlin',
    name: 'Padel Point Berlin',
    tagline: 'Padel match aggregator with dual data ingestion',
    description:
      'A PWA and web app that aggregates open padel matches across Berlin. Features D3/Recharts analytics dashboards and cron-based polling with GitHub Actions.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'D3', 'Recharts', 'PWA', 'GitHub Actions'],
    screenshots: [
      { src: '/padel-point-berlin-4.png', name: 'Dark Mode' },
      { src: '/padel-point-berlin-1.png', name: 'Light Mode' },
      { src: '/padel-point-berlin-3.png', name: 'Filters' },
      { src: '/padel-point-berlin-2.png', name: 'Add Match' },
    ],
    liveUrls: [{ name: 'view site', url: 'https://padel-point-berlin.vercel.app/' }],
    githubUrl: 'https://github.com/blumaa/padel-point-berlin',
  },
  {
    id: 'berlin-demo-finder',
    name: 'Berlin Demo Finder',
    tagline: 'Map-based demo and protest finder for Berlin',
    description:
      'A web app that aggregates registered demonstrations, protests, and rallies across Berlin on an interactive map. Features category filtering, date-based search, event detail popups, and multilingual support.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Google Maps API', 'Tailwind CSS'],
    screenshots: [
      { src: '/berlin-demo-finder-desktop.png', name: 'Map Overview' },
      { src: '/berlin-demo-finder-desktop-event.png', name: 'Event Detail' },
      { src: '/berlin-demo-finder-today.png', name: 'Today Filter' },
    ],
    liveUrls: [{ name: 'view site', url: 'https://berlin-demo-finder.vercel.app/' }],
    githubUrl: 'https://github.com/blumaa/berlin-demo-finder',
  },
  {
    id: 'mond',
    name: 'Mond Design System',
    tagline: 'A React component library with atomic design',
    description:
      'A monorepo housing 35+ accessible, themeable React components built with TypeScript and Design Tokens. Implements atomic design principles for maximum reusability and consistency.',
    techStack: ['React', 'TypeScript', 'Next.js', 'Storybook', 'Turbopack', 'Design Tokens'],
    screenshots: [
      { src: '/mond-button-variants.png', name: 'Button Variants' },
      { src: '/mond-input-states.png', name: 'Input States' },
      { src: '/mond-colors.png', name: 'Brand Colors' },
      { src: '/mond-button-docs.png', name: 'Button Docs' },
    ],
    githubUrl: 'https://github.com/blumaa/mond-design-system',
    npmUrl: 'https://www.npmjs.com/package/@mond-design-system/theme',
    storybookUrl: 'https://mond-design-system-component-lib.vercel.app/',
  },
  {
    id: 'xclues',
    name: 'xClues games',
    tagline: 'Daily puzzle platform with iOS deployment',
    description:
      'A connections-style puzzle game engine powering three domains (music, film, literature) from a single codebase. Features Zustand state management, TanStack Query caching, build-time SEO generation per domain, and the Mond Design System. Deployed as a PWA and native iOS app via Capacitor.',
    featured: true,
    techStack: ['React', 'TypeScript', 'Zustand', 'TanStack Query', 'Supabase', 'Capacitor', 'Mond DS', 'Vite'],
    screenshots: [
      { src: '/xclues-films-dark.png', name: 'filmclues.space' },
      { src: '/xclues-films-light.png', name: 'filmclues.space' },
      { src: '/xclues-music-light.png', name: 'musiclues.space' },
      { src: '/xclues-lit-light.png', name: 'litclues.space' },
    ],
    appStoreUrl: '#',
    liveUrls: [
      { name: 'musiclues', url: 'https://musiclues.space' },
      { name: 'filmclues', url: 'https://filmclues.space' },
      { name: 'litclues', url: 'https://litclues.space' },
    ]
  },
  {
    id: 'bird-poo',
    name: 'Bird Poo',
    tagline: 'A cross-platform arcade game with SVG animation engine',
    description:
      'An arcade game built on a custom SVG rendering engine with GSAP-powered character animations, game state machine via useReducer, and a real-time leaderboard on Supabase. Deployed as a PWA and native iOS app via Capacitor.',
    techStack: ['React', 'TypeScript', 'GSAP', 'SVG', 'Supabase', 'Capacitor', 'PWA', 'Vite'],
    screenshots: [
      { src: '/bird-poo-start-screen.png', name: 'Start Screen' },
      { src: '/bird-poo-gameplay.png', name: 'Gameplay' },
      { src: '/bird-poo-gameover.png', name: 'Game Over' },
    ],
    theme: 'crt',
    appStoreUrl: 'https://apps.apple.com/app/id6760347219',
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
    previewComponent: 'animation-gallery',
    orientation: 'component',
  },
  {
    id: 'television',
    name: 'Retro Television',
    tagline: 'Interactive vintage TV with channel switching',
    description:
      'A nostalgic retro television component with power button, channel switching, and static effects. Click the power button to turn it on, then change channels to view different animations.',
    techStack: ['React', 'Framer Motion', 'SVG', 'TypeScript'],
    previewComponent: 'television',
    orientation: 'component',
  },
]

export const getFeaturedProject = () => projects.find((p) => p.featured)

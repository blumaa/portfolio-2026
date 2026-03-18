import { lazy, Suspense, useState, type ComponentType, type LazyExoticComponent } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Spinner } from '../ui/Spinner'
import { ExternalLinkIcon, GitHubIcon, AppStoreIcon } from '../ui/icons'
import { Carousel } from '../animations/Carousel'
import type { Project } from '../../data/projects'
import styles from './ProjectCard.module.css'

export interface ProjectCardProps {
  project: Project
  index: number
}

const CUSTOM_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const PREVIEW_MAP: Record<
  NonNullable<Project['previewComponent']>,
  LazyExoticComponent<ComponentType>
> = {
  'animation-gallery': lazy(() =>
    import('../animations/AnimationGalleryPreview').then((m) => ({ default: m.AnimationGalleryPreview }))
  ),
  television: lazy(() =>
    import('../animations/TelevisionPreview').then((m) => ({ default: m.TelevisionPreview }))
  ),
}

function LoadingOverlay() {
  return <Spinner className={styles.loader} />
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: CUSTOM_EASE,
      staggerChildren: 0.15,
    },
  },
}

const curtainVariants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.6, ease: CUSTOM_EASE },
  },
}

function CarouselImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={styles.imageWrapper}>
      {!loaded && <div className={styles.skeleton} />}
      <img
        src={src}
        alt={alt}
        className={styles.previewImage}
        loading="lazy"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

function ProjectCard({ project, index: _index }: ProjectCardProps) {
  const {
    name, tagline, description, techStack,
    previewComponent, screenshots, theme,
    liveUrls, githubUrl, npmUrl,
    storybookUrl, appStoreUrl, featured,
  } = project
  const PreviewComponent = previewComponent ? PREVIEW_MAP[previewComponent] : null

  const renderPreviewContent = () => {
    if (screenshots && screenshots.length > 0) {
      return (
        <Carousel
          items={screenshots}
          renderItem={(item) => (
            <CarouselImage src={item.src} alt={`${name} - ${item.name}`} />
          )}
        />
      )
    }

    if (PreviewComponent) {
      return (
        <Suspense fallback={<LoadingOverlay />}>
          <PreviewComponent />
        </Suspense>
      )
    }

    return null
  }

  const previewContent = renderPreviewContent()

  return (
    <motion.article
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {previewContent && (
        <motion.div
          className={`${styles.previewFrame} ${theme === 'crt' ? styles.crtOverlay : ''}`}
          variants={curtainVariants}
        >
          {previewContent}
        </motion.div>
      )}

      <div className={styles.content}>
        <div className={styles.header}>
          {featured && <span className={styles.featuredBadge}>Featured</span>}
        </div>

        <h3 className={styles.title}>{name}</h3>
        <p className={styles.tagline}>{tagline}</p>
        <p className={styles.description}>{description}</p>

        <div className={styles.techStack}>
          {techStack.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>

        <div className={styles.links}>
          {previewComponent === 'television' && (
            <Button href="/tv" target="_blank" variant="primary" size="sm">
              <ExternalLinkIcon className={styles.buttonIcon} />
              Open TV
            </Button>
          )}
          {liveUrls && liveUrls.map((link) => (
            <Button key={link.name} href={link.url} variant="primary" size="sm">
              <ExternalLinkIcon className={styles.buttonIcon} />
              {link.name}
            </Button>
          ))}
          {storybookUrl && (
            <Button href={storybookUrl} variant="secondary" size="sm">
              <ExternalLinkIcon className={styles.buttonIcon} />
              Storybook
            </Button>
          )}
          {githubUrl && (
            <Button href={githubUrl} variant="secondary" size="sm">
              <GitHubIcon className={styles.buttonIcon} />
              GitHub
            </Button>
          )}
          {npmUrl && (
            <Button href={npmUrl} variant="secondary" size="sm">
              <ExternalLinkIcon className={styles.buttonIcon} />
              npm
            </Button>
          )}
          {appStoreUrl && (
            <Button href={appStoreUrl} variant="secondary" size="sm">
              <AppStoreIcon className={styles.buttonIcon} />
              App Store
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export { ProjectCard }

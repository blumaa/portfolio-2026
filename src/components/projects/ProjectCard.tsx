import { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { AnimationGalleryPreview, TelevisionPreview, PadelPointBerlinPreview, BirdPooPreview, XCluesPreview, MondPreview } from '../animations'
import type { Project } from '../../data/projects'
import styles from './ProjectCard.module.css'

export interface ProjectCardProps {
  project: Project
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const { name, tagline, description, techStack, previewUrl, screenshotUrl, previewComponent, liveUrls, githubUrl, npmUrl, storybookUrl, appStoreUrl, featured } =
    project
  const [isLoaded, setIsLoaded] = useState(false)

  const renderPreview = () => {
    if (previewComponent === 'animation-gallery') {
      return <AnimationGalleryPreview />
    }
    if (previewComponent === 'television') {
      return <TelevisionPreview />
    }
    if (previewComponent === 'padel-point-berlin') {
      return <PadelPointBerlinPreview />
    }
    if (previewComponent === 'bird-poo') {
      return <BirdPooPreview />
    }
    if (previewComponent === 'xclues') {
      return <XCluesPreview />
    }
    if (previewComponent === 'mond') {
      return <MondPreview />
    }
    return null
  }

  return (
    <motion.article
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Custom Component Preview */}
      {previewComponent && (
        <div className={styles.browserFrame}>
          <div className={styles.browserHeader}>
            <div className={styles.browserDots}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
            <div className={styles.browserUrl}>
              <span>{name}</span>
            </div>
          </div>
          <div className={styles.browserContent}>{renderPreview()}</div>
        </div>
      )}

      {/* Screenshot Preview */}
      {screenshotUrl && !previewComponent && (
        <div className={styles.browserFrame}>
          <div className={styles.browserHeader}>
            <div className={styles.browserDots}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
            <div className={styles.browserUrl}>
              <span>{liveUrls?.[0]?.url.replace('https://', '') ?? name}</span>
            </div>
          </div>
          <div className={styles.browserContent}>
            <img src={screenshotUrl} alt={`${name} preview`} className={styles.screenshot} />
          </div>
        </div>
      )}

      {/* Browser Preview with iframe */}
      {previewUrl && !previewComponent && (
        <div className={styles.browserFrame}>
          <div className={styles.browserHeader}>
            <div className={styles.browserDots}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
            <div className={styles.browserUrl}>
              <span>{previewUrl.replace('https://', '')}</span>
            </div>
          </div>
          <div className={styles.browserContent}>
            {!isLoaded && (
              <div className={styles.loader}>
                <div className={styles.spinner} />
              </div>
            )}
            <iframe
              src={previewUrl}
              title={`${name} preview`}
              className={styles.iframe}
              onLoad={() => setIsLoaded(true)}
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Content */}
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.buttonIcon}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Open TV
            </Button>
          )}
          {liveUrls && liveUrls.map((link) => (
            <Button key={link.name} href={link.url} variant="primary" size="sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.buttonIcon}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              {link.name}
            </Button>
          ))}
          {storybookUrl && (
            <Button href={storybookUrl} variant="secondary" size="sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.buttonIcon}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Storybook
            </Button>
          )}
          {githubUrl && (
            <Button href={githubUrl} variant="secondary" size="sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={styles.buttonIcon}>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </Button>
          )}
          {npmUrl && (
            <Button href={npmUrl} variant="secondary" size="sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.buttonIcon}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              npm
            </Button>
          )}
          {appStoreUrl && (
            <Button href={appStoreUrl} variant="secondary" size="sm">
              <svg width="16" height="16" viewBox="0 0 384 512" fill="currentColor" className={styles.buttonIcon}>
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-62.1 24-72.5-24 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              App Store
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export { ProjectCard }

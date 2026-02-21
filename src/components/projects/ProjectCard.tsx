import { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { AnimationGalleryPreview, TelevisionPreview } from '../animations'
import type { Project } from '../../data/projects'
import styles from './ProjectCard.module.css'

export interface ProjectCardProps {
  project: Project
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const { name, tagline, description, techStack, previewUrl, previewComponent, liveUrls, githubUrl, npmUrl, storybookUrl, featured } =
    project
  const [isLoaded, setIsLoaded] = useState(false)

  const renderPreview = () => {
    if (previewComponent === 'animation-gallery') {
      return <AnimationGalleryPreview />
    }
    if (previewComponent === 'television') {
      return <TelevisionPreview />
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
          {liveUrls && liveUrls.map((link) => (
            <Button key={link.name} href={link.url} variant="primary" size="sm">
              {link.name}
            </Button>
          ))}
          {storybookUrl && (
            <Button href={storybookUrl} variant="secondary" size="sm">
              Storybook
            </Button>
          )}
          {githubUrl && (
            <Button href={githubUrl} variant="secondary" size="sm">
              GitHub
            </Button>
          )}
          {npmUrl && (
            <Button href={npmUrl} variant="secondary" size="sm">
              npm
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export { ProjectCard }

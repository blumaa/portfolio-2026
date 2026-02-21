import { motion } from 'framer-motion'
import { Badge } from '../ui/Badge'
import type { Experience } from '../../data/experience'
import styles from './ExperienceCard.module.css'

export interface ExperienceCardProps {
  experience: Experience
  index: number
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const { company, role, startDate, endDate, location, description, achievements, techStack, link } =
    experience

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={styles.timeline}>
        <div className={styles.dot} />
        <div className={styles.line} />
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.titleRow}>
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className={styles.company}>
                {company}
                <span className={styles.linkIcon} aria-hidden="true">
                  ↗
                </span>
              </a>
            ) : (
              <span className={styles.company}>{company}</span>
            )}
            <span className={styles.dates}>
              {startDate} – {endDate}
            </span>
          </div>
          <h3 className={styles.role}>{role}</h3>
          <p className={styles.location}>{location}</p>
        </header>

        <p className={styles.description}>{description}</p>

        {achievements.length > 0 && (
          <ul className={styles.achievements}>
            {achievements.map((achievement, i) => (
              <li key={i} className={styles.achievement}>
                {achievement}
              </li>
            ))}
          </ul>
        )}

        {techStack && techStack.length > 0 && (
          <div className={styles.techStack}>
            {techStack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}

export { ExperienceCard }

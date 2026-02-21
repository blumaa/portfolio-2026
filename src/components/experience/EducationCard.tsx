import { motion } from 'framer-motion'
import type { Experience } from '../../data/experience'
import styles from './EducationCard.module.css'

export interface EducationCardProps {
  education: Experience
  index: number
}

function EducationCard({ education, index }: EducationCardProps) {
  const { company, role, startDate, endDate, location, achievements } = education

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={styles.header}>
        <h4 className={styles.institution}>{company}</h4>
        <span className={styles.dates}>
          {startDate}
          {endDate !== startDate && ` – ${endDate}`}
        </span>
      </div>
      <p className={styles.degree}>{role}</p>
      <p className={styles.location}>{location}</p>
      {achievements.length > 0 && (
        <ul className={styles.highlights}>
          {achievements.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </motion.article>
  )
}

export { EducationCard }

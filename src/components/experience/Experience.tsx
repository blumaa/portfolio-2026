import { motion } from 'framer-motion'
import { ExperienceCard } from './ExperienceCard'
import { EducationCard } from './EducationCard'
import { experiences, education } from '../../data/experience'
import styles from './Experience.module.css'

function Experience() {
  return (
    <section className={styles.experience} id="experience">
      <div className="container">
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h2>

        <div className={styles.grid}>
          <div className={styles.workSection}>
            <h3 className={styles.sectionTitle}>Work</h3>
            <div className={styles.timeline}>
              {experiences.map((exp, index) => (
                <ExperienceCard key={exp.id} experience={exp} index={index} />
              ))}
            </div>
          </div>

          <div className={styles.educationSection}>
            <h3 className={styles.sectionTitle}>Education</h3>
            <div className={styles.educationGrid}>
              {education.map((edu, index) => (
                <EducationCard key={edu.id} education={edu} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Experience }

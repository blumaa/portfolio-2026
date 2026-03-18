import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ProjectCard } from './ProjectCard'
import { projects } from '../../data/projects'
import { scrollReveal } from '../../lib/motion'
import styles from './Projects.module.css'

function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const orbOneY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const orbTwoY = useTransform(scrollYProgress, [0, 1], [-40, 80])

  // Sort to put featured project first
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })

  return (
    <section className={styles.projects} id="projects" ref={sectionRef}>
      {/* Ambient floating orbs */}
      <motion.div
        className={`${styles.orb} ${styles.orbOne}`}
        style={{ y: orbOneY }}
        aria-hidden="true"
      />
      <motion.div
        className={`${styles.orb} ${styles.orbTwo}`}
        style={{ y: orbTwoY }}
        aria-hidden="true"
      />

      <div className="container">
        <motion.h2
          className={styles.title}
          {...scrollReveal}
        >
          Projects
        </motion.h2>

        <div className={styles.grid}>
          {sortedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { Projects }

import { motion } from 'framer-motion'
import { SkillsGrid } from './SkillsGrid'
import { AIHighlight } from './AIHighlight'
import styles from './About.module.css'

function About() {
  return (
    <section className={styles.about} id="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>About Me</h2>

          <div className={styles.content}>
            <p className={styles.bio}>
              I'm a frontend developer based in Berlin who believes in{' '}
              <strong>building things that work for people</strong>. After years in education
              teaching English in the US and Spain, I discovered that the skills that made me a
              good teacher—patience, clarity, breaking complex ideas into understandable
              pieces—translate beautifully to writing code.
            </p>
            <p className={styles.bio}>
              Today, I specialize in <strong>design systems and component libraries</strong> that
              create consistency and speed across teams. I'm passionate about accessibility,
              animation, and developer experience.
            </p>
          </div>

          <SkillsGrid />

          <AIHighlight />
        </motion.div>
      </div>
    </section>
  )
}

export { About }

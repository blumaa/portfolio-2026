import { motion } from 'framer-motion'
import { Badge } from '../ui/Badge'
import { skillCategories, getSkillsByCategory, type SkillCategory } from '../../data/skills'
import styles from './SkillsGrid.module.css'

const categoryOrder: SkillCategory[] = [
  'frontend',
  'state',
  'testing',
  'design',
  'backend',
  'devtools',
  'ai',
  'projectMgmt',
  'principles',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
}

function SkillsGrid() {
  return (
    <motion.div
      className={styles.grid}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {categoryOrder.map((category) => (
        <motion.div key={category} className={styles.category} variants={itemVariants}>
          <h4 className={styles.categoryTitle}>{skillCategories[category]}</h4>
          <div className={styles.badges}>
            {getSkillsByCategory(category).map((skill) => (
              <Badge key={skill.name} variant="accent">
                {skill.name}
              </Badge>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export { SkillsGrid }

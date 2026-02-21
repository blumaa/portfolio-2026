import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import styles from './Badge.module.css'

export interface BadgeProps {
  variant?: 'default' | 'outline' | 'accent'
  children?: ReactNode
  className?: string
}

function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <motion.span
      className={`${styles.badge} ${styles[variant]} ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.span>
  )
}

export { Badge }

import { forwardRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  download?: boolean | string
  children?: ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  'aria-label'?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, target, download, children, className = '', onClick, type = 'button', disabled, 'aria-label': ariaLabel }, ref) => {
    const classes = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`.trim()

    if (href) {
      const resolvedTarget = target || (href.startsWith('http') ? '_blank' : undefined)
      return (
        <motion.a
          href={href}
          download={download}
          className={classes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          target={resolvedTarget}
          rel={resolvedTarget === '_blank' ? 'noopener noreferrer' : undefined}
          aria-label={ariaLabel}
        >
          {children}
        </motion.a>
      )
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        type={type}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }

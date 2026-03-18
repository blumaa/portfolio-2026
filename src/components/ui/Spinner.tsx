import styles from './Spinner.module.css'

interface SpinnerProps {
  className?: string
}

function Spinner({ className }: SpinnerProps) {
  return (
    <div className={`${styles.spinner} ${className ?? ''}`} role="status">
      <span className="sr-only">Loading</span>
    </div>
  )
}

export { Spinner }

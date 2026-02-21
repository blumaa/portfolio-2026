import styles from './Footer.module.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.left}>
            <p className={styles.copyright}>
              &copy; {currentYear} Aaron Blum. All rights reserved.
            </p>
          </div>

          <div className={styles.right}>
            <nav className={styles.footerNav}>
              <a href="#hero">Home</a>
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }

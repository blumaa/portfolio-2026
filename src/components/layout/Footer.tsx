import { NAV_LINKS } from '../../data/navigation'
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
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href}>{link.label}</a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }

import { motion } from 'framer-motion'
import { CalendlyEmbed } from './CalendlyEmbed'
import { Button } from '../ui/Button'
import { GitHubIcon } from '../ui/icons'
import { InteractiveGrid } from '../hero'
import { scrollReveal } from '../../lib/motion'
import styles from './Contact.module.css'

const socialLinks = [
  {
    name: 'Email',
    href: 'mailto:blumaa@gmail.com',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aaron-blum-0904/',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/blumaa',
    icon: <GitHubIcon width={24} height={24} />,
  },
]

function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <InteractiveGrid className={styles.grid} />
      <div className={`container ${styles.contentWrapper}`}>
        <motion.h2
          className={styles.title}
          {...scrollReveal}
        >
          Get in Touch
        </motion.h2>

        <div className={styles.content}>
          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className={styles.description}>
              I'm always interested in hearing about new opportunities, interesting projects, or
              just connecting with fellow developers. Feel free to book a time to chat or reach out
              directly.
            </p>

            <div className={styles.socialLinks}>
              {socialLinks.map((link) => (
                <Button key={link.name} href={link.href} variant="ghost" aria-label={link.name}>
                  {link.icon}
                  <span>{link.name}</span>
                </Button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.calendlyWrapper}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CalendlyEmbed />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { Contact }

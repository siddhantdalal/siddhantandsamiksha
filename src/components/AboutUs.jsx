import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './AboutUs.module.css';

export default function AboutUs() {
  const [open, setOpen] = useState(false);

  const { groom, bride } = content.aboutUs;

  return (
    <section className="section">
      <ScrollReveal>
        <h2 className="section-heading">{content.aboutUs.heading}</h2>
        <p className="section-subheading">{content.aboutUs.subheading}</p>
      </ScrollReveal>

      <ScrollReveal>
        <div className={styles.prompt}>
          <p className={styles.promptText}>
            Get to know the two souls whose worlds are about to become one.
          </p>
          <button
            className={`${styles.toggleBtn} ${open ? styles.toggleOpen : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Collapse about us' : 'Expand about us'}
          >
            <svg
              className={styles.chevron}
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </ScrollReveal>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.aboutWrapper}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className={styles.aboutInner}>
              <div className={styles.line} />

              <ScrollReveal delay={0.1}>
                <div className={styles.row}>
                  <div className={`${styles.card} ${styles.groomCard}`}>
                    <span className={styles.label}>The Groom</span>
                    <h3 className={styles.name}>{groom.name}</h3>
                    <p className={styles.hometown}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {groom.hometown}
                    </p>
                    <p className={styles.bio}>{groom.bio}</p>
                  </div>

                  <div className={styles.dotCenter}>
                    <div className={styles.dot} />
                  </div>

                  <div className={`${styles.card} ${styles.brideCard}`}>
                    <span className={styles.label}>The Bride</span>
                    <h3 className={styles.name}>{bride.name}</h3>
                    <p className={styles.hometown}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {bride.hometown}
                    </p>
                    <p className={styles.bio}>{bride.bio}</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className={styles.closingLine}>{content.aboutUs.closingLine}</p>
              </ScrollReveal>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

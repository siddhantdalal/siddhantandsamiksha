import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './Timeline.module.css';

export default function Timeline() {
  const [open, setOpen] = useState(false);

  return (
    <section className="section">
      <ScrollReveal>
        <h2 className="section-heading">{content.timeline.heading}</h2>
        <p className="section-subheading">{content.timeline.subheading}</p>
      </ScrollReveal>

      <ScrollReveal>
        <div className={styles.prompt}>
          <p className={styles.promptText}>
            Curious how our story unfolded? Every love story deserves to be told.
          </p>
          <button
            className={`${styles.toggleBtn} ${open ? styles.toggleOpen : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Collapse journey' : 'Expand journey'}
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
            className={styles.timeline}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className={styles.timelineInner}>
              <div className={styles.line} />
              {content.timeline.events.map((event, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className={`${styles.item} ${i % 2 === 0 ? styles.left : styles.right}`}>
                    <div className={styles.dot} />
                    <div className={styles.card}>
                      <h3 className={styles.title}>{event.title}</h3>
                      <p className={styles.desc}>{event.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

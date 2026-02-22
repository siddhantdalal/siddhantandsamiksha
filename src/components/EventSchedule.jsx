import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './EventSchedule.module.css';

export default function EventSchedule() {
  const [open, setOpen] = useState(false);

  return (
    <section className="section">
      <ScrollReveal>
        <h2 className="section-heading">{content.eventSchedule.heading}</h2>
        <p className="section-subheading">{content.eventSchedule.subheading}</p>
      </ScrollReveal>

      <ScrollReveal>
        <div className={styles.prompt}>
          <p className={styles.promptText}>
            Want a peek at how the big day unfolds? Every moment has been dreamt of.
          </p>
          <button
            className={`${styles.toggleBtn} ${open ? styles.toggleOpen : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Collapse schedule' : 'Expand schedule'}
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className={styles.scheduleInner}>
              <div className={styles.line} />
              {content.eventSchedule.schedule.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className={styles.item}>
                    <div className={styles.dot} />
                    <span className={styles.icon}>{item.icon}</span>
                    <div className={styles.info}>
                      <span className={styles.time}>{item.time}</span>
                      <span className={styles.event}>{item.event}</span>
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

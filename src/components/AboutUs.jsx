import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import { useSide } from '../context/SideContext';
import ScrollReveal from './ScrollReveal';
import styles from './AboutUs.module.css';

export default function AboutUs() {
  const [open, setOpen] = useState(false);
  const { side } = useSide();

  const { groom, bride } = content.aboutUs;
  const first = side === 'bride' ? bride : groom;
  const second = side === 'bride' ? groom : bride;
  const firstLabel = side === 'bride' ? 'The Bride' : 'The Groom';
  const secondLabel = side === 'bride' ? 'The Groom' : 'The Bride';

  return (
    <section id="about-us" className="section">
      <ScrollReveal>
        <h2 className="section-heading">{content.aboutUs.heading}</h2>
        <p className="section-subheading">{content.aboutUs.subheading}</p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className={styles.connectionMap}>
          <p className={styles.connectionText}>Two cities, one destiny — 800 km apart, yet hearts perfectly aligned.</p>
          <svg viewBox="0 0 320 90" className={styles.connectionSvg}>
            {/* Left pin */}
            <path d="M60 32c0-8 6.5-14.5 14.5-14.5S89 24 89 32c0 10-14.5 22-14.5 22S60 42 60 32z" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="74.5" cy="31" r="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
            {/* Curved dotted path */}
            <path d="M90 36 C130 68, 190 68, 230 36" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
            {/* Heart in the middle */}
            <g transform="translate(160, 46)">
              <path d="M0-6C0-10 5-12 7.5-8.5 10-12 15-10 15-6 15-1 7.5 6 7.5 6S0-1 0-6z" fill="currentColor" opacity="0.7" transform="translate(-7.5, -3) scale(0.8)" />
            </g>
            {/* Right pin */}
            <path d="M231 32c0-8 6.5-14.5 14.5-14.5S260 24 260 32c0 10-14.5 22-14.5 22S231 42 231 32z" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="245.5" cy="31" r="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
            {/* City labels */}
            <text x="74.5" y="72" textAnchor="middle" className={styles.cityLabel}>Mumbai</text>
            <text x="245.5" y="72" textAnchor="middle" className={styles.cityLabel}>Nagpur</text>
          </svg>
        </div>
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
              width="36"
              height="36"
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
                  <div className={`${styles.card} ${styles.leftCard}`}>
                    <div className={styles.photoFrame}>
                      <img src={first.photo} alt={first.name} className={`${styles.photo} ${firstLabel === 'The Groom' ? styles.groomPhoto : ''}`} />
                    </div>
                    <span className={styles.label}>{firstLabel}</span>
                    <h3 className={styles.name}>{first.name}</h3>
                    <p className={styles.hometown}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {first.hometown}
                    </p>
                    <p className={styles.bio}>{first.bio}</p>
                  </div>

                  <div className={styles.dotCenter}>
                    <div className={styles.dot} />
                  </div>

                  <div className={`${styles.card} ${styles.rightCard}`}>
                    <div className={styles.photoFrame}>
                      <img src={second.photo} alt={second.name} className={`${styles.photo} ${secondLabel === 'The Groom' ? styles.groomPhoto : ''}`} />
                    </div>
                    <span className={styles.label}>{secondLabel}</span>
                    <h3 className={styles.name}>{second.name}</h3>
                    <p className={styles.hometown}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {second.hometown}
                    </p>
                    <p className={styles.bio}>{second.bio}</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className={styles.closingLine}>They say HR finds the best talent — well, Samiksha didn't even need a job posting. One look and Siddhant's resume was accepted for a lifetime role.<br /><strong>Best hire ever.</strong></p>
              </ScrollReveal>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

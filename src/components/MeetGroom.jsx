import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './MeetGroom.module.css';

export default function MeetGroom() {
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const { photos, details } = content.meetGroom;

  // Interleave: photo, detail, photo, detail, ..., photo
  const items = [];
  for (let i = 0; i < Math.max(photos.length, details.length); i++) {
    if (i < photos.length) items.push({ type: 'photo', data: photos[i], index: i });
    if (i < details.length) items.push({ type: 'detail', data: details[i], index: i });
  }

  return (
    <section id="gallery" className="section">
      <ScrollReveal>
        <h2 className="section-heading">{content.meetGroom.heading}</h2>
        <p className="section-subheading">{content.meetGroom.subheading}</p>
      </ScrollReveal>

      <ScrollReveal>
        <div className={styles.prompt}>
          <p className={styles.promptText}>{content.meetGroom.promptText}</p>
          <button
            className={`${styles.toggleBtn} ${open ? styles.toggleOpen : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Collapse' : 'Expand'}
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
            className={styles.wrapper}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className={styles.inner}>
              <div className={styles.line} />
              {items.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  {item.type === 'photo' ? (
                    <div className={`${styles.block} ${item.index % 2 === 0 ? styles.left : styles.right}`}>
                      <div className={styles.dot} />
                      <div className={styles.photoCard} onClick={() => setLightbox(item.data)}>
                        <div className={styles.photoFrame}>
                          <img src={item.data.src} alt={item.data.alt} className={styles.photo} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={`${styles.block} ${item.index % 2 === 0 ? styles.right : styles.left}`}>
                      <div className={styles.dot} />
                      <div className={styles.detailCard}>
                        <span className={styles.icon}>{item.data.icon}</span>
                        <h3 className={styles.detailTitle}>{item.data.title}</h3>
                        <p className={styles.detailText}>{item.data.text}</p>
                      </div>
                    </div>
                  )}
                </ScrollReveal>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox.src}
              alt={lightbox.alt}
              className={styles.lightboxImg}
              initial={{ scale: 0.6, opacity: 0, rotate: -2, y: 40 }}
              animate={{ scale: 1, opacity: 1, rotate: 0, y: 0 }}
              exit={{ scale: 0.6, opacity: 0, rotate: 2, y: 40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

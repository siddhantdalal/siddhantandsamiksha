import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './Gallery.module.css';

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className="section">
      <ScrollReveal>
        <h2 className="section-heading">{content.gallery.heading}</h2>
        <p className="section-subheading">{content.gallery.subheading}</p>
      </ScrollReveal>

      <div className={`section-inner ${styles.grid}`}>
        {content.gallery.images.map((img, i) => (
          <ScrollReveal key={i} delay={i * 0.06}>
            <div className={styles.item} onClick={() => setLightbox(img)}>
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className={styles.overlay}>
                <span className={styles.viewText}>View</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox.src}
              alt={lightbox.alt}
              className={styles.lightboxImg}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <button
              className={styles.closeBtn}
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import styles from './ArchPhoto.module.css';

const ease = [0.16, 1, 0.3, 1];

// A rounded-top window, like a palace jharokha. Both states share the same
// shape so the clip-path interpolates — only the insets change, growing the
// window up from the bottom centre.
const ARCH = 'round 50% 50% 0 0 / 32% 32% 0 0';

const reveal = {
  hidden: { clipPath: `inset(100% 22% 0% 22% ${ARCH})` },
  // In-out easing so the window visibly rises rather than snapping open
  shown: { clipPath: `inset(0% 0% 0% 0% ${ARCH})`, transition: { duration: 1.4, ease: [0.77, 0, 0.175, 1] } },
};

const settle = {
  hidden: { scale: 1.25 },
  shown: { scale: 1, transition: { duration: 1.8, ease } },
};

// A photo unveiled through an arched window as it scrolls into view, with a
// slow zoom settling in. Frame size and image crop come from the caller's classes.
export default function ArchPhoto({ src, alt, className = '', imgClassName = '', onClick }) {
  return (
    // The in-view check and clicks live on this unclipped frame: a fully
    // clipped element has no visible area, so it would never count as in view
    <motion.div
      className={`${styles.frame} ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.35 }}
      onClick={onClick}
    >
      <motion.div className={styles.window} variants={reveal}>
        <motion.img src={src} alt={alt} className={`${styles.img} ${imgClassName}`} variants={settle} loading="lazy" />
        <span className={styles.outline} aria-hidden="true" />
      </motion.div>
    </motion.div>
  );
}

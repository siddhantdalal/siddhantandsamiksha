import { motion, AnimatePresence } from 'framer-motion';
import { useSide } from '../context/SideContext';
import { content } from '../data/content';
import styles from './SideSelector.module.css';

export default function SideSelector() {
  const { side, setSide } = useSide();

  if (side) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.welcome}>You are cordially invited to the wedding of</p>
          <h1 className={styles.names}>
            <span>{content.couple.groomFirst}</span>
            <span className={styles.amp}>&</span>
            <span>{content.couple.brideFirst}</span>
          </h1>
          <div className={styles.divider} />
          <p className={styles.question}>Which side are you here for?</p>

          <div className={styles.buttons}>
            <button className={styles.btn} onClick={() => setSide('groom')}>
              <span className={styles.btnLabel}>{content.couple.groomFirst}'s Side</span>
              <span className={styles.btnSub}>The Groom</span>
            </button>

            <span className={styles.or}>or</span>

            <button className={styles.btn} onClick={() => setSide('bride')}>
              <span className={styles.btnLabel}>{content.couple.brideFirst}'s Side</span>
              <span className={styles.btnSub}>The Bride</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

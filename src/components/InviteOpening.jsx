import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/LanguageContext';
import { useSide } from '../context/SideContext';
import styles from './InviteOpening.module.css';

const doorEase = [0.65, 0, 0.35, 1];

// Must match the breakpoint where the CSS stacks the doors vertically
const STACKED_DOORS = '(max-width: 640px)';

// Each door swings away from the guest on its outer hinge. Side by side they
// hinge left/right; stacked on phones they hinge top/bottom and part like a gate.
function swingOpen(door, stacked) {
  const angle = door === 'groom' ? 100 : -100;
  return stacked ? { rotateX: -angle } : { rotateY: angle };
}

function MandalaRing({ className }) {
  const petals = Array.from({ length: 24 });
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.35" />
      {petals.map((_, i) => (
        <g key={i} transform={`rotate(${(360 / petals.length) * i} 100 100)`}>
          <path
            d="M100 4 C104 14, 104 22, 100 30 C96 22, 96 14, 100 4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.6"
          />
          <circle cx="100" cy="36" r="1" fill="currentColor" opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

export default function InviteOpening() {
  const content = useContent();
  const { side, setSide } = useSide();
  const [phase, setPhase] = useState('seal'); // 'seal' | 'sides'
  const [chosen, setChosen] = useState(null); // { who, stacked } once a door is picked

  const choose = (who) => {
    if (chosen) return;
    setChosen({ who, stacked: window.matchMedia(STACKED_DOORS).matches });
    // Reveal the site while the doors are still swinging; the overlay's exit
    // fade (below) then clears the doors once they're nearly edge-on
    setTimeout(() => setSide(who), 300);
  };

  const doorTransition = { duration: 1.5, ease: doorEase };

  return (
    <AnimatePresence>
      {!side && (
        <motion.div
          key="opening"
          className={`${styles.overlay} ${phase === 'sides' ? styles.overlayClear : ''}`}
          exit={{ opacity: 0, transition: { duration: 0.7, delay: 0.8 } }}
        >
          {/* ——— Phase 1: the sealed invitation ——— */}
          <AnimatePresence mode="wait">
            {phase === 'seal' && (
              <motion.div
                key="seal"
                className={styles.seal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1 } }}
                exit={{ opacity: 0, scale: 1.06, transition: { duration: 0.7, ease: doorEase } }}
              >
                <div className={styles.mandalaWrap}>
                  <MandalaRing className={styles.mandala} />
                  <MandalaRing className={styles.mandalaReverse} />
                </div>

                <motion.p
                  className={styles.shloka}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.9 } }}
                >
                  {content.ui.shloka}
                </motion.p>

                <motion.p
                  className={styles.kicker}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.9 } }}
                >
                  {content.ui.weddingOf}
                </motion.p>

                <motion.h1
                  className={styles.names}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 1.05, duration: 1 } }}
                >
                  {content.couple.groomFirst}
                  <span className={styles.amp}>&amp;</span>
                  {content.couple.brideFirst}
                </motion.h1>

                <motion.div
                  className={styles.dateRow}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 1.35, duration: 0.9 } }}
                >
                  <span className={styles.dateLine} />
                  <span className={styles.date}>{content.ui.dateShort}</span>
                  <span className={styles.dateLine} />
                </motion.div>

                <motion.button
                  className={styles.openBtn}
                  onClick={() => setPhase('sides')}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 1.65, duration: 0.9 } }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {content.ui.openInvitation}
                </motion.button>
              </motion.div>
            )}

            {/* ——— Phase 2: choose your side — the palace doors ——— */}
            {phase === 'sides' && (
              <motion.div
                key="sides"
                className={styles.doors}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
              >
                {/* Warm light spilling through the gap as the doors part */}
                <motion.span
                  className={`${styles.light} ${chosen?.who === 'bride' ? styles.lightBride : styles.lightGroom}`}
                  animate={chosen ? { opacity: [0, 1, 0], scale: [0.6, 1.2, 1.5] } : {}}
                  transition={{ duration: 1.8, times: [0, 0.4, 1], ease: 'easeOut' }}
                  aria-hidden="true"
                />

                <motion.button
                  className={`${styles.door} ${styles.doorGroom}`}
                  onClick={() => choose('groom')}
                  animate={chosen ? { ...swingOpen('groom', chosen.stacked), transition: doorTransition } : {}}
                >
                  <span className={styles.doorPattern} aria-hidden="true" />
                  <span className={styles.doorContent}>
                    <span className={styles.doorScript}>{content.ui.team}</span>
                    <span className={styles.doorName}>{content.couple.groomFirst}</span>
                    <span className={styles.doorSub}>{content.ui.groomDoorSub}</span>
                  </span>
                </motion.button>

                <motion.div
                  className={styles.seam}
                  animate={chosen ? { opacity: 0, transition: { duration: 0.4 } } : {}}
                  aria-hidden="true"
                >
                  <span className={styles.seamDiamond} />
                </motion.div>

                <motion.button
                  className={`${styles.door} ${styles.doorBride}`}
                  onClick={() => choose('bride')}
                  animate={chosen ? { ...swingOpen('bride', chosen.stacked), transition: doorTransition } : {}}
                >
                  <span className={styles.doorPattern} aria-hidden="true" />
                  <span className={styles.doorContent}>
                    <span className={styles.doorScript}>{content.ui.team}</span>
                    <span className={styles.doorName}>{content.couple.brideFirst}</span>
                    <span className={styles.doorSub}>{content.ui.brideDoorSub}</span>
                  </span>
                </motion.button>

                {!chosen && (
                  <p className={styles.doorPrompt}>{content.ui.doorPrompt}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import content from '../data/content';
import { useSide } from '../context/SideContext';
import styles from './InviteOpening.module.css';

const inOut = [0.65, 0, 0.35, 1];

// The moment a side is chosen, in seconds from the tap
const SPOTLIGHT = 0.45; // the tapped panel glows and gets a gold tick; the other dims
const BLOOM = 0.8; // the chosen side's colour floods out from the tap
const HOLD = 0.4; // the welcome line rests on the colour
const REVEAL = 0.85; // the colour opens from the centre onto the site
const REVEAL_AT = SPOTLIGHT + BLOOM + HOLD;

// Once the colour covers the screen the panels are hidden beneath it, so the
// opening ring reveals the site rather than the panels
const hideUnderBloom = { opacity: 0, transition: { delay: SPOTLIGHT + BLOOM, duration: 0 } };

// Welcome line: fades in mid-bloom, holds, fades just as the reveal starts
const WELCOME_IN = SPOTLIGHT + 0.4;
const WELCOME_SPAN = REVEAL_AT + 0.25 - WELCOME_IN;

// Gold dust thrown out around the welcome line (fixed, so renders stay pure)
const DUST = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2 + (i % 2 ? 0.18 : -0.12);
  const distance = 110 + (i % 3) * 45;
  return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance };
});

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

// One side's panel. Once a side is chosen, the chosen panel widens, glows and
// gets a gold tick; the other narrows and dims.
function SidePanel({ who, team, name, sub, chosen, onChoose }) {
  const isChosen = chosen?.who === who;
  const isOther = Boolean(chosen) && !isChosen;
  const state = isChosen ? styles.doorChosen : isOther ? styles.doorOther : '';

  return (
    <motion.button
      className={`${styles.door} ${who === 'groom' ? styles.doorGroom : styles.doorBride} ${state}`}
      onClick={(e) => onChoose(who, e)}
      animate={chosen ? hideUnderBloom : {}}
    >
      <span className={styles.doorPattern} aria-hidden="true" />
      <motion.span
        className={styles.doorContent}
        animate={isChosen ? { scale: 1.12 } : {}}
        transition={{ duration: SPOTLIGHT, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <span className={styles.doorScript}>{team}</span>
        <span className={styles.doorName}>{name}</span>
        <span className={styles.doorSub}>{sub}</span>
        {isChosen && (
          <motion.span
            className={styles.tick}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.08, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <motion.path d="M6 12.5l4 4 8-9" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.22, duration: 0.3 }} />
            </svg>
          </motion.span>
        )}
      </motion.span>
      <motion.span
        className={styles.doorShade}
        initial={false}
        animate={{ opacity: isOther ? 1 : 0 }}
        transition={{ duration: SPOTLIGHT }}
        aria-hidden="true"
      />
    </motion.button>
  );
}

// The chosen side's colour floods out from the tap point and welcomes the
// guest, then opens from the centre like a widening ring onto the site beneath.
function Bloom({ chosen, name, welcome }) {
  const { who, x, y, reach, opening } = chosen;

  return (
    <motion.div
      className={`${styles.bloom} ${who === 'bride' ? styles.bloomBride : styles.bloomGroom}`}
      style={{ '--hole': '0px' }}
      initial={{ clipPath: `circle(0px at ${x}px ${y}px)` }}
      animate={{ clipPath: `circle(${reach}px at ${x}px ${y}px)`, '--hole': `${opening}px` }}
      transition={{
        clipPath: { delay: SPOTLIGHT, duration: BLOOM, ease: inOut },
        '--hole': { delay: REVEAL_AT + 0.1, duration: REVEAL, ease: inOut },
      }}
      aria-hidden="true"
    >
      {/* Gold ring tracing the edge of the opening */}
      <motion.span
        className={styles.bloomRim}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ delay: REVEAL_AT + 0.1, duration: REVEAL, times: [0, 0.1, 0.75, 1] }}
      />
      <motion.div
        className={styles.bloomContent}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: [0, 1, 1, 0], y: [14, 0, 0, -8] }}
        transition={{ delay: WELCOME_IN, duration: WELCOME_SPAN, times: [0, 0.4 / WELCOME_SPAN, (REVEAL_AT - WELCOME_IN) / WELCOME_SPAN, 1] }}
      >
        <span className={styles.bloomName}>{name}</span>
        <span className={styles.bloomWelcome}>{welcome}</span>
        {DUST.map((d, i) => (
          <motion.span
            key={i}
            className={styles.dust}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: d.x, y: d.y, opacity: [0, 1, 0] }}
            transition={{ delay: WELCOME_IN + 0.1, duration: 1.1, ease: 'easeOut' }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function InviteOpening() {
  const { side, setSide } = useSide();
  const [phase, setPhase] = useState('seal'); // 'seal' | 'sides'
  const [chosen, setChosen] = useState(null); // the chosen side + where the bloom starts

  const choose = (who, e) => {
    if (chosen) return;
    // Bloom from where they tapped, or the panel's centre for keyboard presses
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.detail ? e.clientX : rect.left + rect.width / 2;
    const y = e.detail ? e.clientY : rect.top + rect.height / 2;
    const w = window.innerWidth;
    const h = window.innerHeight;
    setChosen({
      who,
      x,
      y,
      reach: Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) + 8, // past the farthest corner
      opening: Math.hypot(w, h) / 2 + 8, // a centred ring that clears every corner
    });
    // Show the site as the colour starts opening, so the hero animates in beneath it
    setTimeout(() => setSide(who), REVEAL_AT * 1000);
  };

  return (
    <AnimatePresence>
      {!side && (
        <motion.div
          key="opening"
          className={`${styles.overlay} ${phase === 'sides' ? styles.overlayClear : ''}`}
          exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.1 + REVEAL } }}
        >
          {/* ——— Phase 1: the sealed invitation ——— */}
          <AnimatePresence mode="wait">
            {phase === 'seal' && (
              <motion.div
                key="seal"
                className={styles.seal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1 } }}
                exit={{ opacity: 0, scale: 1.06, transition: { duration: 0.7, ease: inOut } }}
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

            {/* ——— Phase 2: choose your side ——— */}
            {phase === 'sides' && (
              <motion.div
                key="sides"
                className={styles.doors}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
              >
                <SidePanel
                  who="groom"
                  team={content.ui.team}
                  name={content.couple.groomFirst}
                  sub={content.ui.groomDoorSub}
                  chosen={chosen}
                  onChoose={choose}
                />

                <motion.div
                  className={styles.seam}
                  animate={chosen ? { opacity: 0, transition: { duration: 0.4 } } : {}}
                  aria-hidden="true"
                >
                  <span className={styles.seamDiamond} />
                </motion.div>

                <SidePanel
                  who="bride"
                  team={content.ui.team}
                  name={content.couple.brideFirst}
                  sub={content.ui.brideDoorSub}
                  chosen={chosen}
                  onChoose={choose}
                />

                {!chosen && (
                  <p className={styles.doorPrompt}>{content.ui.doorPrompt}</p>
                )}

                {chosen && (
                  <Bloom
                    chosen={chosen}
                    name={chosen.who === 'bride' ? content.couple.brideFirst : content.couple.groomFirst}
                    welcome={content.ui.sideWelcome[chosen.who]}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

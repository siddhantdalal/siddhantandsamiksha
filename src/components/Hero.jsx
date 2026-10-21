import { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion';
import content from '../data/content';
import { useSide } from '../context/SideContext';
import FlipClock from './FlipClock';
import Medallion from './Medallion';
import styles from './Hero.module.css';

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(calcTime(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTime(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

function calcTime(target) {
  const diff = new Date(target) - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const letterVariants = {
  hidden: { opacity: 0, y: '0.6em', rotateX: -60 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: 0.15 + i * 0.045, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
};

// The hero settles from slightly close-up as the chosen side's colour opens
// onto it, so it feels like stepping into the invitation
const dollyIn = {
  hidden: { scale: 1.12 },
  show: { scale: 1, transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } },
};

function StaggeredName({ text, offset = 0 }) {
  return (
    <span className={styles.nameRow} aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          custom={offset + i}
          variants={letterVariants}
          className={styles.letter}
          aria-hidden="true"
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { days, hours, minutes, seconds } = useCountdown(content.weddingDate);
  const { side } = useSide();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '32%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const { couple, ui } = content;
  const isBride = side === 'bride';
  const firstName = isBride ? couple.brideFirst : couple.groomFirst;
  const secondName = isBride ? couple.groomFirst : couple.brideFirst;
  // Parents and home cities follow the order of the names
  const [firstFamily, secondFamily] = isBride
    ? [couple.brideParents, couple.groomParents]
    : [couple.groomParents, couple.brideParents];
  const welcomeMsg = side ? content.hero.welcome[side] : '';

  return (
    <section id="hero" ref={ref} className={styles.hero}>
      <div className={styles.glowTop} aria-hidden="true" />

      <motion.div
        className={styles.content}
        style={{ y: contentY, opacity: contentOpacity }}
        variants={dollyIn}
        initial="hidden"
        animate={side ? 'show' : 'hidden'}
      >
        <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

        <motion.div
          className={styles.crest}
          variants={{
            hidden: { opacity: 0, scale: 0.85 },
            show: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          <Medallion size={84} alt="" />
        </motion.div>

        <motion.p
          className={styles.tagline}
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          {content.hero.tagline}
        </motion.p>

        <h1 className={styles.names} key={`${firstName}-${secondName}`}>
          <StaggeredName text={firstName} />
          <motion.span
            className={styles.ampersand}
            variants={{
              hidden: { opacity: 0, scale: 0.6 },
              show: { opacity: 1, scale: 1, transition: { delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            &amp;
          </motion.span>
          <StaggeredName text={secondName} offset={firstName.length + 2} />
        </h1>

        <motion.div
          className={styles.families}
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.9 } },
          }}
        >
          <div className={styles.parents}>
            <p className={styles.parent}>
              <span className={styles.relation}>{firstFamily.relation}</span>
              {firstFamily.names}
            </p>
            <span className={styles.parentsDiamond} aria-hidden="true" />
            <p className={styles.parent}>
              <span className={styles.relation}>{secondFamily.relation}</span>
              {secondFamily.names}
            </p>
          </div>
          <p className={styles.cities}>
            <span className={styles.city}>{firstFamily.city}</span>
            <span className={styles.citiesLine}>{ui.citiesLine}</span>
            <span className={styles.city}>{secondFamily.city}</span>
          </p>
        </motion.div>

        {welcomeMsg && (
          <motion.p
            className={styles.welcome}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
          >
            {welcomeMsg}
          </motion.p>
        )}

        <motion.div
          className={styles.dateRow}
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0, transition: { delay: 1.25, duration: 0.9 } },
          }}
        >
          <span className={styles.dateLine} />
          <p className={styles.date}>{content.hero.date}</p>
          <span className={styles.dateLine} />
        </motion.div>

        <motion.div
          className={styles.countdown}
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0, transition: { delay: 1.45, duration: 0.9 } },
          }}
        >
          <FlipClock
            units={[
              { value: days, label: content.ui.countdown.days },
              { value: hours, label: content.ui.countdown.hours },
              { value: minutes, label: content.ui.countdown.minutes },
              { value: seconds, label: content.ui.countdown.seconds },
            ]}
          />
        </motion.div>

        <motion.a
          href="#events"
          className={styles.cta}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { delay: 1.7, duration: 0.9 } },
          }}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#events')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {content.hero.cta}
        </motion.a>
      </motion.div>

      <div className={styles.scrollHint}>
        <span />
      </div>
    </section>
  );
}

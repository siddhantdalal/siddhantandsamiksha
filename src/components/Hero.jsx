import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { content } from '../data/content';
import { useSide } from '../context/SideContext';
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

export default function Hero() {
  const { days, hours, minutes, seconds } = useCountdown(content.weddingDate);
  const { side } = useSide();

  const firstName = side === 'bride' ? content.couple.brideFirst : content.couple.groomFirst;
  const secondName = side === 'bride' ? content.couple.groomFirst : content.couple.brideFirst;
  const welcomeMsg = side ? content.hero.welcome[side] : '';

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bgImage} />
      <div className={styles.overlay} />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={styles.tagline}>{content.hero.tagline}</p>

        <h1 className={styles.names}>
          <span>{firstName}</span>
          <span className={styles.ampersand}>&</span>
          <span>{secondName}</span>
        </h1>

        {welcomeMsg && <p className={styles.welcome}>{welcomeMsg}</p>}

        <p className={styles.date}>{content.hero.date}</p>

        <div className={styles.countdown}>
          {[
            { value: days, label: 'Days' },
            { value: hours, label: 'Hours' },
            { value: minutes, label: 'Minutes' },
            { value: seconds, label: 'Seconds' },
          ].map(({ value, label }) => (
            <div key={label} className={styles.countUnit}>
              <span className={styles.countValue}>--</span>
              <span className={styles.countLabel}>{label}</span>
            </div>
          ))}
        </div>

        <a
          href="#events"
          className={styles.cta}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#events')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {content.hero.cta}
        </a>
      </motion.div>

      <div className={styles.scrollHint}>
        <span />
      </div>
    </section>
  );
}

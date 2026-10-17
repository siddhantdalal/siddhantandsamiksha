import { useState, useEffect } from 'react';
import content from '../data/content';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';
import FlipClock from './FlipClock';
import Backdrop from './Backdrop';
import styles from './EngagementDetails.module.css';

function calcElapsed(sinceDate) {
  const diff = Math.max(0, new Date() - new Date(sinceDate));
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function useCountUp(sinceDate) {
  const [elapsed, setElapsed] = useState(() => calcElapsed(sinceDate));

  useEffect(() => {
    const id = setInterval(() => setElapsed(calcElapsed(sinceDate)), 1000);
    return () => clearInterval(id);
  }, [sinceDate]);

  return elapsed;
}

export default function EngagementDetails() {
  const { engagement, ui } = content;
  const { days, hours, minutes, seconds } = useCountUp(engagement.countdownDate);

  const units = [
    { value: days, label: ui.countdown.days },
    { value: hours, label: ui.countdown.hours },
    { value: minutes, label: ui.countdown.minutes },
    { value: seconds, label: ui.countdown.seconds },
  ];

  return (
    <section className="section has-backdrop">
      <Backdrop src={`${import.meta.env.BASE_URL}images/engagement/ring-hands.jpg`} focus="62% 42%" />
      <ScrollReveal>
        <div className={styles.wrapper}>
          <SectionHeading>{engagement.heading}</SectionHeading>
          <p className="section-subheading">{engagement.script}</p>

          <div className={styles.ringMark} aria-hidden="true">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 4h6l2 3-5 2-5-2 2-3z" />
              <circle cx="12" cy="14" r="7" />
            </svg>
          </div>

          <p className={styles.note}>{engagement.note}</p>
          <p className={styles.engagedDate}>{engagement.date}</p>

          <p className={styles.sinceLabel}>{ui.engagedFor}</p>
          <FlipClock units={units} className={styles.countdown} />
          <p className={styles.countdownMsg}>{ui.countingLine}</p>
        </div>
      </ScrollReveal>
    </section>
  );
}

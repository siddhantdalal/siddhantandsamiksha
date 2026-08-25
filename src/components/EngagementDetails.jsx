import { useState, useEffect } from 'react';
import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
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
  const { engagement } = content;
  const { days, hours, minutes, seconds } = useCountUp(engagement.countdownDate);

  const units = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ];

  return (
    <section className="section">
      <ScrollReveal>
        <div className={styles.wrapper}>
          <h2 className="section-heading">{engagement.heading}</h2>
          <p className="section-subheading">{engagement.script}</p>

          <div className={styles.ringMark} aria-hidden="true">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 4h6l2 3-5 2-5-2 2-3z" />
              <circle cx="12" cy="14" r="7" />
            </svg>
          </div>

          <p className={styles.note}>{engagement.note}</p>
          <p className={styles.engagedDate}>{engagement.date}</p>

          <p className={styles.sinceLabel}>Happily engaged for</p>
          <div className={styles.countdown}>
            {units.map(({ value, label }) => (
              <div key={label} className={styles.countUnit}>
                <span key={value} className={styles.countValue}>{String(value).padStart(2, '0')}</span>
                <span className={styles.countLabel}>{label}</span>
              </div>
            ))}
          </div>
          <p className={styles.countdownMsg}>…and counting, all the way to the mandap.</p>
        </div>
      </ScrollReveal>
    </section>
  );
}

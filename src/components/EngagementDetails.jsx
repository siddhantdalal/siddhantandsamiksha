import { useState, useEffect } from 'react';
import { useContent } from '../context/LanguageContext';
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
  const content = useContent();
  const { engagement, ui } = content;
  const { days, hours, minutes, seconds } = useCountUp(engagement.countdownDate);

  const units = [
    { value: days, label: ui.countdown.days },
    { value: hours, label: ui.countdown.hours },
    { value: minutes, label: ui.countdown.minutes },
    { value: seconds, label: ui.countdown.seconds },
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

          <p className={styles.sinceLabel}>{ui.engagedFor}</p>
          <div className={styles.countdown}>
            {units.map(({ value, label }) => (
              <div key={label} className={styles.countUnit}>
                <span key={value} className={styles.countValue}>{String(value).padStart(2, '0')}</span>
                <span className={styles.countLabel}>{label}</span>
              </div>
            ))}
          </div>
          <p className={styles.countdownMsg}>{ui.countingLine}</p>
        </div>
      </ScrollReveal>
    </section>
  );
}

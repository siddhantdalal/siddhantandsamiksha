import { useState, useEffect } from 'react';
import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
import { CalendarIcon, ClockIcon, MapPinIcon } from './Icons';
import styles from './EngagementDetails.module.css';

function useCountdown(targetDate) {
  const calc = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

export default function EngagementDetails() {
  const { engagement } = content;
  const { days, hours, minutes, seconds } = useCountdown(engagement.countdownDate);

  return (
    <section className="section">
      <ScrollReveal>
        <div className={styles.wrapper}>
          <h2 className="section-heading">{engagement.heading}</h2>

          <div className={styles.card}>
            <div className={styles.detail}>
              <span className={styles.icon}><CalendarIcon size={22} /></span>
              <div>
                <h4 className={styles.label}>Date</h4>
                <p className={styles.value}>{engagement.date}</p>
              </div>
            </div>

            <div className={styles.detail}>
              <span className={styles.icon}><ClockIcon size={22} /></span>
              <div>
                <h4 className={styles.label}>Time</h4>
                <p className={styles.value}>{engagement.time}</p>
              </div>
            </div>

            <div className={styles.detail}>
              <span className={styles.icon}><MapPinIcon size={22} /></span>
              <div>
                <h4 className={styles.label}>Venue</h4>
                <p className={styles.value}>{engagement.venue}</p>
                <p className={styles.address}>{engagement.address}</p>
              </div>
            </div>
          </div>

          <p className={styles.countdownMsg}>Every second brings us closer to forever</p>
          <div className={styles.countdown}>
            {[
              { value: days, label: 'Days' },
              { value: hours, label: 'Hours' },
              { value: minutes, label: 'Minutes' },
              { value: seconds, label: 'Seconds' },
            ].map(({ value, label }) => (
              <div key={label} className={styles.countUnit}>
                <span className={styles.countValue}>{String(value).padStart(2, '0')}</span>
                <span className={styles.countLabel}>{label}</span>
              </div>
            ))}
          </div>

          {engagement.mapEmbed && (
            <div className={styles.map}>
              <iframe
                src={engagement.mapEmbed}
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: 'var(--border-radius)' }}
                allowFullScreen
                loading="lazy"
                title="Engagement venue location"
              />
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}

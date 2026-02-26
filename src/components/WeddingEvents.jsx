import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './WeddingEvents.module.css';

const icons = {
  Mehendi: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Two hands side by side, both tilted diagonally top-right */}
      {/* Back hand (slightly behind) */}
      <g transform="rotate(-20 14 12)">
        <path d="M16 22v-3c0-.8-.5-1.5-1.2-2S13 15.5 13 14v-2a.7.7 0 0 1 1.4 0v2" />
        <path d="M14.4 13.5v-4a.7.7 0 0 1 1.4 0v4" />
        <path d="M15.8 13v-4.5a.7.7 0 0 1 1.4 0v4.5" />
        <path d="M17.2 13v-4a.7.7 0 0 1 1.4 0v4" />
        <path d="M18.6 13.5v-2.5a.7.7 0 0 1 1.4 0v3c0 1.5-.7 2.5-1.3 3.5v4.5" />
        <circle cx="16.5" cy="15.5" r=".8" />
        <path d="M15.3 17.5c.7-.3 1.8-.3 2.5 0" />
      </g>
      {/* Front hand */}
      <g transform="rotate(-20 8 12)">
        <path d="M6 22v-3c0-.8-.5-1.5-1.2-2S3 15.5 3 14v-2a.7.7 0 0 1 1.4 0v2" />
        <path d="M4.4 13.5v-4a.7.7 0 0 1 1.4 0v4" />
        <path d="M5.8 13v-4.5a.7.7 0 0 1 1.4 0v4.5" />
        <path d="M7.2 13v-4a.7.7 0 0 1 1.4 0v4" />
        <path d="M8.6 13.5v-2.5a.7.7 0 0 1 1.4 0v3c0 1.5-.7 2.5-1.3 3.5v4.5" />
        <circle cx="6.5" cy="15.5" r=".8" />
        <circle cx="6.5" cy="15.5" r=".25" />
        <path d="M5.3 17.5c.7-.3 1.8-.3 2.5 0" />
        <path d="M5.6 19c.5-.2 1.3-.2 1.8 0" />
      </g>
    </svg>
  ),
  Haldi: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Bowl */}
      <path d="M3 12c0 5 4 8 9 8s9-3 9-8" />
      <ellipse cx="12" cy="12" rx="9" ry="3" />
      {/* Haldi mound inside bowl - filled */}
      <path d="M7 11c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5z" fill="currentColor" />
      {/* Base */}
      <path d="M9 20c0 1 1.3 2 3 2s3-1 3-2" />
    </svg>
  ),
  Sangeet: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Her head */}
      <circle cx="9" cy="3.5" r="1.5" />
      {/* His head */}
      <circle cx="15" cy="2.5" r="1.5" />
      {/* Her body */}
      <path d="M9 5v5" />
      {/* Her skirt flared */}
      <path d="M4 22q5-6 5-12" />
      <path d="M14 22q-5-6-5-12" />
      {/* Her arms - one up, one held */}
      <path d="M5 6l4 2" />
      <path d="M9 8l3-1" />
      {/* His body */}
      <path d="M15 4v8" />
      {/* His legs */}
      <path d="M15 12l-2 10" />
      <path d="M15 12l3 10" />
      {/* His arms - one up, one holding hers */}
      <path d="M12 7l3-2" />
      <path d="M15 5l4-2" />
    </svg>
  ),
  Wedding: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Circular varmala garland */}
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="5.5" />
      {/* Flowers around the garland ring */}
      <circle cx="12" cy="4" r="1.5" fill="currentColor" />
      <circle cx="17.7" cy="6.3" r="1.5" fill="currentColor" />
      <circle cx="20" cy="12" r="1.5" fill="currentColor" />
      <circle cx="17.7" cy="17.7" r="1.5" fill="currentColor" />
      <circle cx="12" cy="20" r="1.5" fill="currentColor" />
      <circle cx="6.3" cy="17.7" r="1.5" fill="currentColor" />
      <circle cx="4" cy="12" r="1.5" fill="currentColor" />
      <circle cx="6.3" cy="6.3" r="1.5" fill="currentColor" />
    </svg>
  ),
};

export default function WeddingEvents() {
  return (
    <section id="events" className="section">
      <ScrollReveal>
        <h2 className="section-heading">{content.weddingEvents.heading}</h2>
        <p className="section-subheading">{content.weddingEvents.subheading}</p>
      </ScrollReveal>

      <div className={`section-inner ${styles.grid}`}>
        {content.weddingEvents.events.map((event, i) => (
          <ScrollReveal key={event.name} delay={i * 0.08}>
            <div className={styles.card}>
              <span className={styles.icon}>{icons[event.name]}</span>
              <h3 className={styles.name}>{event.name}</h3>
              <div className={styles.meta}>
                <p>{event.date}</p>
                <p>{event.time}</p>
                <p className={event.venue === 'Coming soon' ? styles.golden : ''}>{event.venue}</p>
              </div>
              <p className={styles.desc}>{event.description}</p>
              {event.dressCode && (
                <p className={styles.dress}>
                  <span>Dress Code:</span> {event.dressCode}
                </p>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './WeddingEvents.module.css';

const icons = {
  Mehendi: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Palm */}
      <path d="M8 22v-4c0-1-.5-2-1.5-2.5S4 14 4 12V8a1 1 0 0 1 2 0v3" />
      <path d="M6 11V5a1 1 0 0 1 2 0v6" />
      <path d="M8 10V4a1 1 0 0 1 2 0v7" />
      <path d="M10 10V5a1 1 0 0 1 2 0v6" />
      <path d="M12 11V7a1 1 0 0 1 2 0v5c0 2-1 3.5-2 5v5" />
      {/* Mehendi designs on palm */}
      <circle cx="9" cy="13" r="1.2" />
      <circle cx="9" cy="13" r="0.4" />
      <path d="M7.5 16.5c1-.5 2-.5 3 0" />
      <path d="M8 18.5c.5-.3 1.5-.3 2 0" />
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

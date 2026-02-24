import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './WeddingEvents.module.css';

const icons = {
  Mehendi: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c0-6-4-8-4-14a4 4 0 1 1 8 0c0 6-4 8-4 14z" />
      <path d="M12 6c0 2.5-1.5 4-1.5 7" />
      <path d="M12 6c0 2.5 1.5 4 1.5 7" />
    </svg>
  ),
  Haldi: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Sangeet: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  Wedding: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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

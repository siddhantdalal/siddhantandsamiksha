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
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      {/* Wooden bowl */}
      <ellipse cx="11" cy="13" rx="8" ry="2.5" />
      <path d="M3 13 C3 18 6.5 20 11 20 C15.5 20 19 18 19 13" />
      {/* Bowl wood grain lines */}
      <path d="M4.5 15.5 C7 17 15 17 17.5 15.5" strokeWidth="0.7" />
      <path d="M5.5 17.5 C8 19 14 19 16.5 17.5" strokeWidth="0.7" />
      {/* Haldi powder mound - filled */}
      <path d="M5 12 C5 8 7.5 5 11 5 C14.5 5 17 8 17 12z" fill="currentColor" />
      {/* Powder texture lines */}
      <path d="M7 10 C9 8.5 13 8.5 15 10" strokeWidth="0.7" />
      <path d="M8 8 C9.5 7 12.5 7 14 8" strokeWidth="0.7" />
      {/* Turmeric roots beside bowl */}
      <path d="M19 16 C20 15 21.5 14.5 22 15.5 C22.5 16.5 21 17 20 17" strokeWidth="1" />
      <path d="M19.5 17.5 C20.5 17 22 16.5 22.5 17.5 C23 18.5 21.5 19 20.5 18.5" strokeWidth="1" />
      {/* Small leaves */}
      <path d="M18.5 15 C19 13.5 20 13 20.5 14" fill="currentColor" strokeWidth="0.7" />
      <path d="M19.5 14.5 C20 13 21 12.5 21.5 13.5" fill="currentColor" strokeWidth="0.7" />
    </svg>
  ),
  Sangeet: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Her - head */}
      <circle cx="8" cy="2.5" r="1.5" fill="currentColor" />
      {/* Her - upper body */}
      <path d="M8 4 C8 5 8 6 7.5 8" />
      {/* Her - lehenga/skirt flared elegantly */}
      <path d="M7.5 8 C6 10 4 14 2 22 L13 22 C11 14 9.5 10 7.5 8z" />
      {/* Her - dupatta flowing */}
      <path d="M6 5 C4 4 2 5 1 7" />
      {/* Her - arm raised gracefully */}
      <path d="M8 5 C9 4 10 3 11 2" />
      {/* Her - arm holding his */}
      <path d="M8 6 C9 6.5 10 7 11 7" />
      {/* Him - head */}
      <circle cx="16" cy="1.5" r="1.5" fill="currentColor" />
      {/* Him - torso / sherwani */}
      <path d="M15 3 L14.5 5 L13 10 L19 10 L17.5 5 L17 3z" />
      {/* Him - legs in motion */}
      <path d="M14 10 C13.5 14 12.5 18 12 22" />
      <path d="M18 10 C18.5 14 19 18 20 22" />
      {/* Him - arm up celebrating */}
      <path d="M16 4 C17 3 19 1.5 21 1" />
      {/* Him - arm connecting to her */}
      <path d="M15 5 C14 6 12 7 11 7" />
    </svg>
  ),
  Wedding: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Gathbandhan - two cloths tied in a knot */}
      {/* Left cloth - outer edge going up */}
      <path d="M10 8 C8 5 5 3 1 1" />
      <path d="M10 8 C7 6 4 5 0 4" />
      {/* Right cloth - outer edge going up */}
      <path d="M14 8 C16 5 19 3 23 1" />
      <path d="M14 8 C17 6 20 5 24 4" />
      {/* Central knot - two loops tied together */}
      <path d="M10 8 C10 6.5 11 6 12 7 C13 6 14 6.5 14 8 C14 9.5 13 10.5 12 10 C11 10.5 10 9.5 10 8z" fill="currentColor" />
      {/* Left hanging cloth - continuous from knot */}
      <path d="M10 9 C9 12 8 15 6 19 C7 21 9 21 10 19 C10.5 16 11 13 11.5 10" />
      <path d="M6 19 C6.5 20 7 20.5 8 20" />
      {/* Right hanging cloth - continuous from knot */}
      <path d="M14 9 C15 12 16 15 18 19 C17 21 15 21 14 19 C13.5 16 13 13 12.5 10" />
      <path d="M18 19 C17.5 20 17 20.5 16 20" />
    </svg>
  ),
};

export default function WeddingEvents() {
  return (
    <section id="events" className="section">
      <ScrollReveal>
        <h2 className="section-heading">{content.weddingEvents.heading}</h2>
        <p className="section-subheading">{content.weddingEvents.subheading}</p>
        <p className={styles.venueInfo}>{content.weddingEvents.dates}</p>
        <p className={styles.venueAddress}>{content.weddingEvents.venue}</p>
        <div className={styles.divider} />
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

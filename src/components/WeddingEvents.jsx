import { useContent } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';
import styles from './WeddingEvents.module.css';

const icons = {
  Haldi: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      {/* Turmeric mound */}
      <path d="M7.2 11.5 C7.2 8.2 9.3 6.3 12 6.3 C14.7 6.3 16.8 8.2 16.8 11.5z" fill="currentColor" stroke="none" />
      {/* Bowl with foot */}
      <path d="M5 11.5 L19 11.5 C19 16 16.2 18.2 12 18.2 C7.8 18.2 5 16 5 11.5z" />
      <path d="M9.8 18.4 L9.3 20.4 L14.7 20.4 L14.2 18.4" />
      {/* Auspicious sparkles */}
      <path d="M12 2.8 v1.6 M11.2 3.6 h1.6" />
      <path d="M6.2 4.4 v1.3 M5.55 5.05 h1.3" />
      <path d="M17.8 4.4 v1.3 M17.15 5.05 h1.3" />
    </svg>
  ),
  Sangeet: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      {/* Dhol body and heads */}
      <rect x="4.8" y="9.2" width="14.4" height="9.6" rx="3.2" />
      <path d="M8.2 9.2 v9.6 M15.8 9.2 v9.6" />
      {/* Cross lacing */}
      <path d="M8.2 10.6 L15.8 13.2 M15.8 10.6 L8.2 13.2 M8.2 14.8 L15.8 17.4 M15.8 14.8 L8.2 17.4" strokeWidth="0.8" opacity="0.75" />
      {/* Music notes */}
      <circle cx="8.2" cy="5.2" r="1.1" fill="currentColor" stroke="none" />
      <path d="M9.3 5.2 V2.7 C10.1 2.9 10.7 3.2 11.1 3.8" />
      <circle cx="14.6" cy="4.4" r="0.95" fill="currentColor" stroke="none" />
      <path d="M15.55 4.4 V2.3 C16.2 2.45 16.7 2.7 17.1 3.2" />
    </svg>
  ),
  Wedding: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      {/* Coconut with tuft */}
      <circle cx="12" cy="6.4" r="2.2" />
      <path d="M11.2 4.4 C11.4 3.8 12.6 3.8 12.8 4.4" strokeWidth="1" />
      {/* Mango leaves */}
      <path d="M9.7 8.5 C8.1 8.3 6.8 7.3 6.2 5.7 C7.9 5.8 9.2 6.8 9.9 8.3z" fill="currentColor" stroke="none" opacity="0.9" />
      <path d="M14.3 8.5 C15.9 8.3 17.2 7.3 17.8 5.7 C16.1 5.8 14.8 6.8 14.1 8.3z" fill="currentColor" stroke="none" opacity="0.9" />
      {/* Kalash rim, body and base */}
      <path d="M8.5 9 h7" />
      <path d="M9.4 9 C9.4 10 9 10.7 8.3 11.3 C6.9 12.1 6 13.5 6 15 C6 17.8 8.7 19.8 12 19.8 C15.3 19.8 18 17.8 18 15 C18 13.5 17.1 12.1 15.7 11.3 C15 10.7 14.6 10 14.6 9" />
      <path d="M12 12.6 L13.3 14.2 L12 15.8 L10.7 14.2z" fill="currentColor" stroke="none" />
      <path d="M9.6 21.2 h4.8" />
    </svg>
  ),
};

export default function WeddingEvents() {
  const content = useContent();
  return (
    <section id="events" className="section">
      <ScrollReveal>
        <h2 className="section-heading">{content.weddingEvents.heading}</h2>
        <p className="section-subheading">{content.weddingEvents.subheading}</p>
        <a
          href={content.weddingEvents.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <p className={styles.venueInfo}>{content.weddingEvents.venue}</p>
          <p className={styles.venueAddress}>{content.weddingEvents.address}</p>
        </a>
        <div className={styles.divider} />
      </ScrollReveal>

      <div className={`section-inner ${styles.grid}`}>
        {content.weddingEvents.events.map((event, i) => (
          <ScrollReveal key={event.name} delay={i * 0.08}>
            <div className={styles.card}>
              <span className={styles.icon}>{icons[event.iconKey || event.name]}</span>
              <h3 className={styles.name}>{event.name}</h3>
              <div className={styles.meta}>
                <p>{event.date}</p>
                <p>{event.time}</p>
              </div>
              <p className={styles.desc}>{event.description}</p>
              {event.dressCode && (
                <p className={styles.dress}>
                  <span>{content.ui.dressCode}:</span> {event.dressCode}
                </p>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './WeddingEvents.module.css';

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
              <span className={styles.icon}>{event.icon}</span>
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

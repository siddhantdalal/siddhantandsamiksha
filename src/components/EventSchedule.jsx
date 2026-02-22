import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './EventSchedule.module.css';

export default function EventSchedule() {
  return (
    <section className="section">
      <ScrollReveal>
        <h2 className="section-heading">{content.eventSchedule.heading}</h2>
        <p className="section-subheading">{content.eventSchedule.subheading}</p>
      </ScrollReveal>

      <div className={styles.schedule}>
        {content.eventSchedule.schedule.map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.06}>
            <div className={styles.item}>
              <span className={styles.icon}>{item.icon}</span>
              <div className={styles.info}>
                <span className={styles.time}>{item.time}</span>
                <span className={styles.event}>{item.event}</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

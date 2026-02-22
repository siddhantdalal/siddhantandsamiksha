import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './Timeline.module.css';

export default function Timeline() {
  return (
    <section className="section">
      <ScrollReveal>
        <h2 className="section-heading">{content.timeline.heading}</h2>
        <p className="section-subheading">{content.timeline.subheading}</p>
      </ScrollReveal>

      <div className={styles.timeline}>
        <div className={styles.line} />
        {content.timeline.events.map((event, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className={`${styles.item} ${i % 2 === 0 ? styles.left : styles.right}`}>
              <div className={styles.dot} />
              <div className={styles.card}>
                <h3 className={styles.title}>{event.title}</h3>
                <p className={styles.desc}>{event.description}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

import { content } from '../data/content';
import { useSide } from '../context/SideContext';
import ScrollReveal from './ScrollReveal';
import { MapPinIcon, CalendarIcon, ClockIcon } from './Icons';
import styles from './Reception.module.css';

export default function Reception() {
  const { side } = useSide();
  const info = side === 'bride' ? content.reception.bride : content.reception.groom;

  return (
    <section className="section">
      <ScrollReveal>
        <h2 className="section-heading">{content.reception.heading}</h2>
        <p className="section-subheading">{content.reception.subheading}</p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <span className={styles.cityBadge}>{info.city}</span>
            <p className={styles.description}>{info.description}</p>

            <div className={styles.details}>
              <div className={styles.detail}>
                <span className={styles.icon}><MapPinIcon size={22} /></span>
                <div>
                  <h4 className={styles.label}>Venue</h4>
                  <p className={styles.value}>{info.venue}</p>
                </div>
              </div>

              <div className={styles.detail}>
                <span className={styles.icon}><CalendarIcon size={22} /></span>
                <div>
                  <h4 className={styles.label}>Date</h4>
                  <p className={styles.value}>{info.date}</p>
                </div>
              </div>

              <div className={styles.detail}>
                <span className={styles.icon}><ClockIcon size={22} /></span>
                <div>
                  <h4 className={styles.label}>Time</h4>
                  <p className={styles.value}>{info.time}</p>
                </div>
              </div>


            </div>

            <p className={styles.note}>
              You're seeing details for the <strong>{info.city}</strong> reception based on your side selection.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

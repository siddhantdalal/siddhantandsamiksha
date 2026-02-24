import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
import { CalendarIcon, ClockIcon, MapPinIcon } from './Icons';
import styles from './EngagementDetails.module.css';

export default function EngagementDetails() {
  const { engagement } = content;

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
            {['Days', 'Hours', 'Minutes', 'Seconds'].map((label) => (
              <div key={label} className={styles.countUnit}>
                <span className={styles.countValue}>--</span>
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

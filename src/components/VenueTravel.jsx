import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './VenueTravel.module.css';

export default function VenueTravel() {
  const { venue, hotels, travel } = content.venueTravel;

  return (
    <section id="travel" className="section">
      <ScrollReveal>
        <h2 className="section-heading">{content.venueTravel.heading}</h2>
        <p className="section-subheading">{content.venueTravel.subheading}</p>
      </ScrollReveal>

      <div className="section-inner">
        <div className={styles.grid}>
          {/* Venue */}
          <ScrollReveal>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Venue</h3>
              <p className={styles.venueName}>{venue.name}</p>
              <p className={styles.address}>{venue.address}</p>
              {venue.mapEmbed && (
                <div className={styles.map}>
                  <iframe
                    src={venue.mapEmbed}
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Wedding venue location"
                  />
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Travel */}
          <ScrollReveal delay={0.1}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Getting Here</h3>
              <div className={styles.travelList}>
                <div className={styles.travelItem}>
                  <span className={styles.travelIcon}>✈️</span>
                  <p>{travel.airport}</p>
                </div>
                <div className={styles.travelItem}>
                  <span className={styles.travelIcon}>🚂</span>
                  <p>{travel.railway}</p>
                </div>
                <div className={styles.travelItem}>
                  <span className={styles.travelIcon}>🅿️</span>
                  <p>{travel.parking}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import content from '../data/content';
import { useSide } from '../context/SideContext';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';
import EventPanel, { EventBands } from './EventPanel';
import InviteLightbox from './InviteLightbox';
import { MapPinIcon, CalendarIcon, ClockIcon } from './Icons';
import styles from './Reception.module.css';

export default function Reception() {
  const { side } = useSide();
  const [invite, setInvite] = useState(null);
  const { groom, bride } = content.reception;
  const isBride = side === 'bride';

  return (
    <section className="section">
      <ScrollReveal>
        <SectionHeading>{content.reception.heading}</SectionHeading>
        <p className="section-subheading">{(isBride ? bride : groom).subheading}</p>
      </ScrollReveal>

      {/* Nagpur's reception has its invite; Kolhapur's details are still to come */}
      {isBride ? (
        <ScrollReveal delay={0.1}>
          <KolhapurCard info={bride} />
        </ScrollReveal>
      ) : (
        <EventBands>
          <EventPanel event={groom} side="groom" onViewInvite={setInvite} />
        </EventBands>
      )}

      <InviteLightbox invite={invite} onClose={() => setInvite(null)} />
    </section>
  );
}

function KolhapurCard({ info }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <span className={styles.cityBadge}>{info.city}</span>
        <p className={styles.description}>{info.description}</p>

        <div className={styles.details}>
          <div className={styles.detail}>
            <span className={styles.icon}><MapPinIcon size={22} /></span>
            <div>
              <h4 className={styles.label}>{content.ui.venueLabel}</h4>
              <p className={styles.value}>{info.venue}</p>
            </div>
          </div>

          <div className={styles.detail}>
            <span className={styles.icon}><CalendarIcon size={22} /></span>
            <div>
              <h4 className={styles.label}>{content.ui.dateLabel}</h4>
              <p className={styles.value}>{info.date}</p>
            </div>
          </div>

          <div className={styles.detail}>
            <span className={styles.icon}><ClockIcon size={22} /></span>
            <div>
              <h4 className={styles.label}>{content.ui.timeLabel}</h4>
              <p className={styles.value}>{info.time}</p>
            </div>
          </div>
        </div>

        <p className={styles.note}>{info.note}</p>
      </div>
    </div>
  );
}

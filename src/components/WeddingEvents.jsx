import { useState } from 'react';
import content from '../data/content';
import { useSide } from '../context/SideContext';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';
import EventPanel, { forSide } from './EventPanel';
import InviteLightbox from './InviteLightbox';
import styles from './WeddingEvents.module.css';

// Each celebration gets its own panel, dressed like that side's printed invite
export default function WeddingEvents() {
  const { side } = useSide();
  const [invite, setInvite] = useState(null);
  const { heading, subheading, events } = content.weddingEvents;

  if (!side) return <section id="events" className="section" />;

  return (
    <section id="events" className="section">
      <ScrollReveal>
        <SectionHeading>{heading}</SectionHeading>
        <p className="section-subheading">{subheading}</p>
      </ScrollReveal>

      <div className={styles.panels}>
        {events.map((event) => (
          <EventPanel key={`${side}-${event.id}`} event={forSide(event, side)} side={side} onViewInvite={setInvite} />
        ))}
      </div>

      <InviteLightbox invite={invite} onClose={() => setInvite(null)} />
    </section>
  );
}

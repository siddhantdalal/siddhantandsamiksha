import { useState } from 'react';
import content from '../data/content';
import { useSide } from '../context/SideContext';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';
import InviteLightbox from './InviteLightbox';
import styles from './InviteGallery.module.css';

// The current side's printed invitations in a row that scrolls sideways on phones
export default function InviteGallery() {
  const { side } = useSide();
  const [open, setOpen] = useState(null);
  const { heading, subheading } = content.invitations;
  const invites = side ? content.invitations[side] : [];

  if (!invites.length) return null;

  return (
    <section id="invitations" className="section">
      <ScrollReveal>
        <SectionHeading>{heading}</SectionHeading>
        <p className="section-subheading">{subheading}</p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <ul className={styles.row}>
          {invites.map((invite) => (
            <li key={invite.src} className={styles.item}>
              <button type="button" className={styles.card} onClick={() => setOpen(invite)} aria-label={`View the ${invite.title} invitation`}>
                <img className={styles.thumb} src={invite.thumb} alt={invite.alt} loading="lazy" decoding="async" width="440" height="782" />
                <span className={styles.title}>{invite.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </ScrollReveal>

      <InviteLightbox invite={open} onClose={() => setOpen(null)} />
    </section>
  );
}

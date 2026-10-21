import content from '../data/content';
import ScrollReveal from './ScrollReveal';
import LocationQR from './LocationQR';
import EventDecor from './EventDecor';
import { Footprints, Marigold } from './Motifs';
import styles from './EventPanel.module.css';

// Each theme sets its title the way its invite does
function Title({ theme, event, id }) {
  if (theme === 'bride-mehendi') {
    return (
      <h3 id={id} className={styles.poem} aria-label={event.title}>
        <span className={styles.love}>
          L<span className={styles.mandalaO} />ve,
        </span>
        <span className={styles.joiner}>written in</span>
        <span className={styles.henna}>Henna</span>
      </h3>
    );
  }
  if (theme === 'bride-haldi') {
    return (
      <h3 id={id} className={styles.poem} aria-label={event.title}>
        <span className={styles.poemLine}>
          <span className={styles.lead}>The</span>
          <span className={styles.glow}>
            Gl<span className={styles.sunO}><Marigold size={64} /></span>w
          </span>
        </span>
        <span className={styles.joiner}>before the</span>
        <span className={styles.vows}>Vows</span>
      </h3>
    );
  }
  if (theme === 'bride-sangeet') {
    return (
      <>
        <h3 id={id} className={styles.poem} aria-label={event.title}>
          <span className={styles.poemLine}>
            <span className={styles.lead}>The</span>
            <span className={styles.dance}>Dance</span>
          </span>
          <span className={styles.joiner}>before the</span>
          <span className={styles.steps}>Seven Steps</span>
        </h3>
        <Footprints className={styles.footprints} />
      </>
    );
  }
  if (theme === 'bride-lagna') {
    return (
      <>
        <h3 id={id} className={styles.poem} aria-label={event.title}>
          <span className={styles.stepsGold}>Seven Steps</span>
          <span className={styles.joiner}>to</span>
          <span className={styles.forever}>Forever</span>
        </h3>
        <Footprints pairs className={styles.footprintPairs} />
      </>
    );
  }
  return (
    <>
      <h3 id={id} className={styles.script}>{event.name}</h3>
      <span className={styles.flourish} aria-hidden="true" />
    </>
  );
}

function When({ event, trio }) {
  if (trio) {
    const [dayOfMonth, ...monthYear] = event.date.split(' ');
    return (
      <div className={styles.trio}>
        <div className={styles.trioRow}>
          <span className={styles.trioSide}>{event.day}</span>
          <span className={styles.trioDate}>{dayOfMonth}</span>
          <span className={styles.trioSide}>{event.time}</span>
        </div>
        <p className={styles.trioMonth}>{monthYear.join(' ')}</p>
      </div>
    );
  }
  return (
    <div className={styles.when}>
      <p className={styles.weekday}>{event.day}</p>
      <p className={styles.date}>{event.date}</p>
      <p className={styles.time}>{event.time}</p>
    </div>
  );
}

// The couple as drawn on the invite, feathered into the card
function Art({ art }) {
  return (
    <img
      className={styles.art}
      src={art.src}
      alt={art.alt}
      width={art.width}
      height={art.height}
      loading="lazy"
      decoding="async"
    />
  );
}

const PinIcon = () => (
  <svg width="14" height="18" viewBox="0 0 10 13" fill="currentColor" aria-hidden="true">
    <path d="M5 0C2.2 0 0 2.2 0 4.9 0 8.6 5 13 5 13s5-4.4 5-8.1C10 2.2 7.8 0 5 0zm0 6.8a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8z" />
  </svg>
);

const InviteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

// One event, dressed as its invite. `event` is already resolved for the side;
// it wears its own family's design unless it names one for both sides.
export default function EventPanel({ event, side, onViewInvite }) {
  const design = event.design || side;
  const theme = `${design}-${event.id}`;
  const titleId = `event-${theme}`;
  const { venue, invite, art } = event;
  const { ui } = content;
  const place = venue.name || 'the venue';
  const isBride = design === 'bride';

  return (
    // The card rests on a full-width band in a deeper tone of its own theme
    <div className={`${styles.band} ev-${theme}`}>
      <ScrollReveal>
        <article className={styles.panel} aria-labelledby={titleId}>
          <EventDecor theme={theme} />

          <div className={styles.body}>
            {event.kicker && !isBride && <p className={styles.kicker} lang="mr">{event.kicker}</p>}
            {isBride && event.title && <p className={styles.label}>{event.name}</p>}
            <Title theme={theme} event={event} id={titleId} />
            {event.tagline && <p className={styles.tagline}>{event.tagline}</p>}
            {art && <Art art={art} />}

            <When event={event} trio={isBride} />
            <p className={styles.description}>{event.description}</p>

            <div className={styles.venueRow}>
              <div className={styles.venue}>
                {venue.name && <p className={styles.venueName}>{venue.name}</p>}
                <p className={styles.address}>{venue.address}</p>
              </div>
              {venue.mapLink && <LocationQR url={venue.mapLink} place={place} />}
            </div>

            <div className={styles.actions}>
              {venue.mapLink && (
                <a
                  className={styles.primary}
                  href={venue.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${ui.getDirections} to ${place}`}
                >
                  <PinIcon />
                  {ui.getDirections}
                </a>
              )}
              {invite && (
                <button
                  type="button"
                  className={styles.secondary}
                  onClick={() => onViewInvite(invite)}
                  aria-label={`${ui.viewInvite}: ${invite.title}`}
                >
                  <InviteIcon />
                  {ui.viewInvite}
                </button>
              )}
            </div>

            {event.note && <p className={styles.note}>{event.note}</p>}
          </div>
        </article>
      </ScrollReveal>
    </div>
  );
}

// Holds one or more panels so their bands blend beneath the cards
export function EventBands({ children }) {
  return <div className={styles.bands}>{children}</div>;
}

// Merge an event's shared details with those for the chosen side
// eslint-disable-next-line react-refresh/only-export-components
export function forSide(event, side) {
  const { groom, bride, ...shared } = event;
  return { ...shared, ...(side === 'bride' ? bride : groom) };
}

import content from '../data/content';
import Medallion from './Medallion';
import LocationQR from './LocationQR';
import EventDecor, { EventScene } from './EventDecor';
import { Footprints, Marigold, Paisleys } from './Motifs';
import styles from './EventPanel.module.css';

// Garland worn by the medallion on each bride's-side card
const CREST_RING = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2 - Math.PI / 2;
  return [+(Math.cos(a) * 49).toFixed(1), +(Math.sin(a) * 49).toFixed(1)];
});
const CREST_BEADS = {
  'bride-mehendi': () => null,
  'bride-haldi': (i) => `#mf-marigold-${i % 2 ? 'yellow' : 'orange'}`,
  'bride-sangeet': (i) => (i % 2 ? '#mf-rose-pink' : null),
  'bride-lagna': (i) => (i % 2 ? '#mf-marigold-pink' : null),
};

function Crest({ theme }) {
  const bead = CREST_BEADS[theme];
  if (!bead) return null;
  return (
    <div className={styles.crest}>
      <svg className={styles.crestRing} viewBox="-62 -62 124 124" aria-hidden="true">
        {theme === 'bride-mehendi' && (
          <g fill="none" stroke="#d6ad60" strokeWidth="0.8">
            <circle r="56" strokeDasharray="1 3" />
            <circle r="44" />
            {CREST_RING.map(([x, y], i) => (
              <ellipse key={i} cx={x * 1.02} cy={y * 1.02} rx="6" ry="3" transform={`rotate(${i * 22.5 + 90} ${x * 1.02} ${y * 1.02})`} />
            ))}
          </g>
        )}
        {theme !== 'bride-mehendi' && CREST_RING.map(([x, y], i) => {
          const href = bead(i);
          return href
            ? <use key={i} href={href} transform={`translate(${x} ${y}) scale(0.7)`} />
            : <circle key={i} cx={x} cy={y} r={theme === 'bride-sangeet' ? 2.6 : 3.2} fill={theme === 'bride-sangeet' ? '#fff1c4' : '#fbf6ec'} stroke="#e2d4bd" strokeWidth="0.5" />;
        })}
      </svg>
      <Medallion size={66} sunburst={false} alt="" />
    </div>
  );
}

// Each theme sets its title the way its invite does
function Title({ theme, event, id }) {
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
      {theme === 'bride-mehendi' || theme === 'groom-mehendi'
        ? <Paisleys className={styles.paisleys} />
        : <span className={styles.flourish} aria-hidden="true" />}
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

// One event, dressed as its invite. `event` is already resolved for the side.
export default function EventPanel({ event, side, onViewInvite }) {
  const theme = `${side}-${event.id}`;
  const titleId = `event-${theme}`;
  const { venue, invite } = event;
  const { ui } = content;
  const place = venue.name || 'the venue';
  const isBride = side === 'bride';

  return (
    <article className={`${styles.panel} ev-${theme}`} aria-labelledby={titleId}>
      <EventDecor theme={theme} />

      <div className={styles.body}>
        {isBride && <Crest theme={theme} />}
        <EventScene theme={theme} />

        {event.kicker && !isBride && <p className={styles.kicker} lang="mr">{event.kicker}</p>}
        {isBride && event.title && <p className={styles.label}>{event.name}</p>}
        <Title theme={theme} event={event} id={titleId} />
        {event.tagline && <p className={styles.tagline}>{event.tagline}</p>}

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
  );
}

// Merge an event's shared details with those for the chosen side
// eslint-disable-next-line react-refresh/only-export-components
export function forSide(event, side) {
  const { groom, bride, ...shared } = event;
  return { ...shared, ...(side === 'bride' ? bride : groom) };
}

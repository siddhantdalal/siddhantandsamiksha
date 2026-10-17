import { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useContent } from '../context/LanguageContext';
import { useSide } from '../context/SideContext';
import { useMediaQuery } from '../hooks/useMediaQuery';
import ScrollReveal from './ScrollReveal';
import styles from './WeddingEvents.module.css';

// Cards only pile up where a stuck card fits fully on screen; on shorter screens
// its lower half would be hidden until the next card covered it. Must match the
// media query on .stack in the CSS.
const STACK_QUERY = '(min-height: 700px)';

const BURIED_SCALE_STEP = 0.05; // how much smaller each card underneath gets
const BURIED_TILT = 6; // degrees a buried card leans back into the pile
const BURIED_SHADE = 0.45; // darkening of a fully buried card

const icons = {
  Mehendi: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      {/* Henna paisley spiralling inward */}
      <path d="M14.2 3.6 C18.6 5.3 20.6 10 19 14.3 C17.5 18.3 13.3 20.5 9.3 19.4 C6.1 18.5 4.2 15.6 4.9 12.8 C5.5 10.4 7.8 8.9 10.1 9.5 C11.9 10 13 11.8 12.5 13.5 C12.1 14.8 10.8 15.6 9.6 15.2" />
      {/* Inner curl tip */}
      <circle cx="9.9" cy="13" r="0.7" fill="currentColor" stroke="none" />
      {/* Henna dots tracing the outer curve */}
      <circle cx="16.9" cy="4.9" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="20" cy="8.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="20.6" cy="12.6" r="0.75" fill="currentColor" stroke="none" />
      {/* Leaf accents */}
      <path d="M11.7 3.9 C10.4 3.3 8.9 3.4 7.8 4.2 C8.9 5 10.4 5.1 11.7 4.5z" fill="currentColor" stroke="none" opacity="0.85" />
      <path d="M8.6 5.4 C7.3 5.2 6 5.8 5.3 6.9 C6.6 7.2 7.9 6.8 8.8 5.9z" fill="currentColor" stroke="none" opacity="0.85" />
    </svg>
  ),
  Haldi: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      {/* Turmeric mound */}
      <path d="M7.2 11.5 C7.2 8.2 9.3 6.3 12 6.3 C14.7 6.3 16.8 8.2 16.8 11.5z" fill="currentColor" stroke="none" />
      {/* Bowl with foot */}
      <path d="M5 11.5 L19 11.5 C19 16 16.2 18.2 12 18.2 C7.8 18.2 5 16 5 11.5z" />
      <path d="M9.8 18.4 L9.3 20.4 L14.7 20.4 L14.2 18.4" />
      {/* Auspicious sparkles */}
      <path d="M12 2.8 v1.6 M11.2 3.6 h1.6" />
      <path d="M6.2 4.4 v1.3 M5.55 5.05 h1.3" />
      <path d="M17.8 4.4 v1.3 M17.15 5.05 h1.3" />
    </svg>
  ),
  Sangeet: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      {/* Dhol body and heads */}
      <rect x="4.8" y="9.2" width="14.4" height="9.6" rx="3.2" />
      <path d="M8.2 9.2 v9.6 M15.8 9.2 v9.6" />
      {/* Cross lacing */}
      <path d="M8.2 10.6 L15.8 13.2 M15.8 10.6 L8.2 13.2 M8.2 14.8 L15.8 17.4 M15.8 14.8 L8.2 17.4" strokeWidth="0.8" opacity="0.75" />
      {/* Music notes */}
      <circle cx="8.2" cy="5.2" r="1.1" fill="currentColor" stroke="none" />
      <path d="M9.3 5.2 V2.7 C10.1 2.9 10.7 3.2 11.1 3.8" />
      <circle cx="14.6" cy="4.4" r="0.95" fill="currentColor" stroke="none" />
      <path d="M15.55 4.4 V2.3 C16.2 2.45 16.7 2.7 17.1 3.2" />
    </svg>
  ),
  Wedding: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      {/* Coconut with tuft */}
      <circle cx="12" cy="6.4" r="2.2" />
      <path d="M11.2 4.4 C11.4 3.8 12.6 3.8 12.8 4.4" strokeWidth="1" />
      {/* Mango leaves */}
      <path d="M9.7 8.5 C8.1 8.3 6.8 7.3 6.2 5.7 C7.9 5.8 9.2 6.8 9.9 8.3z" fill="currentColor" stroke="none" opacity="0.9" />
      <path d="M14.3 8.5 C15.9 8.3 17.2 7.3 17.8 5.7 C16.1 5.8 14.8 6.8 14.1 8.3z" fill="currentColor" stroke="none" opacity="0.9" />
      {/* Kalash rim, body and base */}
      <path d="M8.5 9 h7" />
      <path d="M9.4 9 C9.4 10 9 10.7 8.3 11.3 C6.9 12.1 6 13.5 6 15 C6 17.8 8.7 19.8 12 19.8 C15.3 19.8 18 17.8 18 15 C18 13.5 17.1 12.1 15.7 11.3 C15 10.7 14.6 10 14.6 9" />
      <path d="M12 12.6 L13.3 14.2 L12 15.8 L10.7 14.2z" fill="currentColor" stroke="none" />
      <path d="M9.6 21.2 h4.8" />
    </svg>
  ),
};

// One card in the scroll stack. Each sticks a little lower than the one before,
// and as later cards slide over it, it shrinks, leans back and darkens, like
// invitation cards being dealt onto a pile.
function StackedCard({ index, count, progress, stacked, children }) {
  const reduceMotion = useReducedMotion();
  const buriedBy = count - 1 - index; // how many cards end up on top of this one
  const range = [index / count, 1];
  const scale = useTransform(progress, range, [1, 1 - buriedBy * BURIED_SCALE_STEP]);
  const rotateX = useTransform(progress, range, [0, buriedBy ? -BURIED_TILT : 0]);
  const shade = useTransform(progress, range, [0, buriedBy ? BURIED_SHADE : 0]);

  // Short screens get the plain list. Its fade-in wrapper would break sticky
  // positioning, which is why it's only used when not stacking.
  if (!stacked) {
    return (
      <ScrollReveal className={styles.stackItem} delay={index * 0.08}>
        {children}
      </ScrollReveal>
    );
  }

  const depth = !reduceMotion;
  return (
    <div className={styles.stackItem} style={{ '--stack-index': index }}>
      <motion.div
        className={styles.stackCard}
        style={depth ? { scale, rotateX, transformPerspective: 1200 } : undefined}
      >
        {children}
        {depth && <motion.span className={styles.stackShade} style={{ opacity: shade }} aria-hidden="true" />}
      </motion.div>
    </div>
  );
}

export default function WeddingEvents() {
  const content = useContent();
  const { side } = useSide();
  const stacked = useMediaQuery(STACK_QUERY);
  const stackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });

  const { mehendiGroom, mehendiBride, events } = content.weddingEvents;
  const isBride = side === 'bride';
  // Bride's mehendi happens at Suvi Palace, so it joins the venue grid;
  // the groom's is at his residence and gets its own card above the venue
  const gridEvents = isBride ? [mehendiBride, ...events] : events;

  return (
    <section id="events" className="section">
      <ScrollReveal>
        <h2 className="section-heading">{content.weddingEvents.heading}</h2>
        <p className="section-subheading">{content.weddingEvents.subheading}</p>
      </ScrollReveal>

      {!isBride && (
        <ScrollReveal>
          <div className={styles.soloWrap}>
            <div className={styles.card}>
              <span className={styles.icon}>{icons[mehendiGroom.iconKey]}</span>
              <h3 className={styles.name}>{mehendiGroom.name}</h3>
              <div className={styles.meta}>
                <p>{mehendiGroom.date}</p>
                {mehendiGroom.time && <p>{mehendiGroom.time}</p>}
              </div>
              <p className={styles.desc}>{mehendiGroom.description}</p>
              <a
                href={mehendiGroom.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.soloVenueLink}
              >
                <p className={styles.soloAddress}>{mehendiGroom.address}</p>
              </a>
            </div>
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <a
          href={content.weddingEvents.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <p className={styles.venueInfo}>{content.weddingEvents.venue}</p>
          <p className={styles.venueAddress}>{content.weddingEvents.address}</p>
        </a>
        <div className={styles.divider} />
      </ScrollReveal>

      {/* Cards must be direct children of the stack so position: sticky works */}
      <div ref={stackRef} className={styles.stack}>
        {gridEvents.map((event, i) => (
          <StackedCard key={event.name} index={i} count={gridEvents.length} progress={scrollYProgress} stacked={stacked}>
            <div className={styles.card}>
              <span className={styles.icon}>{icons[event.iconKey || event.name]}</span>
              <h3 className={styles.name}>{event.name}</h3>
              <div className={styles.meta}>
                <p>{event.date}</p>
                <p>{event.time}</p>
              </div>
              <p className={styles.desc}>{event.description}</p>
              {event.dressCode && (
                <p className={styles.dress}>
                  <span>{content.ui.dressCode}:</span> {event.dressCode}
                </p>
              )}
            </div>
          </StackedCard>
        ))}
      </div>
    </section>
  );
}

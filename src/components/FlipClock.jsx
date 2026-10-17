import { useState } from 'react';
import styles from './FlipClock.module.css';

const pad = (n) => String(n).padStart(2, '0');

function Half({ position, text, className = '' }) {
  return (
    <span className={`${styles.half} ${styles[position]} ${className}`}>
      <span className={styles.digits}>{text}</span>
    </span>
  );
}

// A split-flap card. When the value changes, the top half of the old number
// falls forward to uncover the new one, then the new bottom half drops into place.
function FlipCard({ value }) {
  // Remember the previous value across renders (React's derived-state pattern)
  const [shown, setShown] = useState({ current: value, previous: value });
  if (shown.current !== value) setShown({ current: value, previous: shown.current });

  const current = pad(shown.current);
  const previous = pad(shown.previous);
  const changed = current !== previous;

  return (
    <span className={styles.card} style={{ '--chars': current.length }} aria-hidden="true">
      <Half position="top" text={current} />
      <Half position="bottom" text={previous} />
      {/* Keyed by value so each change remounts the flaps and replays the flip */}
      {changed && <Half key={`out-${current}`} position="top" text={previous} className={styles.flapOut} />}
      {changed && <Half key={`in-${current}`} position="bottom" text={current} className={styles.flapIn} />}
    </span>
  );
}

// units: [{ value, label }]. Size comes from --flip-size set by the parent's class.
export default function FlipClock({ units, className = '' }) {
  return (
    <div className={`${styles.clock} ${className}`}>
      {units.map(({ value, label }) => (
        <div key={label} className={styles.unit}>
          <FlipCard value={value} />
          <span className={styles.srOnly}>{pad(value)}</span>
          <span className={styles.label}>{label}</span>
        </div>
      ))}
    </div>
  );
}

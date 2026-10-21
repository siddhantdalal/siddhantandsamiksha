import { useMemo, useState } from 'react';
import { generate, correction } from 'lean-qr';
import content from '../data/content';
import styles from './LocationQR.module.css';

const QUIET = 2; // modules of margin; the card's padding adds the rest
const MODULE_PX = 2.4; // keeps dense codes (long links) large enough to scan
const FRAME_PX = 17; // the card's padding and border

// A QR code for the venue's map link, drawn as one SVG path in the panel's colour.
// A click enlarges it in place for easier scanning; another click shrinks it back.
export default function LocationQR({ url, place }) {
  const [enlarged, setEnlarged] = useState(false);
  const { size, path } = useMemo(() => {
    const code = generate(url, { minCorrectionLevel: correction.M });
    let d = '';
    for (let y = 0; y < code.size; y++) {
      for (let x = 0; x < code.size; x++) {
        if (code.get(x, y)) d += `M${x} ${y}h1v1h-1z`;
      }
    }
    return { size: code.size, path: d };
  }, [url]);

  return (
    <figure className={`${styles.card} ${enlarged ? styles.enlarged : ''}`}>
      <button
        type="button"
        className={styles.zoom}
        aria-pressed={enlarged}
        aria-label={`Enlarge the QR code for the map location of ${place}`}
        onClick={() => setEnlarged((on) => !on)}
      >
        <svg
          className={styles.code}
          viewBox={`${-QUIET} ${-QUIET} ${size + QUIET * 2} ${size + QUIET * 2}`}
          style={{ width: Math.max(112, (size + QUIET * 2) * MODULE_PX + FRAME_PX) }}
          shapeRendering="crispEdges"
          aria-hidden="true"
        >
          <path d={path} />
        </svg>
      </button>
      <figcaption className={styles.caption}>
        <svg width="10" height="13" viewBox="0 0 10 13" aria-hidden="true">
          <path d="M5 0C2.2 0 0 2.2 0 4.9 0 8.6 5 13 5 13s5-4.4 5-8.1C10 2.2 7.8 0 5 0zm0 6.8a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8z" />
        </svg>
        {content.ui.scanForLocation}
      </figcaption>
    </figure>
  );
}

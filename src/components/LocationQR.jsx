import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { generate, correction } from 'lean-qr';
import { AnimatePresence, useAnimate, usePresence, useReducedMotion } from 'framer-motion';
import content from '../data/content';
import styles from './LocationQR.module.css';

const QUIET = 2; // modules of margin; the card's padding adds the rest
const MODULE_PX = 2.4; // keeps dense codes (long links) large enough to scan
const FRAME_PX = 17; // the card's padding and border
const FLIGHT = { duration: 0.5, ease: [0.16, 1, 0.3, 1] };
const FADE = { duration: 0.3 };

function Code({ size, path, ...props }) {
  return (
    <svg
      viewBox={`${-QUIET} ${-QUIET} ${size + QUIET * 2} ${size + QUIET * 2}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      {...props}
    >
      <path d={path} />
    </svg>
  );
}

// A QR code for the venue's map link, drawn as one SVG path in the panel's colour.
// A click lifts it off the card to fill the screen over the blurred page.
export default function LocationQR({ url, place }) {
  // Off the card the code can't inherit the panel's ink, so it takes it along
  const [ink, setInk] = useState(null);
  // The small code stays hidden from lift-off until the large one lands back on it
  const [away, setAway] = useState(false);
  const codeRef = useRef(null);
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

  const enlarge = () => {
    setInk(getComputedStyle(codeRef.current).fill);
    setAway(true);
  };

  return (
    <figure className={styles.card}>
      <button
        type="button"
        className={styles.zoom}
        aria-haspopup="dialog"
        aria-label={`Enlarge the QR code for the map location of ${place}`}
        onClick={enlarge}
      >
        <Code
          ref={codeRef}
          size={size}
          path={path}
          className={styles.code}
          style={{ width: Math.max(112, (size + QUIET * 2) * MODULE_PX + FRAME_PX), visibility: away ? 'hidden' : undefined }}
        />
      </button>
      <figcaption className={styles.caption}>
        <PinIcon />
        {content.ui.scanForLocation}
      </figcaption>
      {createPortal(
        <AnimatePresence onExitComplete={() => setAway(false)}>
          {ink && (
            <EnlargedQR origin={codeRef} place={place} onClose={() => setInk(null)}>
              <Code size={size} path={path} style={{ fill: ink }} />
            </EnlargedQR>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </figure>
  );
}

// The code at the size of the screen over the blurred page, flown out from its
// place on the card and back. A tap anywhere or Escape closes it; the page
// beneath holds still, and focus stays on the code until it's back.
function EnlargedQR({ origin, place, onClose, children }) {
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();
  const reduceMotion = useReducedMotion();
  const backdropRef = useRef(null);
  const tileRef = useRef(null);
  const labelRef = useRef(null);
  // Read through a ref so a new onClose from the parent doesn't re-run the focus effect
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Runs before the first paint, so the large code is never seen anywhere but over the small one
  useLayoutEffect(() => {
    const [backdrop, tile, label] = [backdropRef.current, tileRef.current, labelRef.current];
    // The offset and scale that lay the large code over the small one. The
    // overlay is the tile's offset parent and fills the viewport, so its
    // offsets are a viewport box that leaves out the transform mid-flight.
    const overOrigin = () => {
      const from = origin.current.getBoundingClientRect();
      return {
        x: from.left + from.width / 2 - (tile.offsetLeft + tile.offsetWidth / 2),
        y: from.top + from.height / 2 - (tile.offsetTop + tile.offsetHeight / 2),
        scale: from.width / tile.offsetWidth,
      };
    };

    if (isPresent) {
      const { x, y, scale } = overOrigin();
      animate(backdrop, { opacity: [0, 1] }, FADE);
      animate(label, { opacity: [0, 1] }, { ...FADE, delay: 0.25 });
      if (reduceMotion) animate(tile, { opacity: [0, 1] }, FADE);
      else animate(tile, { x: [x, 0], y: [y, 0], scale: [scale, 1] }, FLIGHT);
      return;
    }
    Promise.all([
      animate(backdrop, { opacity: 0 }, FADE),
      animate(label, { opacity: 0 }, { duration: 0.15 }),
      reduceMotion ? animate(tile, { opacity: 0 }, FADE) : animate(tile, overOrigin(), FLIGHT),
    ]).then(safeToRemove);
  }, [isPresent, animate, origin, reduceMotion, safeToRemove]);

  useEffect(() => {
    if (!isPresent) return undefined;
    const overlay = scope.current;
    const opener = document.activeElement;
    tileRef.current.focus({ preventScroll: true });

    const onKey = (e) => {
      if (e.key === 'Escape') onCloseRef.current();
      // the code is the only control, so Tab keeps focus on it
      else if (e.key === 'Tab') e.preventDefault();
    };
    // Lenis leaves the overlay to the browser (data-lenis-prevent), which is told not to scroll
    const hold = (e) => e.preventDefault();
    document.addEventListener('keydown', onKey);
    overlay.addEventListener('wheel', hold, { passive: false });
    overlay.addEventListener('touchmove', hold, { passive: false });
    return () => {
      document.removeEventListener('keydown', onKey);
      overlay.removeEventListener('wheel', hold);
      overlay.removeEventListener('touchmove', hold);
      opener?.focus?.({ preventScroll: true });
    };
  }, [isPresent, scope]);

  return (
    <div
      ref={scope}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`QR code for the map location of ${place}`}
      onClick={onClose}
      data-lenis-prevent
    >
      <div ref={backdropRef} className={styles.backdrop} />
      <button ref={tileRef} type="button" className={styles.large} aria-label={content.ui.closeQr}>
        {children}
      </button>
      <p ref={labelRef} className={styles.label}>
        <span className={styles.place}>{place}</span>
        <span className={styles.hint}>
          <PinIcon />
          {content.ui.scanForLocation}
        </span>
        <span className={styles.closeHint}>{content.ui.tapToClose}</span>
      </p>
    </div>
  );
}

function PinIcon() {
  return (
    <svg width="10" height="13" viewBox="0 0 10 13" aria-hidden="true">
      <path d="M5 0C2.2 0 0 2.2 0 4.9 0 8.6 5 13 5 13s5-4.4 5-8.1C10 2.2 7.8 0 5 0zm0 6.8a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8z" />
    </svg>
  );
}

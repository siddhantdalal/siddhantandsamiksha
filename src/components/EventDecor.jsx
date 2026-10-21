import { Band, Firework, Kalash, Note } from './Motifs';
import styles from './EventDecor.module.css';

// Deterministic scatter, so decorations sit in the same place on every render
function scatter(count, seed) {
  let s = seed;
  const next = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: count }, () => [next(), next(), next()]);
}

const CONFETTI_COLORS = ['#f07aa3', '#e3b866', '#f6dca0', '#5fb3a6', '#ffffff'];
// Kept to the outer edges so it never sits behind the text
const CONFETTI = scatter(34, 7).map(([x, y, r], i) => ({
  left: `${(x < 0.5 ? x * 40 : 80 + (x - 0.5) * 40).toFixed(1)}%`,
  top: `${(18 + y * 78).toFixed(1)}%`,
  transform: `rotate(${Math.round(r * 180)}deg)`,
  background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  width: i % 3 ? 6 : 3,
}));

const PETALS = scatter(16, 11).map(([x, y, r], i) => ({
  left: `${(x * 100).toFixed(1)}%`,
  top: `${(62 + y * 30).toFixed(1)}%`,
  transform: `rotate(${Math.round(r * 360)}deg)`,
  background: i % 2 ? '#f6b40e' : '#ea7a17',
}));

function Confetti() {
  return CONFETTI.map((style, i) => <span key={i} className={styles.confetti} style={style} />);
}

function Petals() {
  return PETALS.map((style, i) => <span key={i} className={styles.petal} style={style} />);
}

// A fairy-light swag along the top edge of a card
function LightSwag({ className }) {
  const bulbs = [];
  for (let swag = 0; swag < 4; swag++) {
    for (let k = 0; k <= 10; k++) {
      const t = k / 10;
      bulbs.push([swag * 250 + t * 250, 6 + Math.sin(t * Math.PI) * 26]);
    }
  }
  return (
    <svg className={className} viewBox="0 0 1000 44" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <path d="M0 6 Q125 58 250 6 Q375 58 500 6 Q625 58 750 6 Q875 58 1000 6" fill="none" stroke="rgba(214, 173, 96, 0.7)" strokeWidth="1" />
      {bulbs.map(([x, y], i) => (
        <g key={i} className={i % 3 ? '' : styles.twinkle}>
          <circle cx={x} cy={y} r="7" fill="url(#gr-glow)" />
          <circle cx={x} cy={y} r="2.6" fill="#fff1c4" />
        </g>
      ))}
    </svg>
  );
}

// The toran from the printed invite — garland, medallion and hanging strings —
// with a clear window in the middle for the card's own title
function InviteToran({ name }) {
  return (
    <img
      className={styles.inviteToran}
      src={`${import.meta.env.BASE_URL}images/torans/${name}.webp`}
      alt=""
      width="1440"
      height="693"
      decoding="async"
    />
  );
}

function Frame({ variant }) {
  return <span className={`${styles.frame} ${styles[variant] || ''}`} />;
}

const DECOR = {
  'groom-mehendi': () => (
    <>
      <Frame variant="frameDouble" />
      <Band pattern="toran" height={46} className={styles.topBand} />
      <div className={styles.paithaniBase}><Band pattern="narali" height={12} /></div>
    </>
  ),

  // A Maharashtrian mandap: kalash on a carved beam, toran, gold pillars, Paithani base
  'groom-lagna': () => (
    <>
      <div className={styles.mandapTop}>
        <Kalash className={styles.kalash} />
        <span className={`${styles.finial} ${styles.finialLeft}`} />
        <span className={`${styles.finial} ${styles.finialRight}`} />
        <div className={styles.beam}><Band pattern="rosette" height={28} /></div>
        <Band pattern="toran" height={48} className={styles.toran} />
      </div>
      <span className={`${styles.pillar} ${styles.pillarLeft}`} />
      <span className={`${styles.pillar} ${styles.pillarRight}`} />
      <div className={styles.paithaniBase}><Band pattern="narali" height={12} /></div>
    </>
  ),

  'groom-reception': () => (
    <>
      <Frame variant="frameThin" />
      <LightSwag className={styles.lightSwag} />
      <Firework className={`${styles.twinkleSlow} ${styles.fireworkA}`} size={90} />
      <Firework className={`${styles.twinkleSlow} ${styles.fireworkB}`} size={64} />
    </>
  ),

  'bride-haldi': () => (
    <>
      <span className={styles.sunRays} />
      <Petals />
      <InviteToran name="haldi" />
      <Band pattern="swag" height={30} className={styles.bottomSwag} />
    </>
  ),

  'bride-sangeet': () => (
    <>
      <span className={`${styles.spot} ${styles.spotLeft}`} />
      <span className={`${styles.spot} ${styles.spotRight}`} />
      <Confetti />
      <InviteToran name="sangeet" />
      <Note className={`${styles.float} ${styles.noteA} ${styles.notePink}`} />
      <Note className={`${styles.float} ${styles.noteB} ${styles.noteGold}`} size={14} />
      <Note className={`${styles.float} ${styles.noteC} ${styles.noteGold}`} size={16} />
      <LightSwag className={styles.lightSwagBottom} />
    </>
  ),

  'bride-lagna': () => (
    <>
      <span className={styles.sunRaysSoft} />
      <InviteToran name="lagna" />
      <Band pattern="pearls" height={8} className={styles.bottomPearls} />
    </>
  ),
};

// Background layers for a themed event panel (purely decorative)
export default function EventDecor({ theme }) {
  const Decor = DECOR[theme];
  return Decor ? <div className={styles.decor} aria-hidden="true"><Decor /></div> : null;
}

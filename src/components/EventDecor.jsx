import { Band, Firework, Kalash, Note, Strand } from './Motifs';
import styles from './EventDecor.module.css';

// Deterministic scatter, so decorations sit in the same place on every render
function scatter(count, seed) {
  let s = seed;
  const next = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: count }, () => [next(), next(), next()]);
}

// Hanging strings across the top of a panel: [left %, length px, pattern, shown on narrow screens]
function Strands({ items, tip }) {
  return (
    <div className={styles.strands}>
      {items.map(([left, length, pattern, narrow], i) => (
        <Strand
          key={i}
          pattern={pattern}
          length={length}
          tip={pattern === 'pearls' ? 'bead' : pattern === 'lights' ? 'none' : tip}
          className={`${styles.strand} ${narrow ? '' : styles.wideOnly}`}
          style={{ left: `${left}%`, animationDelay: `${-(i % 5) * 0.9}s` }}
        />
      ))}
    </div>
  );
}

// Mirrored around the centre: the short strings frame the medallion, long ones run down the sides
const mirror = (half) => [...half, ...half.map(([left, ...rest]) => [100 - left, ...rest]).reverse()];

const HALDI_STRANDS = mirror([
  [1, 250, 'marigold-orange', true], [6.5, 170, 'marigold-yellow', true], [12, 290, 'marigold-orange', false],
  [17.5, 120, 'marigold-yellow', true], [23, 210, 'marigold-orange', false], [29, 90, 'marigold-yellow', false],
  [35, 140, 'marigold-orange', false], [41, 60, 'marigold-yellow', false],
]);

const SANGEET_STRANDS = mirror([
  [1.5, 260, 'lights', true], [6.5, 190, 'roses', true], [12, 230, 'lights', false], [17.5, 130, 'roses-white', true],
  [23, 170, 'lights', false], [29, 100, 'roses', false], [35, 140, 'lights', false], [41, 70, 'roses-white', false],
]);

const LAGNA_STRANDS = mirror([
  [1, 270, 'marigold-pink', true], [6.5, 190, 'pearls', true], [12, 230, 'marigold-pink', false],
  [17.5, 120, 'pearls', true], [23, 180, 'marigold-pink', false], [29, 90, 'pearls', false],
  [35, 150, 'marigold-pink', false], [41, 60, 'pearls', false],
]);

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

function DiscoBall({ className }) {
  return (
    <svg className={className} viewBox="-16 -60 32 78" aria-hidden="true">
      <line x1="0" y1="-60" x2="0" y2="-15" stroke="#c9b48a" strokeWidth="0.8" />
      <circle r="14" fill="url(#gr-disco)" />
      <g clipPath="url(#cp-disco)" stroke="rgba(40, 60, 66, 0.45)" strokeWidth="0.5">
        {[-12, -8, -4, 0, 4, 8, 12].map((v) => (
          <g key={v}>
            <line x1="-16" y1={v} x2="16" y2={v} />
            <line x1={v} y1="-16" x2={v} y2="16" />
          </g>
        ))}
      </g>
      <use href="#mf-sparkle" transform="translate(-6 -6) scale(0.7)" fill="#fff" />
    </svg>
  );
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
      <Band pattern="marigold-orange" height={14} className={styles.topGarland} />
      <Strands items={HALDI_STRANDS} tip="leaf" />
      <Petals />
      <Band pattern="swag" height={30} className={styles.bottomSwag} />
    </>
  ),

  'bride-sangeet': () => (
    <>
      <span className={`${styles.spot} ${styles.spotLeft}`} />
      <span className={`${styles.spot} ${styles.spotRight}`} />
      <Confetti />
      <Band pattern="roses" height={13} className={styles.topGarland} />
      <Strands items={SANGEET_STRANDS} tip="leaf" />
      <DiscoBall className={`${styles.disco} ${styles.discoLeft}`} />
      <DiscoBall className={`${styles.disco} ${styles.discoRight}`} />
      <Note className={`${styles.float} ${styles.noteA} ${styles.notePink}`} />
      <Note className={`${styles.float} ${styles.noteB} ${styles.noteGold}`} size={14} />
      <Note className={`${styles.float} ${styles.noteC} ${styles.noteGold}`} size={16} />
      <LightSwag className={styles.lightSwagBottom} />
    </>
  ),

  'bride-lagna': () => (
    <>
      <span className={styles.sunRaysSoft} />
      <Band pattern="marigold-pink" height={14} className={styles.topGarland} />
      <Strands items={LAGNA_STRANDS} tip="leaf" />
      <Band pattern="pearls" height={8} className={styles.bottomPearls} />
    </>
  ),
};

// Background layers for a themed event panel (purely decorative)
export default function EventDecor({ theme }) {
  const Decor = DECOR[theme];
  return Decor ? <div className={styles.decor} aria-hidden="true"><Decor /></div> : null;
}

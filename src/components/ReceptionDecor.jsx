import styles from './EventDecor.module.css';

// The reception card's evening, after the stage on the Dalal family's invite:
// a toran of rose garlands, fairy lights and a chandelier across the top, and
// candles among roses along the foot. Each is drawn twice, 1000 units wide for
// wide cards and 600 for phones, so the lights and roses keep their size on
// a small screen; both scale with the card's width.

const WIDE = 1000;
const NARROW = 600;
const GOLD = '#d9b062';
const WIRE = 'rgba(236, 199, 124, 0.4)';
const COLOURS = ['ivory', 'blush', 'peach'];
const at = (x, y, s = 1, turn = 0) => `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${turn}) scale(${s})`;

// Points along a strand hung from (x0, y) to (x1, y) that sags by `sag` midway
const along = (x0, x1, y, sag, count) =>
  Array.from({ length: count }, (_, i) => {
    const t = (i + 1) / (count + 1);
    return [x0 + (x1 - x0) * t, y + 4 * sag * t * (1 - t)];
  });
const strand = (x0, x1, y, sag) => `M${x0} ${y} Q${(x0 + x1) / 2} ${y + 2 * sag} ${x1} ${y}`;

// Lights in three sets: one burns steady, two twinkle out of step
function Bulbs({ points }) {
  return [0, 1, 2].map((set) => (
    <g key={set} className={set ? styles.twinkle : undefined} style={set === 2 ? { animationDelay: '-1.3s' } : undefined}>
      {points.filter((_, i) => i % 3 === set).map(([x, y, s], i) => <use key={i} href="#mf-bulb" transform={at(x, y, s)} />)}
    </g>
  ));
}

// Three roses on a bed of leaves; `flip` mirrors it for the right-hand side
function Roses({ x, y, size = 1, flip = false }) {
  return (
    <g transform={`${at(x, y, size)} scale(${flip ? -1 : 1} 1)`}>
      <use href="#mf-leaf" transform={at(-12, 4, 1.1, 160)} />
      <use href="#mf-leaf" transform={at(12, 6, 1, 25)} />
      <use href="#mf-leaf-sage" transform={at(-4, 10, 1, 115)} />
      <use href="#mf-leaf-sage" transform={at(4, -8, 0.9, -60)} />
      <use href="#mf-leaf-sage" transform={at(-14, -4, 0.85, 200)} />
      <use href="#mf-rose-blush" transform={at(-11, 3, 0.8)} />
      <use href="#mf-rose-peach" transform={at(11, 5, 0.7)} />
      <use href="#mf-rose-ivory" transform={at(0, -1)} />
    </g>
  );
}

const Rose = ([x, y, colour, size]) => <use key={`${x}-${y}`} href={`#mf-rose-${colour}`} transform={at(x, y, size)} />;

// Each drawing comes at both widths; CSS shows the one that suits the screen
const SHOWN_ON = { [WIDE]: styles.onWide, [NARROW]: styles.onNarrow };

/* ——— The toran ——— */

function toran(w) {
  const swagCount = w > NARROW ? 4 : 2;
  const anchors = Array.from({ length: swagCount + 1 }, (_, i) => (w * i) / swagCount);
  const swags = anchors.slice(1).map((x1, i) => [anchors[i], x1]);
  // Roses strung along each swag, a leaf tucked behind every one, alternately above and below
  const garland = swags.flatMap(([x0, x1]) =>
    along(x0, x1, 12, 34, Math.round((x1 - x0) / 17) - 1).map(([x, y], i) => {
      const slope = (Math.atan2(4 * 34 * (1 - 2 * ((x - x0) / (x1 - x0))), x1 - x0) * 180) / Math.PI;
      return { x, y, rose: COLOURS[i % 3], size: i % 2 ? 0.62 : 0.74, leaf: Math.round(slope + (i % 2 ? 70 : -110)) };
    }),
  );
  // A deeper strand of lights hangs beneath each garland
  const swagBulbs = swags.flatMap(([x0, x1]) => along(x0, x1, 14, 62, Math.round((x1 - x0) / 23)).map(([x, y]) => [x, y, 1.1]));
  const rail = Array.from({ length: Math.floor(w / 18) }, (_, i) => [10 + i * 18, 5, 0.6]);
  // A curtain of lights down each side, longest at the edges, leaving the
  // middle clear for the title
  const reach = w > NARROW ? 232 : 140;
  const curtain = Array.from({ length: Math.floor((reach - 16) / 20) + 1 }, (_, i) => {
    const x = 16 + i * 20;
    return [x, Math.round(44 + 196 * ((reach - x) / (reach - 16)) ** 1.25)];
  }).flatMap(([x, length]) => [[x, length], [w - x, length]]);
  const curtainBulbs = curtain.flatMap(([x, length], i) =>
    Array.from({ length: Math.floor((length - 20) / 13) }, (_, k) => [x, 20 + k * 13 + (i % 4 < 2 ? 0 : 6), 0.8]),
  );
  return { w, anchors, swags, garland, bulbs: [...rail, ...curtainBulbs, ...swagBulbs], curtain };
}

// Gold arms in two tiers, candles at their tips and crystals strung between
const LOWER_ARMS = [-54, -28, 28, 54];
const UPPER_ARMS = [-26, 26];

function Chandelier({ x, y }) {
  return (
    <g transform={at(x, y)}>
      <circle cy="78" r="70" fill="url(#gr-glow)" opacity="0.45" />
      <path d="M0 0 V36" stroke={GOLD} strokeWidth="1.5" strokeDasharray="2.4 1.6" />
      <g fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round">
        <path d="M0 36 V116" strokeWidth="2.6" />
        {LOWER_ARMS.map((ax) => <path key={ax} d={`M0 98 C${ax * 0.4} 114 ${ax} 108 ${ax} 84`} />)}
        {UPPER_ARMS.map((ax) => <path key={ax} d={`M0 72 C${ax * 0.4} 84 ${ax} 80 ${ax} 62`} />)}
      </g>
      <g fill={GOLD}>
        <ellipse cy="40" rx="6" ry="3" />
        <ellipse cy="70" rx="4" ry="5" />
        <ellipse cy="98" rx="7" ry="4.5" />
        <ellipse cy="116" rx="3" ry="2" />
      </g>
      {LOWER_ARMS.slice(1).map((ax, i) =>
        along(LOWER_ARMS[i], ax, 88, 12, 6).map(([bx, by]) => <circle key={`${ax}-${bx}`} cx={bx} cy={by} r="1.2" fill="#fff7e6" opacity="0.9" />),
      )}
      {LOWER_ARMS.map((ax) => <use key={ax} href="#mf-crystal" transform={at(ax, 86)} />)}
      <use href="#mf-crystal" transform={at(0, 118, 1.7)} />
      {[...LOWER_ARMS.map((ax) => [ax, 84]), ...UPPER_ARMS.map((ax) => [ax, 62])].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`} transform={at(cx, cy)}>
          <ellipse rx="5" ry="1.8" fill={GOLD} />
          <rect x="-1.8" y="-9" width="3.6" height="9" rx="0.8" fill="#fbf1dc" />
          <use href="#mf-flame" transform={at(0, -9, 0.75)} className={styles.flicker} />
        </g>
      ))}
    </g>
  );
}

function ToranArt({ w, anchors, swags, garland, bulbs, curtain, className }) {
  return (
    <svg className={className} viewBox={`0 0 ${w} 250`} aria-hidden="true">
      <g stroke={WIRE} strokeWidth="0.7" fill="none">
        <path d={`M0 5 H${w}`} />
        {curtain.map(([x, length]) => <path key={x} d={`M${x} 5 V${length}`} />)}
        {swags.map(([x0, x1]) => <path key={x0} d={strand(x0, x1, 14, 62)} />)}
      </g>
      {curtain.map(([x, length]) => <use key={x} href="#mf-crystal" transform={at(x, length)} />)}
      <Bulbs points={bulbs} />
      <Chandelier x={w / 2} y={30} />
      {garland.map(({ x, y, leaf }, i) => <use key={i} href={i % 3 ? '#mf-leaf-sage' : '#mf-leaf'} transform={at(x, y, 0.8, leaf)} />)}
      {garland.map(({ x, y, rose, size }, i) => <use key={i} href={`#mf-rose-${rose}`} transform={at(x, y, size)} />)}
      {anchors.map((x) => {
        const corner = x === 0 || x === w;
        return <Roses key={x} x={x} y={corner ? 20 : 16} size={corner ? 1.9 : 1.35} flip={x > w / 2} />;
      })}
    </svg>
  );
}

/* ——— The foot ——— */

function foot(w) {
  // A runner of roses along the stage in two staggered rows, lights woven
  // through it and votives set upon it
  const back = Array.from({ length: Math.floor(w / 26) }, (_, i) => [8 + i * 26, 148, COLOURS[i % 3], 0.85]);
  const front = Array.from({ length: Math.floor((w - 13) / 26) }, (_, i) => [21 + i * 26, 159, COLOURS[(i + 1) % 3], 1]);
  const votives = w > NARROW ? [200, 350, 500, 650, 800] : [170, 300, 430];
  // Tall candles on gold stands gathered at each corner, [x, stand height],
  // shorter on phones where the text runs nearly edge to edge
  const stands = w > NARROW ? [[30, 116], [58, 90], [86, 68]] : [[26, 84], [50, 64], [72, 48]];
  return { w, back, front, bulbs: back.map(([x]) => [x + 13, 141, 0.9]), votives, stands };
}

function Stand({ x, height }) {
  const top = 156 - height;
  return (
    <g>
      <path d={`M${x} 156 V${top}`} stroke={GOLD} strokeWidth="2.4" />
      <ellipse cx={x} cy={top + 34} rx="2.6" ry="3.6" fill={GOLD} />
      <ellipse cx={x} cy={top} rx="8" ry="2.2" fill={GOLD} />
      <rect x={x - 4.5} y={top - 24} width="9" height="24" rx="1.2" fill="#fbf1dc" />
      <use href="#mf-flame" transform={at(x, top - 24, 1.15)} className={styles.flicker} />
    </g>
  );
}

function Votive({ x }) {
  return (
    <g transform={at(x, 136, 1.4)}>
      <use href="#mf-flame" transform={at(0, -3, 0.8)} className={styles.flicker} />
      <path d="M-7 -6 L-6 8 Q0 10 6 8 L7 -6Z" fill="rgba(255, 228, 180, 0.3)" stroke="rgba(236, 199, 124, 0.85)" strokeWidth="0.7" />
      <ellipse cy="-6" rx="7" ry="1.6" fill="none" stroke="rgba(236, 199, 124, 0.9)" strokeWidth="0.7" />
    </g>
  );
}

function FootArt({ w, back, front, bulbs, votives, stands, className }) {
  return (
    <svg className={className} viewBox={`0 0 ${w} 170`} aria-hidden="true">
      {stands.flatMap(([x, height]) => [x, w - x].map((sx) => <Stand key={sx} x={sx} height={height} />))}
      {back.map(([x, y], i) => (
        <use key={x} href={i % 2 ? '#mf-leaf-sage' : '#mf-leaf'} transform={at(x, y - 4, 0.9, i % 2 ? -40 : -140)} />
      ))}
      {back.map(Rose)}
      <Bulbs points={bulbs} />
      {votives.map((x) => <Votive key={x} x={x} />)}
      {front.map(Rose)}
      <Roses x={58} y={150} size={1.8} />
      <Roses x={w - 58} y={150} size={1.8} flip />
    </svg>
  );
}

const TORANS = [toran(WIDE), toran(NARROW)];
const FEET = [foot(WIDE), foot(NARROW)];

export function LightToran({ className }) {
  return TORANS.map((g) => <ToranArt key={g.w} {...g} className={`${className} ${SHOWN_ON[g.w]}`} />);
}

export function CandleFoot({ className }) {
  return FEET.map((g) => <FootArt key={g.w} {...g} className={`${className} ${SHOWN_ON[g.w]}`} />);
}

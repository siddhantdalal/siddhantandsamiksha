// Hand-drawn motifs for the invite themes. MotifDefs is rendered once and
// holds the shapes and tiling patterns; everything else references them by id,
// so a garland of fifty marigolds costs a handful of DOM nodes.

const ring = (count, radius, offset = 0) =>
  Array.from({ length: count }, (_, i) => {
    const a = ((i + offset) / count) * Math.PI * 2;
    return [+(Math.cos(a) * radius).toFixed(2), +(Math.sin(a) * radius).toFixed(2)];
  });

const MARIGOLD_OUTER = ring(12, 6.2);
const MARIGOLD_INNER = ring(8, 3.3, 0.5);

const MARIGOLDS = {
  orange: ['#c95b0c', '#ea7a17', '#f8a43c'],
  yellow: ['#d98a0b', '#f6b40e', '#fdd35a'],
  pink: ['#a8204f', '#d63b74', '#f290b2'],
};

const ROSES = {
  white: ['#fffaf2', '#e9dccb'],
  blush: ['#f6cdd6', '#dc9aab'],
  cream: ['#f8e6c4', '#dcbf8c'],
  pink: ['#e86a98', '#b8285e'],
  red: ['#c8264f', '#8e1638'],
};

function MarigoldShape({ id, colors: [deep, main, light] }) {
  return (
    <g id={id}>
      {MARIGOLD_OUTER.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.5" fill={deep} />)}
      <circle r="6.6" fill={main} />
      {MARIGOLD_INNER.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.3" fill={light} />)}
      <circle r="1.6" fill={deep} />
    </g>
  );
}

function RoseShape({ id, colors: [petal, shade] }) {
  return (
    <g id={id}>
      <circle r="6.4" fill={petal} />
      <path d="M-4.2 1.5 A4.4 4.4 0 0 1 4.2 -1.2 M-2.6 -2.6 A3 3 0 0 1 3 2.2 A2.4 2.4 0 0 1 -1.6 1.6 A1.4 1.4 0 0 1 0.6 -0.8"
        fill="none" stroke={shade} strokeWidth="0.9" strokeLinecap="round" />
    </g>
  );
}

// Sole and toes of a right foot, toes up, about 9 x 22
const FOOT = (
  <>
    <path d="M0.2 -5.5 C3.6 -5.6 4.6 -1.6 4.2 2.4 C3.9 6.2 2.6 9.6 -0.2 10.6 C-3 11.4 -4.4 8 -4 3.8 C-3.7 0.2 -3.6 -5.4 0.2 -5.5Z" />
    <circle cx="-2.6" cy="-8.4" r="1.75" />
    <circle cx="-0.2" cy="-9.9" r="1.35" />
    <circle cx="1.9" cy="-9.6" r="1.2" />
    <circle cx="3.5" cy="-8.4" r="1.05" />
    <circle cx="4.6" cy="-6.6" r="0.9" />
  </>
);

export function MotifDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {Object.entries(MARIGOLDS).map(([name, colors]) => (
          <MarigoldShape key={name} id={`mf-marigold-${name}`} colors={colors} />
        ))}
        {Object.entries(ROSES).map(([name, colors]) => (
          <RoseShape key={name} id={`mf-rose-${name}`} colors={colors} />
        ))}

        {/* Mango leaf hanging from its stalk at 0,0 */}
        <g id="mf-leaf">
          <path d="M0 0 C5.4 4.6 5.6 13.4 0 19 C-5.6 13.4 -5.4 4.6 0 0Z" fill="#2f8150" />
          <path d="M0 1.5 V17" stroke="#1f5e39" strokeWidth="0.8" />
        </g>
        <g id="mf-leaf-sage">
          <path d="M0 0 C5.4 4.6 5.6 13.4 0 19 C-5.6 13.4 -5.4 4.6 0 0Z" fill="#8fa58a" />
          <path d="M0 1.5 V17" stroke="#6f8a6a" strokeWidth="0.8" />
        </g>
        <g id="mf-foot">{FOOT}</g>
        <path id="mf-sparkle" d="M0 -7 C0.9 -1.6 1.6 -0.9 7 0 C1.6 0.9 0.9 1.6 0 7 C-0.9 1.6 -1.6 0.9 -7 0 C-1.6 -0.9 -0.9 -1.6 0 -7Z" />
        <g id="mf-note">
          <ellipse cx="-2.2" cy="5" rx="3.1" ry="2.2" transform="rotate(-22 -2.2 5)" />
          <rect x="0.4" y="-9" width="1.3" height="14" />
          <path d="M1.7 -9 C5.6 -7.4 6.6 -3.6 4.2 -0.6 C5.2 -3.8 4 -6 1.7 -6.5Z" />
        </g>

        {/* Marigold ladis: one flower per tile, stacked down a thread */}
        {Object.keys(MARIGOLDS).map((name) => (
          <pattern key={name} id={`pt-marigold-${name}`} width="16" height="12.5" patternUnits="userSpaceOnUse">
            <use href={`#mf-marigold-${name}`} transform="translate(8 6.25) scale(0.68)" />
          </pattern>
        ))}

        {/* Pearls on a gold thread, shaded so they hold up on cream */}
        <radialGradient id="gr-pearl" cx="38%" cy="32%" r="70%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#f3eadb" />
          <stop offset="1" stopColor="#cdb994" />
        </radialGradient>
        <pattern id="pt-pearls" width="10" height="7.5" patternUnits="userSpaceOnUse">
          <path d="M5 0 V7.5" stroke="#c99a3e" strokeWidth="0.6" />
          <circle cx="5" cy="3.75" r="2.9" fill="url(#gr-pearl)" stroke="#bfa676" strokeWidth="0.45" />
        </pattern>

        {/* Fairy-light strand: warm bulbs on a fine wire */}
        <pattern id="pt-lights" width="10" height="18" patternUnits="userSpaceOnUse">
          <path d="M5 0 V18" stroke="rgba(120, 96, 52, 0.7)" strokeWidth="0.6" />
          <circle cx="5" cy="9" r="4.6" fill="rgba(255, 214, 140, 0.22)" />
          <circle cx="5" cy="9" r="2.1" fill="#fff1c4" />
        </pattern>

        <pattern id="pt-roses" width="16" height="13" patternUnits="userSpaceOnUse">
          <use href="#mf-rose-pink" transform="translate(8 6.5) scale(0.95)" />
          <use href="#mf-leaf" transform="translate(13 9) rotate(-60) scale(0.35)" />
        </pattern>
        <pattern id="pt-roses-white" width="16" height="13" patternUnits="userSpaceOnUse">
          <use href="#mf-rose-white" transform="translate(8 6.5) scale(0.95)" />
          <use href="#mf-leaf" transform="translate(13 9) rotate(-60) scale(0.35)" />
        </pattern>

        {/* Paithani narali border: a row of gold triangles */}
        <pattern id="pt-narali" width="14" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 12 L7 2 L14 12Z" fill="#d6ad60" />
          <path d="M3.6 12 L7 7.2 L10.4 12Z" fill="#7a1f30" />
          <circle cx="7" cy="0.9" r="0.9" fill="#d6ad60" />
        </pattern>
        <pattern id="pt-narali-down" width="14" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 0 L7 10 L14 0Z" fill="#d6ad60" />
          <circle cx="7" cy="11.1" r="0.9" fill="#d6ad60" />
        </pattern>

        {/* Toran: mango leaves under the beam with a marigold swag below */}
        <pattern id="pt-toran" width="36" height="48" patternUnits="userSpaceOnUse">
          {[0, 9, 18, 27].map((x, i) => (
            <use key={x} href="#mf-leaf" transform={`translate(${x + 4.5} 0) rotate(${i % 2 ? 6 : -6}) scale(0.82)`} />
          ))}
          {[[0, 17], [6, 22], [12, 25.5], [18, 26.5], [24, 25.5], [30, 22]].map(([x, y]) => (
            <use key={x} href={`#mf-marigold-${x % 12 ? 'orange' : 'yellow'}`} transform={`translate(${x} ${y}) scale(0.5)`} />
          ))}
          <use href="#mf-marigold-orange" transform="translate(0 29) scale(0.42)" />
          <use href="#mf-marigold-yellow" transform="translate(0 36) scale(0.38)" />
          <use href="#mf-leaf" transform="translate(0 39) scale(0.38)" />
        </pattern>

        {/* Marigold swag for the foot of a panel */}
        <pattern id="pt-swag" width="60" height="30" patternUnits="userSpaceOnUse">
          {[0, 7.5, 15, 22.5, 30, 37.5, 45, 52.5].map((x) => {
            const y = 6 + Math.sin((x / 60) * Math.PI) * 12;
            return <use key={x} href={`#mf-marigold-${x % 15 ? 'yellow' : 'orange'}`} transform={`translate(${x} ${y.toFixed(1)}) scale(0.55)`} />;
          })}
        </pattern>

        {/* Lotus rosettes along the mandap beam */}
        <pattern id="pt-rosette" width="44" height="28" patternUnits="userSpaceOnUse">
          <g transform="translate(22 14)" fill="#e6c27a">
            {ring(8, 4.6).map(([x, y], i) => (
              <ellipse key={i} cx={x} cy={y} rx="3.4" ry="1.7" transform={`rotate(${i * 45} ${x} ${y})`} />
            ))}
            <circle r="2.4" fill="#f6dfa4" />
          </g>
          <circle cx="0" cy="14" r="1.6" fill="#e6c27a" />
        </pattern>

        <radialGradient id="gr-disco" cx="38%" cy="32%" r="70%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#c9d2d4" />
          <stop offset="1" stopColor="#6f7f84" />
        </radialGradient>
        <clipPath id="cp-disco"><circle r="14" /></clipPath>
        <radialGradient id="gr-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff3cf" stopOpacity="0.95" />
          <stop offset="0.4" stopColor="#ffd98a" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gr-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a97f36" />
          <stop offset="0.45" stopColor="#f6dfa4" />
          <stop offset="0.6" stopColor="#d6ad60" />
          <stop offset="1" stopColor="#8a6420" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Marigold({ size = 20, color = 'orange', className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="-10 -10 20 20" aria-hidden="true">
      <use href={`#mf-marigold-${color}`} />
    </svg>
  );
}

// A hanging string of marigolds (or pearls, roses, lights) ending in a tassel
export function Strand({ pattern, length, tip = 'leaf', className, style }) {
  const height = length + (tip === 'none' ? 0 : 14);
  return (
    <svg className={className} style={style} width="16" height={height} viewBox={`0 0 16 ${height}`} aria-hidden="true">
      <rect x={pattern === 'pearls' || pattern === 'lights' ? 3 : 0} width={pattern === 'pearls' || pattern === 'lights' ? 10 : 16} height={length} fill={`url(#pt-${pattern})`} />
      {tip === 'leaf' && <use href="#mf-leaf" transform={`translate(8 ${length - 2}) scale(0.62)`} />}
      {tip === 'bead' && <circle cx="8" cy={length + 4} r="3.2" fill="#d6ad60" />}
      {tip === 'bell' && <path d={`M4.5 ${length + 9} Q8 ${length - 3} 11.5 ${length + 9}Z`} fill="#d6ad60" />}
    </svg>
  );
}

// A tiling band across the full width of its container
export function Band({ pattern, height, className }) {
  return (
    <svg className={className} width="100%" height={height} aria-hidden="true">
      <rect width="100%" height={height} fill={`url(#pt-${pattern})`} />
    </svg>
  );
}

const WALK = [-14, 10, -12, 12, -10, 11, -13];

// Seven steps: single gold prints for the Sangeet, pink and gold pairs for the wedding
export function Footprints({ pairs = false, className }) {
  const step = pairs ? 34 : 26;
  return (
    <svg className={className} viewBox={`0 -16 ${step * 7} 34`} aria-hidden="true">
      {WALK.map((tilt, i) => (
        <g key={i} transform={`translate(${step * i + step / 2} ${i % 2 ? -2 : 2})`}>
          {pairs ? (
            <>
              <use href="#mf-foot" transform={`translate(-6 0) rotate(${tilt / 2}) scale(-0.9 0.9)`} style={{ fill: 'var(--ev-pink)' }} />
              <use href="#mf-foot" transform={`translate(6 -1) rotate(${tilt / 2}) scale(0.9)`} fill="#c99a3e" />
            </>
          ) : (
            <use href="#mf-foot" transform={`rotate(${tilt}) scale(${i % 2 ? 0.95 : -0.95} 0.95)`} style={{ fill: 'var(--ev-title)' }} />
          )}
        </g>
      ))}
    </svg>
  );
}

export function Sparkle({ size = 14, className, style }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="-7 -7 14 14" aria-hidden="true">
      <use href="#mf-sparkle" fill="currentColor" />
    </svg>
  );
}

export function Note({ size = 18, className, style }) {
  return (
    <svg className={className} style={style} width={size} height={size * 1.1} viewBox="-6 -10 13 18" aria-hidden="true">
      <use href="#mf-note" fill="currentColor" />
    </svg>
  );
}

// A paisley pair facing each other, the mehendi divider
export function Paisleys({ className }) {
  const paisley = 'M0 10 C-9 10 -11 -2 -4 -7 C1 -10 7 -8 7 -3 C7 2 2 3 1 0 C0 -2 3 -3 3 -1';
  return (
    <svg className={className} viewBox="-60 -14 120 28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M-58 0 H-20 M20 0 H58" strokeDasharray="1 3" />
      <path d={paisley} transform="translate(-9 0)" />
      <path d={paisley} transform="translate(9 0) scale(-1 1)" />
      <circle cx="0" cy="-9" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Kalash({ className }) {
  return (
    <svg className={className} viewBox="-30 -36 60 66" aria-hidden="true">
      <use href="#mf-leaf" transform="translate(-4 -14) rotate(125) scale(0.95)" />
      <use href="#mf-leaf" transform="translate(4 -14) rotate(-125) scale(0.95)" />
      <use href="#mf-leaf" transform="translate(-2 -16) rotate(160) scale(0.9)" />
      <use href="#mf-leaf" transform="translate(2 -16) rotate(-160) scale(0.9)" />
      <ellipse cx="0" cy="-22" rx="9" ry="10" fill="#8a5a2b" />
      <path d="M-5 -30 Q0 -36 5 -30" stroke="#5c3a1a" strokeWidth="1.6" fill="none" />
      <path d="M-13 -11 H13 L10 -6 C20 -2 22 12 14 20 C8 25 -8 25 -14 20 C-22 12 -20 -2 -10 -6Z" fill="url(#gr-gold)" />
      <path d="M-15 4 H15" stroke="#7a1f30" strokeWidth="2.2" />
      <circle cx="0" cy="4" r="2.6" fill="#7a1f30" />
      <path d="M-9 25 H9 L11 29 H-11Z" fill="#c9963c" />
    </svg>
  );
}

// Fine gold fireworks for the night sky
export function Firework({ size = 120, className, style }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="-50 -50 100 100" aria-hidden="true"
      stroke="currentColor" strokeLinecap="round" fill="currentColor">
      {ring(24, 1).map(([x, y], i) => {
        const inner = i % 2 ? 14 : 8;
        const outer = i % 2 ? 40 : 46;
        return (
          <g key={i}>
            <line x1={x * inner} y1={y * inner} x2={x * outer} y2={y * outer} strokeWidth="0.8" opacity="0.85" />
            <circle cx={x * (outer + 3)} cy={y * (outer + 3)} r="1.1" stroke="none" />
          </g>
        );
      })}
      <circle r="2.4" stroke="none" />
    </svg>
  );
}

export function Lantern({ size = 26, className, style }) {
  return (
    <svg className={className} style={style} width={size} height={size * 1.4} viewBox="-12 -16 24 34" aria-hidden="true">
      <circle cy="2" r="12" fill="url(#gr-glow)" />
      <path d="M-7 -12 Q0 -15 7 -12 L9 8 Q0 11 -9 8Z" fill="#f2a24a" />
      <path d="M-7 -12 Q0 -15 7 -12 L8 -2 Q0 0 -8 -2Z" fill="#f7c46f" opacity="0.8" />
      <ellipse cy="9.5" rx="3" ry="2" fill="#fff1c4" />
    </svg>
  );
}

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

// Roses from above, as on the reception invite: [outer petals, inner petals, heart]
const ROSES = {
  ivory: ['#fffdf7', '#f2e0cc', '#bf8f74'],
  blush: ['#ffe8ec', '#f3a5b5', '#bd4c69'],
  peach: ['#fff1e2', '#f7be8e', '#c47440'],
};

const ROSE_OUTER = ring(6, 5.6, 0.25);
const ROSE_INNER = ring(4, 2.4);
// The heart's spiral, unwinding from the middle
const ROSE_HEART = 'M' + Array.from({ length: 13 }, (_, i) => {
  const a = i * 0.85, r = 0.3 + i * 0.27;
  return `${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`;
}).join(' L');

// About 22 across, with a soft shadow beneath so it sits on dark cards
function RoseShape({ id, colors: [outer, inner, heart] }) {
  return (
    <g id={id}>
      <circle cx="0.8" cy="1.6" r="10.6" fill="#1e0309" opacity="0.4" />
      {ROSE_OUTER.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5.1" fill={outer} stroke={inner} strokeWidth="0.6" />)}
      <circle r="6.2" fill={outer} />
      {ROSE_INNER.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.2" fill={inner} stroke={heart} strokeWidth="0.4" strokeOpacity="0.55" />)}
      <path d={ROSE_HEART} fill="none" stroke={heart} strokeWidth="0.7" strokeLinecap="round" />
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

        <g id="mf-foot">{FOOT}</g>
        <g id="mf-note">
          <ellipse cx="-2.2" cy="5" rx="3.1" ry="2.2" transform="rotate(-22 -2.2 5)" />
          <rect x="0.4" y="-9" width="1.3" height="14" />
          <path d="M1.7 -9 C5.6 -7.4 6.6 -3.6 4.2 -0.6 C5.2 -3.8 4 -6 1.7 -6.5Z" />
        </g>

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

        {/* Marigold swag for the foot of a panel */}
        <pattern id="pt-swag" width="60" height="30" patternUnits="userSpaceOnUse">
          {[0, 7.5, 15, 22.5, 30, 37.5, 45, 52.5].map((x) => {
            const y = 6 + Math.sin((x / 60) * Math.PI) * 12;
            return <use key={x} href={`#mf-marigold-${x % 15 ? 'yellow' : 'orange'}`} transform={`translate(${x} ${y.toFixed(1)}) scale(0.55)`} />;
          })}
        </pattern>

        <radialGradient id="gr-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff3cf" stopOpacity="0.95" />
          <stop offset="0.4" stopColor="#ffd98a" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
        </radialGradient>

        {/* The reception's evening: roses and leaves, fairy lights, candle flames and crystals */}
        {Object.entries(ROSES).map(([name, colors]) => (
          <RoseShape key={name} id={`mf-rose-${name}`} colors={colors} />
        ))}
        {/* leaves grow from the origin along +x */}
        <g id="mf-leaf">
          <path d="M0 0 C4 -5.5 11 -5.2 17 0 C11 5.2 4 5.5 0 0Z" fill="#4d7547" />
          <path d="M1 0 H14" stroke="#38593a" strokeWidth="0.6" />
        </g>
        <g id="mf-leaf-sage">
          <ellipse cx="6.5" rx="6.5" ry="4.8" fill="#97b096" />
          <path d="M0 0 H11" stroke="#7b977c" strokeWidth="0.5" />
        </g>
        <g id="mf-bulb">
          <circle r="7" fill="url(#gr-glow)" />
          <circle r="2.1" fill="#fff4d2" />
        </g>
        <linearGradient id="gr-flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ff9d3f" />
          <stop offset="0.5" stopColor="#ffd56e" />
          <stop offset="1" stopColor="#fff7dc" />
        </linearGradient>
        {/* a flame standing on the origin, in its own glow */}
        <g id="mf-flame">
          <circle cy="-4" r="12" fill="url(#gr-glow)" />
          <path d="M0 0 C-2.7 -1.6 -2.5 -5.2 0 -9.5 C2.5 -5.2 2.7 -1.6 0 0Z" fill="url(#gr-flame)" />
        </g>
        {/* a crystal drop hanging from the origin */}
        <path id="mf-crystal" d="M0 0 C2.4 2.6 2.6 5.4 0 7.4 C-2.6 5.4 -2.4 2.6 0 0Z" fill="#fff7e6" fillOpacity="0.85" stroke="#e8c47c" strokeWidth="0.45" />
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

export function Note({ size = 18, className, style }) {
  return (
    <svg className={className} style={style} width={size} height={size * 1.1} viewBox="-6 -10 13 18" aria-hidden="true">
      <use href="#mf-note" fill="currentColor" />
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

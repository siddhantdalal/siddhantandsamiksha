import styles from './Medallion.module.css';

// Pearl dots just inside the gold rim
const PEARLS = Array.from({ length: 28 }, (_, i) => {
  const angle = (i / 28) * Math.PI * 2;
  return { cx: 50 + Math.cos(angle) * 43.5, cy: 50 + Math.sin(angle) * 43.5 };
});

// The SS monogram, always on its maroon velvet disc: the gold logo vanishes on light grounds
export default function Medallion({ size = 64, sunburst = true, className = '', alt = 'Siddhant and Samiksha monogram' }) {
  return (
    <span className={`${styles.medallion} ${className}`} style={{ '--size': `${size}px` }}>
      {sunburst && <span className={styles.sunburst} aria-hidden="true" />}
      <span className={styles.disc}>
        <svg className={styles.pearls} viewBox="0 0 100 100" aria-hidden="true">
          {PEARLS.map(({ cx, cy }, i) => (
            <circle key={i} cx={cx} cy={cy} r="1.15" />
          ))}
        </svg>
        <img className={styles.logo} src={`${import.meta.env.BASE_URL}images/logo.png`} alt={alt} />
      </span>
    </span>
  );
}

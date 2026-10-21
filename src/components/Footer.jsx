import content from '../data/content';
import { useSide } from '../context/SideContext';
import Backdrop from './Backdrop';
import { Firework, Lantern } from './Motifs';
import styles from './Footer.module.css';

// [left %, bottom %, size px, animation delay s]
const LANTERNS = [[8, 30, 22, 0], [18, 62, 16, -3], [30, 18, 14, -6], [70, 24, 15, -2], [82, 58, 20, -5], [92, 22, 14, -8], [56, 74, 12, -4]];
const FIREWORKS = [[6, 8, 110, 0], [80, 4, 130, -1.6], [64, 46, 70, -3.2], [22, 52, 64, -2.4]];

// Siddhant's side closes with sky lanterns drifting up between gold fireworks
function NightSky() {
  return (
    <div className={styles.sky} aria-hidden="true">
      {FIREWORKS.map(([left, top, size, delay]) => (
        <Firework key={left} className={styles.firework} size={size} style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }} />
      ))}
      {LANTERNS.map(([left, bottom, size, delay]) => (
        <Lantern key={left} className={styles.lantern} size={size} style={{ left: `${left}%`, bottom: `${bottom}%`, animationDelay: `${delay}s` }} />
      ))}
    </div>
  );
}

export default function Footer() {
  const { side } = useSide();
  const isGroom = side === 'groom';
  const { closing, family } = content.footer[side === 'bride' ? 'bride' : 'groom'];

  return (
    <footer className={`has-backdrop ${styles.footer}`}>
      <Backdrop src={`${import.meta.env.BASE_URL}images/backdrops/couple.jpg`} focus="center 30%" />
      {isGroom && <NightSky />}
      <p className={styles.closing}>{closing}</p>
      <p className={styles.family}>{family}</p>
      <div className={styles.divider} />
      <p className={styles.copy}>
        &copy; {content.footer.year} &middot; {content.ui.madeWith}
      </p>
    </footer>
  );
}

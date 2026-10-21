import content from '../data/content';
import { useSide } from '../context/SideContext';
import styles from './SideToggle.module.css';

export default function SideToggle() {
  const { side, setSide } = useSide();

  if (!side) return null;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button
          className={`${styles.capsule} ${side === 'groom' ? styles.active : ''}`}
          onClick={() => setSide('groom')}
        >
          {content.ui.sideToggle.groom}
        </button>
        <button
          className={`${styles.capsule} ${side === 'bride' ? styles.active : ''}`}
          onClick={() => setSide('bride')}
        >
          {content.ui.sideToggle.bride}
        </button>
      </div>
    </div>
  );
}

import { content } from '../data/content';
import { useSide } from '../context/SideContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { side } = useSide();

  const names = side === 'bride'
    ? `${content.couple.brideFirst} & ${content.couple.groomFirst}`
    : `${content.couple.groomFirst} & ${content.couple.brideFirst}`;

  return (
    <footer className={styles.footer}>
      <p className={styles.closing}>{content.footer.closing},</p>
      <p className={styles.names}>{names}</p>
      <div className={styles.divider} />
      <p className={styles.copy}>
        &copy; {content.footer.year} &middot; Made with love
      </p>
    </footer>
  );
}

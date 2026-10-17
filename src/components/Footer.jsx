import content from '../data/content';
import { useSide } from '../context/SideContext';
import Backdrop from './Backdrop';
import styles from './Footer.module.css';

export default function Footer() {
  const { side } = useSide();

  const names = side === 'bride'
    ? `${content.couple.brideFirst} & ${content.couple.groomFirst}`
    : `${content.couple.groomFirst} & ${content.couple.brideFirst}`;

  return (
    <footer className={`has-backdrop ${styles.footer}`}>
      <Backdrop src={`${import.meta.env.BASE_URL}images/backdrops/couple.jpg`} focus="center 30%" />
      <p className={styles.closing}>{content.footer.closing},</p>
      <p className={styles.names}>{names}</p>
      <div className={styles.divider} />
      <p className={styles.copy}>
        &copy; {content.footer.year} &middot; {content.ui.madeWith}
      </p>
    </footer>
  );
}

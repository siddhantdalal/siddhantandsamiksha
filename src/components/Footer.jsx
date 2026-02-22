import { content } from '../data/content';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.closing}>{content.footer.closing},</p>
      <p className={styles.names}>{content.footer.names}</p>
      <div className={styles.divider} />
      <p className={styles.copy}>
        &copy; {content.footer.year} &middot; Made with love
      </p>
    </footer>
  );
}

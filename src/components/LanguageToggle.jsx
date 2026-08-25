import { useLang } from '../context/LanguageContext';
import { useSide } from '../context/SideContext';
import styles from './LanguageToggle.module.css';

export default function LanguageToggle() {
  const { lang, setLang } = useLang();
  const { side } = useSide();

  return (
    <div className={`${styles.toggle} ${side ? styles.shifted : ''}`} role="group" aria-label="Language">
      <button
        className={`${styles.option} ${lang === 'en' ? styles.active : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <button
        className={`${styles.option} ${styles.mr} ${lang === 'mr' ? styles.active : ''}`}
        onClick={() => setLang('mr')}
        aria-pressed={lang === 'mr'}
      >
        मराठी
      </button>
    </div>
  );
}

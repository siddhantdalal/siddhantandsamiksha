import { useContent } from '../context/LanguageContext';
import styles from './Hashtag.module.css';

export default function Hashtag() {
  const content = useContent();
  const tags = [...content.hashtags, ...content.hashtags, ...content.hashtags];

  return (
    <section className={styles.section}>
      <div className={styles.marquee}>
        <div className={styles.fadeLeft} aria-hidden="true" />
        <div className={styles.fadeRight} aria-hidden="true" />
        <div className={styles.track}>
          {tags.map((tag, i) => (
            <span key={i} className={styles.tagWrap}>
              <span className={styles.tag}>{tag}</span>
              <span className={styles.diamond} aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

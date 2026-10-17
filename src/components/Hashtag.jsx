import content from '../data/content';
import Backdrop from './Backdrop';
import styles from './Hashtag.module.css';

export default function Hashtag() {
  const tags = [...content.hashtags, ...content.hashtags, ...content.hashtags];

  return (
    <section className={`has-backdrop ${styles.section}`}>
      <Backdrop src={`${import.meta.env.BASE_URL}images/backdrops/hands.jpg`} focus="center 55%" />
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

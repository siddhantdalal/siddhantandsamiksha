import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './Hashtag.module.css';

export default function Hashtag() {
  return (
    <section className="section">
      <ScrollReveal>
        <div className={styles.wrapper}>
          <p className={styles.label}>Share your moments with</p>
          <div className={styles.tags}>
            {content.hashtags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

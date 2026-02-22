import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './OurStory.module.css';

export default function OurStory() {
  return (
    <section id="our-story" className="section">
      <ScrollReveal>
        <div className={styles.wrapper}>
          <h2 className="section-heading">{content.ourStory.heading}</h2>
          <p className={styles.text}>{content.ourStory.text}</p>
        </div>
      </ScrollReveal>
    </section>
  );
}

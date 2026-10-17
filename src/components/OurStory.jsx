import { useContent } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';
import styles from './OurStory.module.css';

export default function OurStory() {
  const content = useContent();
  return (
    <section id="our-story" className="section">
      <ScrollReveal>
        <div className={styles.wrapper}>
          <SectionHeading>{content.ourStory.heading}</SectionHeading>
          <p className={styles.text}>{content.ourStory.text}</p>
        </div>
      </ScrollReveal>
    </section>
  );
}

import content from '../data/content';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';
import Backdrop from './Backdrop';
import styles from './OurStory.module.css';

export default function OurStory() {
  return (
    <section id="our-story" className="section has-backdrop">
      <Backdrop src={`${import.meta.env.BASE_URL}images/backdrops/couple-closeup.jpg`} focus="center 40%" />
      <ScrollReveal>
        <div className={styles.wrapper}>
          <SectionHeading>{content.ourStory.heading}</SectionHeading>
          <p className={styles.text}>{content.ourStory.text}</p>
        </div>
      </ScrollReveal>
    </section>
  );
}

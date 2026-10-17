import { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useSpring } from 'framer-motion';
import content from '../data/content';
import { useMediaQuery } from '../hooks/useMediaQuery';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';
import styles from './Timeline.module.css';

// Must match the breakpoint where the CSS moves every card right of the line
const SINGLE_COLUMN = '(max-width: 768px)';

// Each chapter card turns in like a book page hinged on the timeline (the
// spine): it starts folded back behind the line and swings flat. Left cards
// hinge on their right edge, right cards on their left (see transform-origin
// in the CSS), so the folded-away angle has the opposite sign.
const PAGE_FOLD = 80;

export default function Timeline() {
  const singleColumn = useMediaQuery(SINGLE_COLUMN);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 78%', 'end 55%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 26, restDelta: 0.001 });

  return (
    <section id="our-journey" className="section">
      <ScrollReveal>
        <SectionHeading>{content.timeline.heading}</SectionHeading>
        <p className="section-subheading">{content.timeline.subheading}</p>
      </ScrollReveal>

      <div ref={ref} className={styles.timelineInner}>
        <div className={styles.lineTrack} aria-hidden="true" />
        <motion.div className={styles.line} style={{ scaleY }} aria-hidden="true" />

        {content.timeline.events.map((event, i) => {
          const hingedRight = i % 2 === 0 && !singleColumn;
          return (
            <motion.div
              key={i}
              className={`${styles.item} ${i % 2 === 0 ? styles.left : styles.right}`}
              style={{ transformPerspective: 1200 }}
              initial={{ opacity: 0, rotateY: hingedRight ? -PAGE_FOLD : PAGE_FOLD }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.dot} />
              <div className={styles.card}>
                <span className={styles.chapter}>{content.ui.chapters[i] || `${i + 1}`}</span>
                <h3 className={styles.title}>{event.title}</h3>
                <p className={styles.desc}>{event.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

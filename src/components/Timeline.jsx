import { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useSpring } from 'framer-motion';
import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './Timeline.module.css';

export default function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 78%', 'end 55%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 26, restDelta: 0.001 });

  return (
    <section id="our-journey" className="section">
      <ScrollReveal>
        <h2 className="section-heading">{content.timeline.heading}</h2>
        <p className="section-subheading">{content.timeline.subheading}</p>
      </ScrollReveal>

      <div ref={ref} className={styles.timelineInner}>
        <div className={styles.lineTrack} aria-hidden="true" />
        <motion.div className={styles.line} style={{ scaleY }} aria-hidden="true" />

        {content.timeline.events.map((event, i) => (
          <motion.div
            key={i}
            className={`${styles.item} ${i % 2 === 0 ? styles.left : styles.right}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -46 : 46 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.dot} />
            <div className={styles.card}>
              <span className={styles.chapter}>Chapter {['One', 'Two', 'Three', 'Four', 'Five', 'Six'][i] || i + 1}</span>
              <h3 className={styles.title}>{event.title}</h3>
              <p className={styles.desc}>{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

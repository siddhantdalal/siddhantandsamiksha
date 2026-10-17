import { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

// A section title that starts tipped back like a card lying flat, then stands
// upright and sharpens from a soft blur as it scrolls up through the lower part
// of the screen. The motion sits on a wrapper so the heading's gold gradient
// text is never transformed directly (Safari can mis-render clipped text that is).
export default function SectionHeading({ children }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 60%'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const filter = useTransform(scrollYProgress, [0, 1], ['blur(8px)', 'blur(0px)']);

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? undefined : { rotateX, opacity, filter, transformPerspective: 700, originY: 1 }}
    >
      <h2 className="section-heading">{children}</h2>
    </motion.div>
  );
}

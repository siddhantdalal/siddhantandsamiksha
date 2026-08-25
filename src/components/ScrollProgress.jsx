// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useSpring } from 'framer-motion';

const barStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '2px',
  transformOrigin: '0%',
  background: 'linear-gradient(90deg, var(--color-gold-dark), var(--color-gold), var(--color-gold-light))',
  boxShadow: '0 0 12px rgba(214, 173, 96, 0.5)',
  zIndex: 10005,
};

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return <motion.div style={{ ...barStyle, scaleX }} aria-hidden="true" />;
}

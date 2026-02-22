import { useState, useEffect } from 'react';
import { content } from '../data/content';
import { useSide } from '../context/SideContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { side } = useSide();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <a href="#hero" className={styles.logo} onClick={(e) => handleClick(e, '#hero')}>
            <span className={styles.monogram}>
              <span className={styles.monoLeft}>
                {side === 'bride' ? content.couple.brideFirst[0] : content.couple.groomFirst[0]}
              </span>
              <span className={styles.monoAmp}>&</span>
              <span className={styles.monoRight}>
                {side === 'bride' ? content.couple.groomFirst[0] : content.couple.brideFirst[0]}
              </span>
            </span>
          </a>

          <ul className={styles.desktopLinks}>
            {content.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={(e) => handleClick(e, item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hamburger button — rendered outside nav for z-index independence */}
      <button
        className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile overlay */}
      <div className={`${styles.mobileOverlay} ${menuOpen ? styles.show : ''}`}>
        <ul className={styles.mobileLinks}>
          {content.nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={(e) => handleClick(e, item.href)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

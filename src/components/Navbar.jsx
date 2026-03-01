import { useState, useEffect } from 'react';

import { content } from '../data/content';
import { useSide } from '../context/SideContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { side } = useSide();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getLabel = (item) => {
    if (item.sideAware) {
      return side === 'bride' ? 'Meet the Groom' : 'Meet the Bride';
    }
    return item.label;
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.inner}>
          <a href="#hero" className={styles.logo} onClick={(e) => handleClick(e, '#hero')}>
            <img
              src={`${import.meta.env.BASE_URL}images/logo.png`}
              alt="S &amp; S"
              className={`${styles.logoImg} ${scrolled ? styles.logoSmall : ''}`}
            />
          </a>

          <ul className={styles.desktopLinks}>
            {content.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={(e) => handleClick(e, item.href)}>
                  {getLabel(item)}
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
                {getLabel(item)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

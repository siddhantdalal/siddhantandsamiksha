import content from '../data/content';
import { useSide } from '../context/SideContext';
import styles from './Navbar.module.css';

// Section links along the top on wider screens; phones have no menu
export default function Navbar() {
  const { side } = useSide();

  const handleClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const getLabel = (item) => {
    if (item.sideAware) {
      return side === 'bride' ? item.groomLabel : item.brideLabel;
    }
    return item.label;
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
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
  );
}

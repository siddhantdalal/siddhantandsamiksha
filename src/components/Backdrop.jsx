import styles from './Backdrop.module.css';

// A photo feathered softly into the page behind a section's text — atmosphere,
// not a focal image. Place it first inside an element with the global
// `has-backdrop` class, which clips it and keeps it behind that element's content.
// `focus` is the object-position that keeps the subject in frame.
export default function Backdrop({ src, focus = 'center' }) {
  return (
    <>
      <img src={src} alt="" aria-hidden="true" loading="lazy" className={styles.photo} style={{ objectPosition: focus }} />
      {/* Soft scrim so the text stays effortlessly readable over the photo */}
      <div className={styles.scrim} aria-hidden="true" />
    </>
  );
}

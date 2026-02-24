import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import { useSide } from '../context/SideContext';
import ScrollReveal from './ScrollReveal';
import { HomeIcon, GraduationIcon, BriefcaseIcon, BikeIcon, SparkleIcon } from './Icons';
import styles from './MeetGroom.module.css';

const detailIcons = {
  'Roots': <HomeIcon size={24} />,
  'The Scholar': <GraduationIcon size={24} />,
  'The Professional': <BriefcaseIcon size={24} />,
  'The Explorer': <BikeIcon size={24} />,
  'The People Person': <SparkleIcon size={24} />,
};

export default function MeetGroom() {
  const [open, setOpen] = useState(false);
  const [crewOpen, setCrewOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const { side } = useSide();

  // Bride's side sees the groom, groom's side sees the bride
  const data = side === 'bride' ? content.meetGroom : content.meetBride;

  const { photos, details } = data;

  // Interleave: photo, detail, photo, detail, ..., photo
  const items = [];
  for (let i = 0; i < Math.max(photos.length, details.length); i++) {
    if (i < photos.length) items.push({ type: 'photo', data: photos[i], index: i });
    if (i < details.length) items.push({ type: 'detail', data: details[i], index: i });
  }

  return (
    <section id="meet" className="section">
      <ScrollReveal>
        <h2 className="section-heading">{data.heading}</h2>
        <p className="section-subheading">{data.subheading}</p>
      </ScrollReveal>

      <ScrollReveal>
        <div className={styles.prompt}>
          <p className={styles.promptText}>{data.promptText}</p>
          <button
            className={`${styles.toggleBtn} ${open ? styles.toggleOpen : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Collapse' : 'Expand'}
          >
            <svg
              className={styles.chevron}
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </ScrollReveal>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.wrapper}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className={styles.inner}>
              <div className={styles.line} />
              {items.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  {item.type === 'photo' ? (
                    <div className={`${styles.block} ${item.index % 2 === 0 ? styles.left : styles.right}`}>
                      <div className={styles.dot} />
                      <div className={styles.photoCard} onClick={() => setLightbox(item.data)}>
                        <div className={styles.photoFrame}>
                          <img src={item.data.src} alt={item.data.alt} className={styles.photo} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={`${styles.block} ${item.index % 2 === 0 ? styles.right : styles.left}`}>
                      <div className={styles.dot} />
                      <div className={styles.detailCard}>
                        <span className={styles.icon}>{detailIcons[item.data.title]}</span>
                        <h3 className={styles.detailTitle}>{item.data.title}</h3>
                        <p className={styles.detailText}>{item.data.text}</p>
                      </div>
                    </div>
                  )}
                </ScrollReveal>
              ))}
            </div>

            {data.groomsmen && (
              <ScrollReveal>
                <div className={styles.crewSection}>
                  <h3 className={styles.crewHeading}>{data.groomsmen.heading}</h3>
                  <p className={styles.crewSubtext}>{data.groomsmen.promptText}</p>
                  <button
                    className={`${styles.toggleBtn} ${styles.crewToggle} ${crewOpen ? styles.toggleOpen : ''}`}
                    onClick={() => setCrewOpen(!crewOpen)}
                    aria-label={crewOpen ? 'Collapse crew' : 'Expand crew'}
                  >
                    <svg
                      className={styles.chevron}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {crewOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className={styles.crewGrid}>
                          {data.groomsmen.members.map((member, i) => (
                            <ScrollReveal key={i} delay={i * 0.08}>
                              <div className={styles.crewCard}>
                                <div className={styles.crewPhotoFrame} onClick={() => setLightbox({ src: member.photo, alt: member.name })}>
                                  <img src={member.photo} alt={member.name} className={styles.crewPhoto} />
                                </div>
                                <h4 className={styles.crewName}>{member.name}</h4>
                                <p className={styles.crewDesc}>{member.description}</p>
                              </div>
                            </ScrollReveal>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox.src}
              alt={lightbox.alt}
              className={styles.lightboxImg}
              initial={{ scale: 0.6, opacity: 0, rotate: -2, y: 40 }}
              animate={{ scale: 1, opacity: 1, rotate: 0, y: 0 }}
              exit={{ scale: 0.6, opacity: 0, rotate: 2, y: 40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

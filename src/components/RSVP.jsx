import { useState } from 'react';
import { content } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './RSVP.module.css';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  attendance: '',
  guests: '1',
  message: '',
};

export default function RSVP() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.attendance) errs.attendance = 'Please select attendance';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // UI-only — backend wired later
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="rsvp" className="section">
        <ScrollReveal>
          <div className={styles.success}>
            <span className={styles.successIcon}>✨</span>
            <h2 className="section-heading">Thank You!</h2>
            <p className={styles.successText}>{content.rsvp.successMessage}</p>
          </div>
        </ScrollReveal>
      </section>
    );
  }

  return (
    <section id="rsvp" className="section">
      <ScrollReveal>
        <h2 className="section-heading">{content.rsvp.heading}</h2>
        <p className="section-subheading">{content.rsvp.subheading}</p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="rsvp-name" className={styles.label}>Full Name *</label>
              <input
                id="rsvp-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                placeholder="Your full name"
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="rsvp-email" className={styles.label}>Email *</label>
              <input
                id="rsvp-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="your@email.com"
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="rsvp-phone" className={styles.label}>Phone</label>
              <input
                id="rsvp-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className={styles.input}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="rsvp-attendance" className={styles.label}>Attendance *</label>
              <select
                id="rsvp-attendance"
                name="attendance"
                value={form.attendance}
                onChange={handleChange}
                className={`${styles.input} ${styles.select} ${errors.attendance ? styles.inputError : ''}`}
              >
                <option value="">Select...</option>
                <option value="joyfully-accept">Joyfully Accept</option>
                <option value="regretfully-decline">Regretfully Decline</option>
              </select>
              {errors.attendance && <span className={styles.error}>{errors.attendance}</span>}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="rsvp-guests" className={styles.label}>Number of Guests</label>
              <select
                id="rsvp-guests"
                name="guests"
                value={form.guests}
                onChange={handleChange}
                className={`${styles.input} ${styles.select}`}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="rsvp-message" className={styles.label}>Message for the Couple</label>
            <textarea
              id="rsvp-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              className={`${styles.input} ${styles.textarea}`}
              placeholder="Share your wishes..."
              rows={4}
            />
          </div>

          <button type="submit" className={styles.submit}>
            Send RSVP
          </button>
        </form>
      </ScrollReveal>
    </section>
  );
}

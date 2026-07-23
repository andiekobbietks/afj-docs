import React, { useState } from 'react';
import styles from './styles.module.css';

const CLASSES = [
  { id: 1, name: 'Beginner Afro Foundations', level: 'beginner', levelLabel: 'Beginner', day: 'Mondays, 6:30pm', desc: 'Start from zero — posture, rhythm, and your first full routine across six weeks.', duration: '60 min', spots: '8 left' },
  { id: 2, name: 'Azonto Intermediate', level: 'intermediate', levelLabel: 'Intermediate', day: 'Wednesdays, 7pm', desc: 'Builds on the foundations class — faster footwork, hand flourishes, and freestyle sections.', duration: '75 min', spots: '4 left' },
  { id: 3, name: 'Performance Troupe', level: 'advanced', levelLabel: 'Advanced', day: 'Sundays, 4pm', desc: 'By audition. Choreography for showcases, festivals, and touring performances.', duration: '90 min', spots: '2 left' },
];

export default function ClassBookingFlow() {
  const [openIds, setOpenIds] = useState(new Set());
  const [bookedIds, setBookedIds] = useState(new Set());
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  };

  const toggleClass = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const bookClass = (id, e) => {
    e.stopPropagation();
    if (bookedIds.has(id)) return;
    const c = CLASSES.find((x) => x.id === id);
    setBookedIds((prev) => new Set(prev).add(id));
    showToast(`Booked — ${c.name}`);
  };

  const bookings = CLASSES.filter((c) => bookedIds.has(c.id));

  return (
    <div className={styles.wrap}>
      <div className={styles.bookingsPanel}>
        <p className={styles.bookingsTitle}>Your bookings</p>
        {bookings.length === 0 ? (
          <p className={styles.bookingsEmpty}>Nothing booked yet — tap a class below to book directly.</p>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className={styles.bookingChip}>
              <span>{b.name}</span>
              <span>{b.day}</span>
            </div>
          ))
        )}
      </div>

      <div className={styles.classList}>
        {CLASSES.map((c) => {
          const isOpen = openIds.has(c.id);
          const isBooked = bookedIds.has(c.id);
          return (
            <div key={c.id} className={isOpen ? `${styles.card} ${styles.cardOpen}` : styles.card}>
              <div
                className={styles.row}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-label={`${c.name}, expand details`}
                onClick={() => toggleClass(c.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggleClass(c.id))}
              >
                <div className={styles.thumb} />
                <div className={styles.main}>
                  <p className={styles.name}>{c.name}</p>
                  <p className={styles.meta}>
                    {c.day} · <span className={`${styles.levelTag} ${styles[c.level]}`}>{c.levelLabel}</span>
                  </p>
                </div>
                <span className={styles.chevron}>{isOpen ? '⌄' : '›'}</span>
              </div>

              {isOpen && (
                <div className={styles.detail}>
                  <p className={styles.desc}>{c.desc}</p>
                  <div className={styles.facts}>
                    <div className={styles.fact}><span className={styles.factLabel}>Duration</span>{c.duration}</div>
                    <div className={styles.fact}><span className={styles.factLabel}>Spots</span>{c.spots}</div>
                  </div>
                  <button
                    type="button"
                    className={isBooked ? `${styles.bookBtn} ${styles.booked}` : styles.bookBtn}
                    onClick={(e) => bookClass(c.id, e)}
                  >
                    {isBooked ? 'Booked ✓' : 'Book Class'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}

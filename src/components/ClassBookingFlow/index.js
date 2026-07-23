import React, { useState } from 'react';

const CLASSES = [
  { id: 1, name: 'Beginner Afro Foundations', level: 'beginner', levelLabel: 'Beginner', day: 'Mondays, 6:30pm', desc: 'Start from zero — posture, rhythm, and your first full routine across six weeks.', duration: '60 min', spots: '8 left' },
  { id: 2, name: 'Azonto Intermediate', level: 'intermediate', levelLabel: 'Intermediate', day: 'Wednesdays, 7pm', desc: 'Builds on the foundations class — faster footwork, hand flourishes, and freestyle sections.', duration: '75 min', spots: '4 left' },
  { id: 3, name: 'Performance Troupe', level: 'advanced', levelLabel: 'Advanced', day: 'Sundays, 4pm', desc: 'By audition. Choreography for showcases, festivals, and touring performances.', duration: '90 min', spots: '2 left' },
];
const LEVEL_BADGE = { beginner: 'text-bg-primary', intermediate: 'text-bg-secondary', advanced: 'text-bg-danger' };

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
      next.has(id) ? next.delete(id) : next.add(id);
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
    <div className="rounded-3 p-3 mx-auto position-relative" style={{ maxWidth: 420, background: 'var(--bg-base)', border: '1px solid var(--border)' }}>
      <div className="mb-3 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <p className="fw-bold mb-2" style={{ fontSize: 12, color: 'var(--text)' }}>Your bookings</p>
        {bookings.length === 0 ? (
          <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Nothing booked yet — tap a class below to book directly.</p>
        ) : (
          <ul className="list-group list-group-flush">
            {bookings.map((b) => (
              <li key={b.id} className="list-group-item d-flex justify-content-between" style={{ fontSize: 11 }}>
                <span>{b.name}</span><span>{b.day}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="accordion" id="classAccordion">
        {CLASSES.map((c) => {
          const isOpen = openIds.has(c.id);
          const isBooked = bookedIds.has(c.id);
          return (
            <div className="accordion-item" key={c.id}>
              <h2 className="accordion-header">
                <button
                  className={isOpen ? 'accordion-button' : 'accordion-button collapsed'}
                  type="button"
                  aria-expanded={isOpen}
                  aria-label={`${c.name}, expand details`}
                  onClick={() => toggleClass(c.id)}
                >
                  <div className="d-flex flex-column">
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</span>
                    <span style={{ fontSize: 11 }}>
                      {c.day} &middot; <span className={`badge ${LEVEL_BADGE[c.level]}`} style={{ fontSize: 9 }}>{c.levelLabel}</span>
                    </span>
                  </div>
                </button>
              </h2>
              <div className={isOpen ? 'accordion-collapse collapse show' : 'accordion-collapse collapse'}>
                <div className="accordion-body">
                  <p style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{c.desc}</p>
                  <div className="d-flex gap-4 mb-3">
                    <div>
                      <span className="d-block text-uppercase" style={{ fontSize: 9, color: 'var(--text-muted)' }}>Duration</span>
                      <span style={{ fontSize: 11 }}>{c.duration}</span>
                    </div>
                    <div>
                      <span className="d-block text-uppercase" style={{ fontSize: 9, color: 'var(--text-muted)' }}>Spots</span>
                      <span style={{ fontSize: 11 }}>{c.spots}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={isBooked ? 'btn btn-outline-primary w-100' : 'btn btn-primary w-100'}
                    disabled={isBooked}
                    onClick={(e) => bookClass(c.id, e)}
                  >
                    {isBooked ? 'Booked ✓' : 'Book Class'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {toast && (
        <div className="position-fixed bottom-0 start-50 translate-middle-x mb-3 px-3 py-2 rounded-pill" style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 12, zIndex: 1050 }}>
          {toast}
        </div>
      )}
    </div>
  );
}

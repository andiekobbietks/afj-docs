import React, { useState } from 'react';

const COURSES = [
  { name: 'Azonto fundamentals', meta: '4 lessons' },
  { name: 'Hip-life technique', meta: '6 lessons' },
  { name: 'Performance conditioning', meta: '3 lessons' },
  { name: 'Choreography building', meta: '5 lessons' },
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CourseSubscriptionFlow() {
  const [view, setView] = useState('teaser'); // teaser | gate | plans | library
  const [email, setEmail] = useState('');
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [plan, setPlan] = useState('monthly');
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  };

  const submitEmail = () => {
    if (!EMAIL_RE.test(email.trim())) {
      setEmailInvalid(true);
      showToast('Enter a valid email address');
      return;
    }
    setEmailInvalid(false);
    showToast('Early access confirmed');
    setView('plans');
  };

  const confirmSubscription = () => {
    showToast('Subscription started');
    setTimeout(() => setView('library'), 500);
  };

  return (
    <div className="rounded-3 p-4 mx-auto position-relative text-center" style={{ maxWidth: 420, background: 'var(--bg-base)', border: '1px solid var(--border)' }}>

      {view === 'teaser' && (
        <div>
          <p className="text-uppercase mb-2" style={{ fontSize: 10, letterSpacing: 1, color: 'var(--accent-1)' }}>Step 1 of 2</p>
          <h3 style={{ fontSize: 20, color: 'var(--text)' }}>Unlock the full course library</h3>
          <p className="mb-4" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Azonto, Hip-life, and performance technique — self-paced, cancel any time.</p>
          <button type="button" className="btn btn-primary w-100" onClick={() => setView('gate')}>Get early access</button>
        </div>
      )}

      {view === 'gate' && (
        <div>
          <p className="text-uppercase mb-2" style={{ fontSize: 10, letterSpacing: 1, color: 'var(--accent-1)' }}>Step 1 of 2</p>
          <h3 className="mb-3" style={{ fontSize: 18, color: 'var(--text)' }}>What's your email?</h3>
          <div className="mb-3 text-start">
            <input
              type="email"
              className={emailInvalid ? 'form-control is-invalid' : 'form-control'}
              placeholder="youremail@domain.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailInvalid(false); }}
            />
            {emailInvalid && <div className="invalid-feedback">Enter a valid email address.</div>}
          </div>
          <button type="button" className="btn btn-primary w-100" onClick={submitEmail}>Subscribe &amp; continue</button>
        </div>
      )}

      {view === 'plans' && (
        <div>
          <p className="text-uppercase mb-2" style={{ fontSize: 10, letterSpacing: 1, color: 'var(--accent-1)' }}>Step 2 of 2</p>
          <h3 className="mb-3" style={{ fontSize: 18, color: 'var(--text)' }}>Choose your plan</h3>
          <div className="d-flex flex-column gap-2 mb-3">
            {[
              { id: 'monthly', name: 'Monthly', price: '£6.99/mo', desc: 'Full course library, cancel any time' },
              { id: 'annual', name: 'Annual', badge: 'Save 20%', price: '£67/yr', desc: 'Same access, two months free' },
            ].map((p) => (
              <div
                key={p.id}
                className={plan === p.id ? 'card text-start border-primary' : 'card text-start'}
                role="button"
                tabIndex={0}
                aria-pressed={plan === p.id}
                aria-label={`${p.name} plan`}
                onClick={() => setPlan(p.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setPlan(p.id))}
              >
                <div className="card-body py-2 px-3">
                  <div className="d-flex justify-content-between">
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
                      {p.name}{p.badge && <span className="badge text-bg-primary ms-2" style={{ fontSize: 9 }}>{p.badge}</span>}
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--accent-1)' }}>{p.price}</span>
                  </div>
                  <p className="mb-0 mt-1" style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-primary w-100" onClick={confirmSubscription}>Start subscription</button>
        </div>
      )}

      {view === 'library' && (
        <div>
          <h3 className="mb-3" style={{ fontSize: 18, color: 'var(--text)' }}>Your library</h3>
          <div className="row row-cols-2 g-2 text-start">
            {COURSES.map((c) => (
              <div className="col" key={c.name}>
                <div className="card h-100">
                  <div className="d-flex align-items-center justify-content-center" style={{ aspectRatio: '16/10', background: 'linear-gradient(135deg, var(--bg-panel), var(--bg-offset))', fontSize: 20 }}>▶</div>
                  <div className="card-body p-2">
                    <p className="card-text mb-0" style={{ fontSize: 11 }}>{c.name}</p>
                    <p className="card-text mb-0" style={{ fontSize: 10, color: 'var(--text-muted)' }}>{c.meta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {toast && (
        <div className="position-fixed bottom-0 start-50 translate-middle-x mb-3 px-3 py-2 rounded-pill" style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 12, zIndex: 1050 }}>
          {toast}
        </div>
      )}
    </div>
  );
}

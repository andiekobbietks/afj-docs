import React from 'react';

export default function AdrCard({ number, title, status = 'Accepted', context, options, decision, reasoning }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        {number && <p className="text-uppercase mb-1" style={{ fontSize: 10, letterSpacing: 1, color: 'var(--text-muted)', fontWeight: 600 }}>{number}</p>}
        <span className="badge rounded-pill mb-2" style={{ fontSize: 9, background: 'var(--accent-1)', color: 'var(--bg-base)' }}>{status}</span>
        <h4 className="card-title" style={{ fontSize: 15 }}>{title}</h4>

        {[
          ['Context', context],
          ['Options considered', options],
          ['Decision', decision],
          ['Reasoning', reasoning],
        ].map(([label, body]) => (
          <div className="mb-3" key={label}>
            <p className="text-uppercase mb-1" style={{ fontSize: 9.5, letterSpacing: 1, color: 'var(--accent-2)', fontWeight: 600 }}>{label}</p>
            <p className="card-text mb-0" style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.65 }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

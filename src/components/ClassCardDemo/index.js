import React from 'react';

export default function ClassCardDemo() {
  return (
    <div className="rounded-3 p-4 mx-auto d-flex justify-content-center" style={{ maxWidth: 420, background: 'var(--bg-base)', border: '1px solid var(--border)' }}>
      <div className="card" style={{ width: 260 }}>
        <div className="card-body d-flex align-items-center gap-2 p-2">
          <div className="rounded" style={{ width: 40, height: 40, background: 'linear-gradient(135deg, var(--bg-panel), var(--bg-base))', flexShrink: 0 }} />
          <div>
            <p className="card-text mb-0" style={{ fontSize: 12.5, fontWeight: 600 }}>Azonto Intermediate</p>
            <p className="card-text mb-0" style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>
              Wednesdays, 7pm &middot; <span className="badge" style={{ fontSize: 9, background: 'var(--accent-1)', color: 'var(--bg-base)' }}>Intermediate</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

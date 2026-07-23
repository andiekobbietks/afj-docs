import React from 'react';

export default function ChangelogEntry({ title, children }) {
  return (
    <div className="card mb-2" style={{ borderLeft: '3px solid var(--accent-1)' }}>
      <div className="card-body py-2 px-3">
        <h4 className="card-title mb-1" style={{ fontSize: 13 }}>{title}</h4>
        <div className="card-text" style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{children}</div>
      </div>
    </div>
  );
}

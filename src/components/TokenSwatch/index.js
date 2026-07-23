import React from 'react';

export function TokenSwatchRow({ children }) {
  return <div className="d-flex flex-wrap gap-2 mb-4">{children}</div>;
}

export default function TokenSwatch({ color, label }) {
  return (
    <div style={{ width: 84 }}>
      <div className="rounded mb-1" style={{ height: 48, background: color, border: '1px solid var(--border)' }} />
      <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--bs-font-monospace)', wordBreak: 'break-all' }}>{label}</span>
    </div>
  );
}

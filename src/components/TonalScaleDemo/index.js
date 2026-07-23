import React from 'react';

export default function TonalScaleDemo() {
  const stops = [10, 20, 35, 50, 65, 80, 95];
  return (
    <div className="d-flex flex-wrap gap-1 p-3 rounded-3" style={{ background: 'var(--bg-base)', border: '1px solid var(--border)' }}>
      {stops.map((pct) => (
        <div key={pct} style={{ width: 44 }}>
          <div className="rounded mb-1" style={{ height: 44, background: `color-mix(in srgb, var(--accent-2) ${pct}%, var(--bg-base))` }} />
          <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{pct}%</span>
        </div>
      ))}
    </div>
  );
}

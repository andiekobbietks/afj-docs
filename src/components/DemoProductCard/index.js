import React from 'react';

export default function DemoProductCard() {
  return (
    <div className="p-4 rounded-3 d-flex justify-content-center" style={{ background: 'var(--bg-base)', border: '1px solid var(--border)' }}>
      <div className="card" style={{ width: '10rem' }}>
        <div className="position-relative" style={{ aspectRatio: '1', background: 'linear-gradient(135deg, var(--bg-panel), var(--bg-offset))' }}>
          <span className="badge text-bg-primary position-absolute top-0 start-0 m-2" style={{ fontSize: '9px' }}>Limited</span>
        </div>
        <div className="card-body p-2">
          <p className="card-text mb-0" style={{ fontSize: '12px' }}>Red hoodie</p>
          <p className="card-text mb-0" style={{ fontSize: '11px', color: 'var(--accent-1)' }}>£42.00</p>
        </div>
      </div>
    </div>
  );
}

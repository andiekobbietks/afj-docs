import React from 'react';

export default function AssemblyDemo() {
  return (
    <div className="p-3 rounded-3 d-flex flex-column gap-3" style={{ background: 'var(--bg-base)', border: '1px solid var(--border)' }}>
      <div className="row row-cols-4 g-2">
        {[1, 2, 3, 4].map((i) => (
          <div className="col" key={i}>
            <div className="rounded-2" style={{ aspectRatio: '1', background: 'linear-gradient(135deg, var(--bg-panel), var(--bg-offset))' }} />
          </div>
        ))}
      </div>
      <div className="card" style={{ width: 140 }}>
        <div className="card-body p-2">
          <p className="card-text mb-0" style={{ fontSize: 11 }}>Red hoodie</p>
          <p className="card-text mb-0" style={{ fontSize: 10, color: 'var(--accent-1)' }}>£42.00</p>
        </div>
      </div>
      <div className="input-group" style={{ maxWidth: 260 }}>
        <input type="email" className="form-control" placeholder="you@example.com" style={{ background: 'transparent', borderColor: 'var(--border)' }} />
        <button className="btn btn-outline-primary" type="button">Subscribe</button>
      </div>
    </div>
  );
}

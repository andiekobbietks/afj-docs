import React, { useState } from 'react';

export default function StoryCardDemo() {
  const [active, setActive] = useState(1);
  return (
    <div className="p-4 rounded-3 d-flex align-items-center gap-3" style={{ background: '#050507', border: '1px solid #232228' }}>
      <div className="card flex-grow-1" style={{ background: 'rgba(255,255,255,.05)', borderColor: 'rgba(255,255,255,.08)' }}>
        <div className="card-body">
          <p className="text-uppercase mb-1" style={{ fontSize: 9, letterSpacing: 1, color: '#8e8e93' }}>Step 01</p>
          <p className="mb-0" style={{ fontSize: 13, color: '#f5f5f7' }}>The signal</p>
        </div>
      </div>
      <div className="d-flex flex-column gap-2">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to step ${i + 1}`}
            className="rounded-circle p-0 border-0"
            style={{ width: 8, height: 8, background: i === active ? '#ff3344' : 'rgba(255,255,255,.2)', boxShadow: i === active ? '0 0 6px #ff3344' : 'none' }}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}

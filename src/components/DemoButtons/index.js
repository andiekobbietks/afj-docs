import React from 'react';

export default function DemoButtons() {
  return (
    <div className="p-4 rounded-3 d-flex justify-content-center gap-2 flex-wrap" style={{ background: 'var(--bg-base)', border: '1px solid var(--border)' }}>
      <button type="button" className="btn btn-primary">Book a class</button>
      <button type="button" className="btn btn-outline-primary">View basket</button>
    </div>
  );
}

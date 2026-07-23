import React from 'react';

export default function ManifestoDemo() {
  return (
    <div className="p-5 rounded-3 text-center" style={{ background: '#050507', border: '1px solid #232228' }}>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 600, color: '#f5f5f7', lineHeight: 1.4 }}>
        It doesn't just <span style={{ color: '#ff3344', fontWeight: 800 }}>entertain</span> — it{' '}
        <span style={{ color: '#f39c12', fontWeight: 800 }}>expresses</span> identity.
      </p>
    </div>
  );
}

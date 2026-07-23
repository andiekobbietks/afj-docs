import React from 'react';

export default function ScrollyHeroDemo() {
  return (
    <div className="p-5 rounded-3 text-center" style={{ background: '#050507', border: '1px solid #232228' }}>
      <div className="rounded-circle mx-auto mb-3" style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #f39c12, #ff3344)' }} />
      <h1 className="mb-3" style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, textTransform: 'uppercase', fontSize: 28,
        background: 'linear-gradient(135deg, #f5f5f7 30%, #f39c12 70%, #ff3344 100%)',
        WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        Impact through dance
      </h1>
      <button type="button" className="btn btn-outline-light rounded-pill px-4">Begin scroll</button>
    </div>
  );
}

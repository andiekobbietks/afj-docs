import React from 'react';

export default function NewsletterInputDemo() {
  return (
    <div className="p-3 rounded-3" style={{ background: 'var(--bg-base)', border: '1px solid var(--border)' }}>
      <div className="input-group">
        <input type="email" className="form-control" placeholder="you@example.com" style={{ background: 'transparent', borderColor: 'var(--border)' }} />
        <button className="btn btn-outline-primary" type="button">Subscribe</button>
      </div>
    </div>
  );
}

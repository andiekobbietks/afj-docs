import React from 'react';

export default function SignupDemo() {
  return (
    <div className="p-4 rounded-3" style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)' }}>
      <div className="input-group">
        <input type="email" className="form-control" placeholder="you@example.com" style={{ background: 'transparent', borderColor: 'rgba(255,255,255,.15)', color: '#f5f5f7' }} />
        <button className="btn" type="button" style={{ background: 'linear-gradient(135deg,#f39c12,#ff3344)', color: '#050507', borderRadius: '50px' }}>Notify me</button>
      </div>
    </div>
  );
}

import React from 'react';

export default function CartDrawerDemo() {
  const items = [
    { name: 'Red hoodie', size: 'M', price: 42 },
    { name: 'AFJ cap', size: '-', price: 18 },
  ];
  return (
    <div className="rounded-3 p-3 mx-auto position-relative overflow-hidden" style={{ maxWidth: 420, height: 320, background: 'var(--bg-base)', border: '1px solid var(--border)' }}>
      <p className="mb-3" style={{ fontSize: 11, color: 'var(--text-muted)' }}>Product grid (behind the drawer)</p>
      <div className="offcanvas offcanvas-end show position-absolute" style={{ visibility: 'visible', width: 260, top: 0, bottom: 0 }} tabIndex={-1}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" style={{ fontSize: 14 }}>Your basket</h5>
          <button type="button" className="btn-close" aria-label="Close cart" />
        </div>
        <div className="offcanvas-body">
          <ul className="list-group list-group-flush mb-3">
            {items.map((item) => (
              <li key={item.name} className="list-group-item d-flex align-items-center gap-2">
                <div className="rounded" style={{ width: 30, height: 30, background: 'var(--bg-panel)', flexShrink: 0 }} />
                <div className="flex-grow-1">
                  <p className="mb-0" style={{ fontSize: 11 }}>{item.name}</p>
                  <p className="mb-0" style={{ fontSize: 10, color: 'var(--text-muted)' }}>Size {item.size} &middot; £{item.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn-primary w-100">Checkout</button>
        </div>
      </div>
    </div>
  );
}

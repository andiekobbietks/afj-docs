import React, { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Medium tote', price: 24, badgeText: 'New drop' },
  { id: 2, name: 'Red hoodie', price: 42, badgeText: 'Limited' },
  { id: 3, name: 'AFJ cap', price: 18, badgeText: '' },
  { id: 4, name: 'Studio tee', price: 20, badgeText: 'Unisex' },
];
const SIZES = ['S', 'M', 'L', 'XL'];

export default function ShopFlow() {
  const [view, setView] = useState('grid');
  const [activeProduct, setActiveProduct] = useState(null);
  const [size, setSize] = useState('M');
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  };

  const openDetail = (product) => {
    setActiveProduct(product);
    setSize('M');
    setQty(1);
    setView('detail');
  };

  const addToCart = () => {
    setCart((prev) => [...prev, { ...activeProduct, size, qty }]);
    showToast('Added to basket');
    setCartOpen(true);
  };

  const removeFromCart = (index) => setCart((prev) => prev.filter((_, i) => i !== index));
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="rounded-3 p-3 position-relative mx-auto" style={{ maxWidth: 420, background: 'var(--bg-base)', border: '1px solid var(--border)' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button type="button" className="btn btn-link p-0 text-decoration-none fw-bold" style={{ color: 'var(--text)' }} onClick={() => setView('grid')}>
          AFJ Shop
        </button>
        <button type="button" className="btn btn-link p-0 position-relative" style={{ color: 'var(--text)' }} aria-label="Open cart" onClick={() => setCartOpen(true)}>
          <span aria-hidden="true">&#128717;</span>
          <span className="badge rounded-pill text-bg-primary position-absolute top-0 start-100 translate-middle" style={{ fontSize: 9 }}>{cart.length}</span>
        </button>
      </div>

      {view === 'grid' && (
        <div className="row row-cols-2 g-2">
          {PRODUCTS.map((p) => (
            <div className="col" key={p.id}>
              <div className="card h-100" role="button" tabIndex={0} aria-label={`View ${p.name}`}
                onClick={() => openDetail(p)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openDetail(p))}>
                <div className="position-relative" style={{ aspectRatio: '1', background: 'linear-gradient(135deg, var(--bg-panel), var(--bg-offset))' }}>
                  {p.badgeText && <span className="badge text-bg-primary position-absolute top-0 start-0 m-2" style={{ fontSize: 9 }}>{p.badgeText}</span>}
                </div>
                <div className="card-body p-2">
                  <p className="card-text mb-0" style={{ fontSize: 12 }}>{p.name}</p>
                  <p className="card-text mb-0" style={{ fontSize: 11, color: 'var(--text-muted)' }}>£{p.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'detail' && activeProduct && (
        <div>
          <button type="button" className="btn btn-link p-0 mb-3" style={{ fontSize: 12, color: 'var(--text-muted)' }} onClick={() => setView('grid')}>
            &larr; Back to shop
          </button>
          <div className="rounded-3 mb-3" style={{ aspectRatio: '16/10', background: 'linear-gradient(135deg, var(--bg-panel), var(--bg-offset))' }} />
          <h3 style={{ fontSize: 16, color: 'var(--text)' }}>{activeProduct.name}</h3>
          <p style={{ fontSize: 14, color: 'var(--accent-1)' }}>£{activeProduct.price.toFixed(2)}</p>

          <div className="btn-group mb-3" role="group" aria-label="Select size">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                className={s === size ? 'btn btn-primary' : 'btn btn-outline-primary'}
                aria-pressed={s === size}
                aria-label={`Size ${s}`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="d-flex align-items-center gap-3 mb-3">
            <button type="button" className="btn btn-outline-secondary btn-sm" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>&minus;</button>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{qty}</span>
            <button type="button" className="btn btn-outline-secondary btn-sm" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>+</button>
          </div>

          <button type="button" className="btn btn-primary w-100" onClick={addToCart}>Add to basket</button>
        </div>
      )}

      {view === 'checkout' && (
        <div>
          <button type="button" className="btn btn-link p-0 mb-3" style={{ fontSize: 12, color: 'var(--text-muted)' }} onClick={() => setView('grid')}>
            &larr; Back to basket
          </button>
          <h3 style={{ fontSize: 16, color: 'var(--text)' }}>Checkout</h3>
          <p style={{ fontSize: 14, color: 'var(--accent-1)' }}>Total: £{subtotal.toFixed(2)}</p>
          <button type="button" className="btn btn-primary w-100" onClick={() => { setView('confirm'); setCart([]); showToast('Order placed'); }}>
            Place order
          </button>
        </div>
      )}

      {view === 'confirm' && (
        <div>
          <p style={{ fontSize: 16, color: 'var(--text)' }}>Order confirmed &#10003;</p>
          <button type="button" className="btn btn-primary w-100" onClick={() => setView('grid')}>Back to shop</button>
        </div>
      )}

      {cartOpen && (
        <>
          <div className="position-fixed top-0 start-0 w-100 h-100" style={{ background: 'rgba(0,0,0,.5)', zIndex: 1040 }} onClick={() => setCartOpen(false)} />
          <div className="offcanvas offcanvas-end show" style={{ visibility: 'visible', width: 300, zIndex: 1045 }} tabIndex={-1}>
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Your basket</h5>
              <button type="button" className="btn-close" aria-label="Close cart" onClick={() => setCartOpen(false)} />
            </div>
            <div className="offcanvas-body">
              {cart.length === 0 ? (
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Your basket is empty.</p>
              ) : (
                <ul className="list-group list-group-flush mb-3">
                  {cart.map((item, i) => (
                    <li key={i} className="list-group-item d-flex align-items-center gap-2">
                      <div className="rounded" style={{ width: 34, height: 34, background: 'var(--bg-panel)', flexShrink: 0 }} />
                      <div className="flex-grow-1">
                        <p className="mb-0" style={{ fontSize: 11 }}>{item.name}</p>
                        <p className="mb-0" style={{ fontSize: 10, color: 'var(--text-muted)' }}>Size {item.size} &middot; £{item.price.toFixed(2)}</p>
                      </div>
                      <button type="button" className="btn btn-link btn-sm p-0" style={{ fontSize: 10, color: 'var(--accent-2)' }} aria-label="Remove item from cart" onClick={() => removeFromCart(i)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {cart.length > 0 && (
                <>
                  <div className="d-flex justify-content-between fw-bold mb-3" style={{ fontSize: 13 }}>
                    <span>Subtotal</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  <button type="button" className="btn btn-primary w-100" onClick={() => { setCartOpen(false); setView('checkout'); }}>
                    Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {toast && (
        <div className="position-fixed bottom-0 start-50 translate-middle-x mb-3 px-3 py-2 rounded-pill" style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 12, zIndex: 1050 }}>
          {toast}
        </div>
      )}
    </div>
  );
}

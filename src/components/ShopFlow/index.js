import React, { useState } from 'react';
import styles from './styles.module.css';

const PRODUCTS = [
  { id: 1, name: 'Medium tote', price: 24, badgeText: 'New drop' },
  { id: 2, name: 'Red hoodie', price: 42, badgeText: 'Limited' },
  { id: 3, name: 'AFJ cap', price: 18, badgeText: '' },
  { id: 4, name: 'Studio tee', price: 20, badgeText: 'Unisex' },
];
const SIZES = ['S', 'M', 'L', 'XL'];

export default function ShopFlow() {
  const [view, setView] = useState('grid'); // grid | detail | checkout | confirm
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

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className={styles.shop}>
      <div className={styles.topbar}>
        <button type="button" className={styles.brand} onClick={() => setView('grid')} aria-label="Go to shop home">
          AFJ Shop
        </button>
        <button type="button" className={styles.cartBtn} onClick={() => setCartOpen(true)} aria-label="Open cart">
          🛍<span className={styles.cartCount}>{cart.length}</span>
        </button>
      </div>

      {view === 'grid' && (
        <div className={styles.grid}>
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className={styles.card}
              role="button"
              tabIndex={0}
              aria-label={`View ${p.name}`}
              onClick={() => openDetail(p)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openDetail(p))}
            >
              <div className={styles.thumb}>
                {p.badgeText && <span className={styles.badge}>{p.badgeText}</span>}
              </div>
              <p className={styles.name}>{p.name}</p>
              <p className={styles.price}>£{p.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}

      {view === 'detail' && activeProduct && (
        <div className={styles.detail}>
          <button type="button" className={styles.backBtn} onClick={() => setView('grid')}>
            ← Back to shop
          </button>
          <div className={styles.detailThumb} />
          <h3 className={styles.detailName}>{activeProduct.name}</h3>
          <p className={styles.detailPrice}>£{activeProduct.price.toFixed(2)}</p>

          <div className={styles.sizeRow}>
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                className={s === size ? `${styles.sizeOpt} ${styles.sizeSelected}` : styles.sizeOpt}
                aria-pressed={s === size}
                aria-label={`Size ${s}`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className={styles.qtyRow}>
            <button type="button" className={styles.qtyBtn} aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>
              −
            </button>
            <span className={styles.qtyVal}>{qty}</span>
            <button type="button" className={styles.qtyBtn} aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>
              +
            </button>
          </div>

          <button type="button" className={styles.addBtn} onClick={addToCart}>
            Add to basket
          </button>
        </div>
      )}

      {cartOpen && (
        <>
          <div className={styles.scrim} aria-hidden="true" onClick={() => setCartOpen(false)} />
          <div className={styles.drawer}>
            <div className={styles.drawerHeader}>
              <h4>Your basket</h4>
              <button type="button" className={styles.backBtn} aria-label="Close cart" onClick={() => setCartOpen(false)}>
                ×
              </button>
            </div>
            {cart.length === 0 ? (
              <p className={styles.emptyCart}>Your basket is empty.</p>
            ) : (
              cart.map((item, i) => (
                <div key={i} className={styles.cartLine}>
                  <div className={styles.cartLineThumb} />
                  <div className={styles.cartLineInfo}>
                    <p>{item.name}</p>
                    <p className={styles.cartLineMeta}>Size {item.size} · £{item.price.toFixed(2)}</p>
                  </div>
                  <button type="button" className={styles.cartRemove} aria-label="Remove item from cart" onClick={() => removeFromCart(i)}>
                    Remove
                  </button>
                </div>
              ))
            )}
            {cart.length > 0 && (
              <>
                <div className={styles.subtotalRow}>
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <button type="button" className={styles.checkoutBtn} onClick={() => { setCartOpen(false); setView('checkout'); }}>
                  Checkout
                </button>
              </>
            )}
          </div>
        </>
      )}

      {view === 'checkout' && (
        <div className={styles.detail}>
          <button type="button" className={styles.backBtn} onClick={() => setView('grid')}>
            ← Back to basket
          </button>
          <h3 className={styles.detailName}>Checkout</h3>
          <p className={styles.detailPrice}>Total: £{subtotal.toFixed(2)}</p>
          <button
            type="button"
            className={styles.addBtn}
            onClick={() => { setView('confirm'); setCart([]); showToast('Order placed'); }}
          >
            Place order
          </button>
        </div>
      )}

      {view === 'confirm' && (
        <div className={styles.detail}>
          <p className={styles.detailName}>Order confirmed ✓</p>
          <button type="button" className={styles.addBtn} onClick={() => setView('grid')}>
            Back to shop
          </button>
        </div>
      )}

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}

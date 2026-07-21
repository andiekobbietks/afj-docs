import React, { useEffect, useState, useCallback } from 'react';
import styles from './styles.module.css';

// Mirrors the accessibility menu documented on the sister site
// (afj-cardiff-brief.netlify.app/design-system#accessibility-menu-settings):
// same six controls, same localStorage key, so the two sites behave
// identically for anyone who uses both.
const STORAGE_KEY = 'afj-accessibility-settings';

const DEFAULTS = {
  textSize: 100,       // 75-150, step 5 — WCAG 1.4.4
  highContrast: false, // WCAG 1.4.6
  hyperlegible: false, // WCAG 1.4.12 — swaps body font to Atkinson Hyperlegible Next
  reduceMotion: false, // WCAG 2.3.3
  underlineLinks: false, // WCAG 1.4.1
  largeCursor: false,
};

function loadSettings() {
  if (typeof window === 'undefined') return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

function applySettings(s) {
  const root = document.documentElement;
  root.style.fontSize = `${s.textSize}%`;
  root.setAttribute('data-a11y-contrast', s.highContrast ? 'high' : 'normal');
  root.setAttribute('data-a11y-font', s.hyperlegible ? 'hyperlegible' : 'default');
  root.setAttribute('data-a11y-motion', s.reduceMotion ? 'reduce' : 'normal');
  root.setAttribute('data-a11y-underline', String(s.underlineLinks));
  root.setAttribute('data-a11y-cursor', s.largeCursor ? 'large' : 'normal');
}

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(DEFAULTS);

  useEffect(() => {
    const loaded = loadSettings();
    setSettings(loaded);
    applySettings(loaded);
  }, []);

  const update = useCallback((patch) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      applySettings(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // storage unavailable — settings still apply for this session
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => update(DEFAULTS), [update]);

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label={open ? 'Close accessibility menu' : 'Open accessibility menu'}
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden="true">A+</span>
      </button>

      {open && (
        <div
          id="a11y-panel"
          role="dialog"
          aria-label="Accessibility settings"
          className={styles.panel}
        >
          <div className={styles.row}>
            <label htmlFor="a11y-textsize">Text size — {settings.textSize}%</label>
            <input
              id="a11y-textsize"
              type="range"
              min={75}
              max={150}
              step={5}
              value={settings.textSize}
              onChange={(e) => update({ textSize: Number(e.target.value) })}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="a11y-contrast">High contrast</label>
            <input
              id="a11y-contrast"
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) => update({ highContrast: e.target.checked })}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="a11y-font">Hyperlegible font</label>
            <input
              id="a11y-font"
              type="checkbox"
              checked={settings.hyperlegible}
              onChange={(e) => update({ hyperlegible: e.target.checked })}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="a11y-motion">Reduce motion</label>
            <input
              id="a11y-motion"
              type="checkbox"
              checked={settings.reduceMotion}
              onChange={(e) => update({ reduceMotion: e.target.checked })}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="a11y-underline">Underline links</label>
            <input
              id="a11y-underline"
              type="checkbox"
              checked={settings.underlineLinks}
              onChange={(e) => update({ underlineLinks: e.target.checked })}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="a11y-cursor">Large cursor</label>
            <input
              id="a11y-cursor"
              type="checkbox"
              checked={settings.largeCursor}
              onChange={(e) => update({ largeCursor: e.target.checked })}
            />
          </div>

          <button type="button" className={styles.reset} onClick={reset}>
            Reset to defaults
          </button>
        </div>
      )}
    </div>
  );
}

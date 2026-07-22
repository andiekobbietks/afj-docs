import React from 'react';
import { useSiteTheme, THEMES } from '@site/src/contexts/SiteThemeContext';
import styles from './styles.module.css';

const LABELS = {
  wine: 'Wine / Gold',
  scrolly: 'Scrollytelling',
  day: 'Day mode',
  scrollyday: 'Scrolly Day',
};

export default function SiteThemeToggle() {
  const { theme, mode, setTheme, toggleMode, hydrated } = useSiteTheme();

  if (!hydrated) {
    // Render nothing until localStorage has been read client-side, rather
    // than flashing the default theme and then snapping to the saved one.
    return null;
  }

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.modeSwitch}
        onClick={toggleMode}
        aria-label={mode === 'day' ? 'Switch to night mode' : 'Switch to day mode'}
        title="Toggle site day/night — chrome only, not the four component themes"
      >
        <span aria-hidden="true">{mode === 'day' ? '☀️' : '🌙'}</span>
      </button>
      <div className={styles.themeToggle} role="group" aria-label="Component theme">
        {THEMES.map((t) => (
          <button
            key={t}
            type="button"
            className={t === theme ? `${styles.themeBtn} ${styles[`active-${t}`]}` : styles.themeBtn}
            onClick={() => setTheme(t)}
            aria-pressed={t === theme}
          >
            {LABELS[t]}
          </button>
        ))}
      </div>
    </div>
  );
}

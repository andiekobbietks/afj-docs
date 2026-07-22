import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'afj-site-theme-state';
const THEMES = ['wine', 'scrolly', 'day', 'scrollyday'];
const DEFAULTS = { theme: 'wine', mode: 'dark' };

const SiteThemeContext = createContext(DEFAULTS);

function loadState() {
  if (typeof window === 'undefined') return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS };
  } catch {
    return { ...DEFAULTS };
  }
}

function applyState(state) {
  const root = document.documentElement;
  root.setAttribute('data-afj-theme', state.theme);
  root.setAttribute('data-afj-mode', state.mode);
}

export function SiteThemeProvider({ children }) {
  const [state, setState] = useState(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadState();
    setState(loaded);
    applyState(loaded);
    setHydrated(true);
  }, []);

  const setTheme = useCallback((theme) => {
    if (!THEMES.includes(theme)) return;
    setState((prev) => {
      const next = { ...prev, theme };
      applyState(next);
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const toggleMode = useCallback(() => {
    setState((prev) => {
      const next = { ...prev, mode: prev.mode === 'dark' ? 'day' : 'dark' };
      applyState(next);
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  // Avoid a flash of the default theme before localStorage is read on
  // first client render — render children immediately either way, since
  // withholding them would break SSR/hydration, but the attributes are
  // set as early as this effect can run.
  return (
    <SiteThemeContext.Provider value={{ ...state, setTheme, toggleMode, hydrated }}>
      {children}
    </SiteThemeContext.Provider>
  );
}

export function useSiteTheme() {
  return useContext(SiteThemeContext);
}

export { THEMES };

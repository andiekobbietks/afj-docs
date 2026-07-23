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

  const THEME_IMPLIED_MODE = { wine: 'dark', scrolly: 'dark', day: 'day', scrollyday: 'day' };

const setTheme = useCallback((theme) => {
    if (!THEMES.includes(theme)) return;
    setState((prev) => {
      // Site chrome (sidebar/navbar) has its own independent day/night
      // toggle by design — but leaving it un-synced meant picking the
      // "Day" THEME left the sidebar showing dark-mode text on a now-light
      // page, an unreadable combination a real contrast audit caught
      // (1.07:1 ratio). Defaulting the mode to match the theme fixes the
      // common case; the separate toggle can still override it afterward
      // if a deliberately mismatched combination is ever wanted.
      const next = { ...prev, theme, mode: THEME_IMPLIED_MODE[theme] };
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

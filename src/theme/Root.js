import React from 'react';
import AccessibilityMenu from '@site/src/components/AccessibilityMenu';
import { SiteThemeProvider } from '@site/src/contexts/SiteThemeContext';

// Docusaurus renders this wrapper around the entire app on every route,
// so the site theme (four component themes + independent day/night site
// chrome) and the accessibility menu are both present globally, not just
// on pages that happen to import them.
export default function Root({ children }) {
  return (
    <SiteThemeProvider>
      {children}
      <AccessibilityMenu />
    </SiteThemeProvider>
  );
}

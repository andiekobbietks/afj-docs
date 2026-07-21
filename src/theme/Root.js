import React from 'react';
import AccessibilityMenu from '@site/src/components/AccessibilityMenu';

// Docusaurus renders this wrapper around the entire app on every route,
// so the accessibility menu — and whatever the person set last time,
// via localStorage — is present site-wide, not just on pages that
// happen to import it.
export default function Root({ children }) {
  return (
    <>
      {children}
      <AccessibilityMenu />
    </>
  );
}

import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const CARDS = [
  { id: 'component-library', title: 'Component Library', desc: 'Buttons, cards, cart drawer, class booking card, gallery, carousel, tonal scale.' },
  { id: 'icon-library', title: 'Icon Library', desc: 'Full Lucide icon set by site section — core UI, commerce, classes, internal ops.' },
  { id: 'ui-mockups', title: 'UI Mockups', desc: '11 high-fidelity page mockups across all four themes, homepage through internal ops.' },
  { id: 'for-graphic-designers', title: 'For Graphic Designers', desc: 'Print/CMYK constraints, minimum size, clear space, redraw source material.' },
  { id: 'for-videographers', title: 'For Videographers', desc: 'The logo assembly video, motion/looping rules, framing per theme.' },
  { id: 'live-site-status', title: 'How This Fits the Live Site', desc: 'Honest status of the real production build vs. this reference library.' },
];

export default function Home() {
  return (
    <Layout
      title="AFJ Cardiff Design System"
      description="Component library, icon library, and UI mockups — eng/product/marketing handoff"
    >
      <header className={styles.hero}>
        <div className={styles.heroMark} />
        <h1 className={styles.heroTitle}>AFJ Cardiff Design System</h1>
        <p className={styles.heroSub}>
          Component library, icon library, and UI mockups for developer, designer, and videographer handoff.
          This is eng/product/marketing-facing — not the IP audit, which stays on its own separate site.
        </p>
      </header>
      <main className={styles.grid}>
        {CARDS.map((c) => (
          <Link key={c.id} to={`/docs/${c.id}`} className={styles.card}>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </Link>
        ))}
      </main>
    </Layout>
  );
}

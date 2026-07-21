import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const CARDS = [
  { id: 'orientation', title: 'Orientation', desc: 'Start here, about this site, glossary — how to actually use this library.' },
  { id: 'foundations', title: 'Foundations', desc: 'Design tokens, typography, and the icon system.' },
  { id: 'icon-library', title: 'Icon Library', desc: 'Full Lucide icon set by site section — core UI, commerce, classes, internal ops.' },
  { id: 'brand-source', title: 'Brand Source', desc: 'Real logo imagery and typeface families.' },
  { id: 'for-graphic-designers', title: 'For Graphic Designers', desc: 'Print/CMYK constraints, minimum size, clear space, redraw source material.' },
  { id: 'for-videographers', title: 'For Videographers', desc: 'The logo assembly video, motion/looping rules, framing per theme.' },
  { id: 'core-ui', title: 'Core UI', desc: 'Buttons and the product card — the base primitives.' },
  { id: 'commerce', title: 'Commerce', desc: 'Cart drawer and class booking card.' },
  { id: 'customer-journeys', title: 'Customer Journeys', desc: 'The six complete end-to-end mockup files.' },
  { id: 'ui-mockups', title: 'UI Mockups', desc: '11 high-fidelity page mockups across all four themes.' },
  { id: 'scrollytelling', title: 'Scrollytelling Experience', desc: 'Pixel-sampled source values and every component built from them.' },
  { id: 'more-ui-kit', title: 'More UI Kit', desc: 'Gallery grid, carousel, interactive input, wine tonal scale.' },
  { id: 'assembly-compare', title: 'Assembly & Compare', desc: 'How primitives assemble into real flows, and how the two themes divide responsibilities.' },
  { id: 'motion', title: 'Motion', desc: 'Where Lottie fits in the system.' },
  { id: 'process-adrs', title: 'Process & ADRs', desc: 'Every Architecture Decision Record, in context → options → decision → reasoning format.' },
  { id: 'history', title: 'History', desc: 'Changelog, roadmap, and the downloadable real assets.' },
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

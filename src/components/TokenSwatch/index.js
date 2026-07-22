import React from 'react';
import styles from './styles.module.css';

export function TokenSwatchRow({ children }) {
  return <div className={styles.row}>{children}</div>;
}

export default function TokenSwatch({ color, label }) {
  return (
    <div className={styles.swatch}>
      <div className={styles.fill} style={{ background: color }} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}

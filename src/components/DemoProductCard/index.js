import React from 'react';
import styles from './styles.module.css';

export default function DemoProductCard() {
  return (
    <div className={styles.previewBox}>
      <div className={styles.card}>
        <div className={styles.thumb}>
          <span className={styles.badge}>Limited</span>
        </div>
        <div className={styles.info}>
          <p className={styles.name}>Red hoodie</p>
          <p className={styles.price}>£42.00</p>
        </div>
      </div>
    </div>
  );
}

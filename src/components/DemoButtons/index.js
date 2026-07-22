import React from 'react';
import styles from './styles.module.css';

export default function DemoButtons() {
  return (
    <div className={styles.previewBox}>
      <div className={styles.row}>
        <button className={`${styles.btn} ${styles.primary}`}>Book a class</button>
        <button className={`${styles.btn} ${styles.outline}`}>View basket</button>
      </div>
    </div>
  );
}

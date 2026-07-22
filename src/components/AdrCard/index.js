import React from 'react';
import styles from './styles.module.css';

export default function AdrCard({ number, title, status = 'Accepted', context, options, decision, reasoning }) {
  return (
    <div className={styles.card}>
      {number && <p className={styles.number}>{number}</p>}
      <span className={styles.status}>{status}</span>
      <h4 className={styles.title}>{title}</h4>

      <div className={styles.field}>
        <p className={styles.fieldLabel}>Context</p>
        <div className={styles.fieldBody}>{context}</div>
      </div>
      <div className={styles.field}>
        <p className={styles.fieldLabel}>Options considered</p>
        <div className={styles.fieldBody}>{options}</div>
      </div>
      <div className={styles.field}>
        <p className={styles.fieldLabel}>Decision</p>
        <div className={styles.fieldBody}>{decision}</div>
      </div>
      <div className={styles.field}>
        <p className={styles.fieldLabel}>Reasoning</p>
        <div className={styles.fieldBody}>{reasoning}</div>
      </div>
    </div>
  );
}

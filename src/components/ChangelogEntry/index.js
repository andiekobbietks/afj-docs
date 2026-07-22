import React from 'react';
import styles from './styles.module.css';

export default function ChangelogEntry({ title, children }) {
  return (
    <div className={styles.entry}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

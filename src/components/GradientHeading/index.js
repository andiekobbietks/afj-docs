import React from 'react';
import styles from './styles.module.css';

export default function GradientHeading({ as: Tag = 'p', children }) {
  return <Tag className={styles.heading}>{children}</Tag>;
}

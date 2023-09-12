import React from 'react';
import styles from '../../styles/LoadingPopup.module.css'


const LoadingPopup = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <p>Waiting for players...</p>
      </div>
    </div>
  );
};

export default LoadingPopup;

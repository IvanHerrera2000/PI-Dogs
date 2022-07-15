import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/LandingPage.module.css';

function LandingPage() {
  return (
    <div className={styles.backgroud}>
      <div className={styles.container}>
        <h1 className={styles.title}>Woof Woof?</h1>
        <Link to="/home">
          <button className={styles.btn}>WOOF!</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;

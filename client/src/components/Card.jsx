import React from 'react';
import styles from '../styles/Card.module.css';

function Card({ name, img, weight_min, weight_max }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.name}>{name}</h2>
      <img
        className={styles.img}
        src={img}
        alt="img not found"
        width="350px"
        height="300px"
      />
      <h5 className={styles.weight}>
        {weight_min}kg - {weight_max}kg
      </h5>
    </div>
  );
}

export default Card;

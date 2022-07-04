import React from 'react';
import styles from '../styles/Card.module.css';

function Card({ name, img, temperament, weight_min, weight_max }) {
  return (
    <div>
      <h2>{name}</h2>
      <img src={img} alt="img not found" width="350px" height="300px" />
      <h4>{temperament}</h4>
      <h5>
        {weight_min} - {weight_max}kg.
      </h5>
    </div>
  );
}

export default Card;

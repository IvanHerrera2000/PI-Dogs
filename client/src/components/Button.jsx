import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Button.module.css';

function Button({ link, children, onClick, path1, path2 }) {
  return (
    <Link to={`${link}`} onClick={onClick} className={styles.button}>
      <div>
        <div className={styles.svgWrapper}>
          <svg
            xmlns="C:\Users\Usuario\Desktop\PI-Dogs\client\src\assets\icons\dog.png"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path d={path1} fill="white"></path>
            <path d={path2} fill="white"></path>
          </svg>
        </div>
      </div>
      <span>{children}</span>
    </Link>
  );
}

export default Button;

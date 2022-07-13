import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './Searchbar';
import styles from '../styles/NavBar.module.css';

function NavBar() {
  return (
    <header>
      <div className={styles.container}>
        <Link to="/home" className={styles.link}>
          Home
        </Link>
        <Link to="/post" className={styles.link}>
          Create your dog
        </Link>
        <Link to="/about" className={styles.link}>
          About
        </Link>
        <SearchBar></SearchBar>
      </div>
    </header>
  );
}

export default NavBar;

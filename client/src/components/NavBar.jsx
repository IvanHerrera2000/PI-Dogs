import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';
import SearchBar from './Searchbar';

function NavBar() {
  return (
    <header className={styles.container}>
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
    </header>
  );
}

export default NavBar;

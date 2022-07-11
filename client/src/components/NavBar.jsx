import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';
import SearchBar from './Searchbar';

function NavBar() {
  return (
    <header>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/post">Create your dog</Link>
        <Link to="/about">About</Link>

        <SearchBar></SearchBar>
      </div>
    </header>
  );
}

export default NavBar;

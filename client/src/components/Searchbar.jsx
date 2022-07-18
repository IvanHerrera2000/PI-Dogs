import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchDogs } from '../actions';
import styles from '../styles/SearchBar.module.css';

function SearchBar() {
  const [search, setSearch] = useState('');
  let dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchDogs(search));
    setSearch('');
  }

  function handleInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Search dog..."
          value={search}
          onChange={handleInputChange}
        ></input>
        <button type="submit" className={styles.btn}>
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;

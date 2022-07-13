import React, { useState } from 'react';
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
    <div>
      <form onSubmit={handleSubmit} className={styles.container}>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder="Search Dog..."
            type="text"
            value={search}
            onChange={handleInputChange}
          ></input>
        </div>
        <button type="submit" className={styles.btn}>
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;

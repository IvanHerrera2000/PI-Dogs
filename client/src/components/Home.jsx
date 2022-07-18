import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDogs,
  getTemperaments,
  filterCreated,
  filterTemperament,
  orderAlphabetical,
  orderByWeight,
} from '../actions';
import Card from './Card';
import Paginated from './Paginated';
import NavBar from './NavBar';
import styles from '../styles/Home.module.css';

function Home() {
  const dispatch = useDispatch();
  const [order, setOrder] = useState('');

  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);

  //Paginated
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  //Reload dogs
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  //Filters
  function handleFilterCreated(e) {
    e.preventDefault(e);
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleFilterByTemperament(e) {
    e.preventDefault(e);
    dispatch(filterTemperament(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  //Sorts
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderAlphabetical(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleSortWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.filters}>
        {/* Alphabetical order */}
        <select
          defaultValue={'DEFAULT'}
          onChange={(e) => handleSort(e)}
          className={styles.filter}
        >
          <option value="DEFAULT" disabled>
            Alphabetical order
          </option>
          <option value="upward">A-Z</option>
          <option value="decend">Z-A</option>
        </select>

        {/* Order by weight */}
        <select
          defaultValue={'DEFAULT'}
          onChange={(e) => handleSortWeight(e)}
          className={styles.filter}
        >
          <option value="DEFAULT" disabled>
            Order by weight
          </option>
          <option value="weightUpward">Heavier</option>
          <option value="weightDecend">Lighter</option>
        </select>

        {/* Filter by temperament */}
        <select
          defaultValue={'DEFAULT'}
          onChange={(e) => handleFilterByTemperament(e)}
          className={styles.filter}
        >
          <option value="DEFAULT" disabled>
            Filter by temperament
          </option>
          <option value="all">All</option>
          {allTemperaments.map((temp) => (
            <option key={temp.id} value={temp.name}>
              {temp.name}
            </option>
          ))}
        </select>

        {/* Filter by create */}
        <select
          defaultValue={'DEFAULT'}
          onChange={(e) => handleFilterCreated(e)}
          className={styles.filter}
        >
          <option value="DEFAULT" disabled>
            Filter by create
          </option>
          <option value="all">All</option>
          <option value="api">By API</option>
          <option value="created">By database</option>
        </select>
      </div>

      <div className={styles.btn}>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reload doggies
        </button>
      </div>

      {/* Paginated rendering */}
      <Paginated
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginated={paginated}
      />

      <div className={styles.grid}>
        {/* Dogs rendering */}
        {!currentDogs.length > 0 ? (
          <div className={styles.card}>
            <p>Loading...</p>
            <img
              src={
                'https://i0.wp.com/thumbs.gfycat.com/ThankfulPlushAtlanticspadefish-max-1mb.gif'
              }
            />
          </div>
        ) : (
          currentDogs.map((element) => {
            return (
              <div key={element.id} className={styles.card}>
                <Link to={`/home/${element.id}`}>
                  <Card
                    name={element.name}
                    img={
                      element.image
                        ? element.image
                        : 'https://pm1.narvii.com/6893/724dede9a107e0d420269799b4efe8be26a88df9r1-842-1024v2_00.jpg'
                    }
                    weight_max={element.weight_max}
                    weight_min={element.weight_min}
                  />
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Home;

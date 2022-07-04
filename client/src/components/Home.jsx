import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments } from '../actions';
import Card from './Card';

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  console.log(allDogs);

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  return (
    <div>
      <h1>DOGS</h1>
      <Link to="/dogs">Create Dog</Link>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload doggies
      </button>
      <div>
        {/* Alphabetical order */}
        <select defaultValue={'DEFAULT'}>
          <option value="DEFAULT" disabled>
            Alphabetical order
          </option>
          <option value="upward">A-Z</option>
          <option value="decend">Z-A</option>
        </select>

        {/* Order by weight */}
        <select defaultValue={'DEFAULT'}>
          <option value="DEFAULT" disabled>
            Order by weight
          </option>
          <option value="weightUpward">Heavier</option>
          <option value="weightDecend">Lighter</option>
        </select>

        {/* Filter by temperament */}
        <select defaultValue={'DEFAULT'}>
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
        <select defaultValue={'DEFAULT'}>
          <option value="DEFAULT" disabled>
            Filter by create
          </option>
          <option value="all">All</option>
          <option value="api">By API</option>
          <option value="created">By database</option>
        </select>
      </div>

      {/* Dogs rendering */}
      {!allDogs.length > 0 ? (
        <div>
          <p>Loading...</p>
          <img
            src={
              'https://i0.wp.com/thumbs.gfycat.com/ThankfulPlushAtlanticspadefish-max-1mb.gif'
            }
          />
        </div>
      ) : (
        allDogs.map((element) => {
          return (
            <div key={element.id}>
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
  );
}

export default Home;

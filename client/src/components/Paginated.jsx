import React from 'react';
import styles from '../styles/Paginated.module.css';

function Paginated({ dogsPerPage, allDogs, paginated }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number}>
              <a onClick={() => paginated(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export default Paginated;

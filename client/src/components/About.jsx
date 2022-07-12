import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/About.module.css';

function About() {
  return (
    <div>
      <div>
        <Link to="/home">
          <button> Back to home</button>
        </Link>
      </div>
      <div>
        <h1>Hello there!</h1>
        <h3>
          Im Iván, a Full Stack Developer! <br />I made this page as an
          Individual Project from Soy Henry Bootcamp! <br />
        </h3>
        <h3>Let's connect!</h3>
        <a href="https://github.com/IvanHerrera2000" target="_blank">
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/ivanalejandroherreraa/"
          target="_blank"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default About;

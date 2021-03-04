import React from 'react';
import styles from './Home.css';

const Home = () => {

  return (
    <div className={styles.Home}>
      <p>
        WeatherBeats generates a playlist based on the weather in your area.
      </p>
      <a href="https://weatherbeats-staging.herokuapp.com/login">
        <button>Spotify</button>
      </a>
    </div>
  );
};

export default Home;

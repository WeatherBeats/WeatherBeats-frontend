import React from 'react';
import styles from './Home.css';

const Home = () => {

  return (
    <div className={styles.Home}>
      <p>
        WeatherBeats generates a playlist based on the weather in your area.
      </p>
      <a href="http://localhost:8888/login">
        <button>Spotify</button>
      </a>
    </div>
  );
};

export default Home;

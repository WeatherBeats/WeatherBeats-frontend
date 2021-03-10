/* eslint-disable max-len */
import React from 'react';
import styles from './Home.css';
import spotify from '../../assets/Spotify_Logo_RGB_Green.png';

const Home = () => {

  return (
    <div className={styles.Home}>
      <div className={styles.line}>
        <p>WeatherBeats</p>
        <div>
          <p>Log in with</p>
          <a href="https://weatherbeats-staging.herokuapp.com/login">
            <img src={spotify} alt="Spotify logo"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;

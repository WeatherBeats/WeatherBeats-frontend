import React from 'react';
import styles from './Home.css';
import spotify from '../../assets/Spotify_Logo_RGB_Black.png';

const Home = () => {

  return (
    <div className={styles.Home}>
      <p>
        WeatherBeats generates a playlist based on the weather in your area.
      </p>
      <a href="https://weatherbeats-staging.herokuapp.com/login">
        <img src={spotify} alt="Spotify logo"/>
      </a>
      
    </div>
  );
};

export default Home;

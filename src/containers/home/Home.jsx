/* eslint-disable max-len */
import React from 'react';
import styles from './Home.css';
import spotify from '../../assets/Spotify_Logo_RGB_Green.png';

const Home = () => {

  return (
    <div className={styles.Home}>
      <p>
        WeatherBeats generates a playlist based on the weather in your area.
      </p>
      {/* Logo Criteria: To comply with our licensing agreements, you must always attribute content from Spotify with the logo. In partner integrations, you should always use our full logo (icon + wordmark). We do allow using only our icon if it’s featured as an app icon on the app screen of a device. */}
      {/* Color Criteria: The Spotify green logo should only be used on a black or white background, for any other background you should use a monochrome logo.
      The black logo should be used on light colored backgrounds.
      The white logo should be used on dark colored backgrounds. */}
      <a href="https://weatherbeats-staging.herokuapp.com/login">
        <img src={spotify} alt="Spotify logo"/>
      </a>
      
    </div>
  );
};

export default Home;

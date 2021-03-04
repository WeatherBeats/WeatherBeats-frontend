import React from 'react';
import styles from './Home.css';

const Home = () => {

  const onSpotifyLoginClick = () => {
    console.log('Spotify login button clicked.');

  };

  return (
    <div className={styles.Home}>
      <p>
        WeatherBeats generates a playlist based on the weather in your area.
      </p>
      <button onClick={onSpotifyLoginClick}>Spotify</button>
    </div>
  );
};

export default Home;

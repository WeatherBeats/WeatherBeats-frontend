import React from 'react';
import Menu from '../menu/Menu';
import styles from './Header.css';

const Header = () => {
  return (
    <div className={styles.Header}>
      <Menu />
      <h1>WeatherBeats</h1>
    </div>
  );
};

export default Header;

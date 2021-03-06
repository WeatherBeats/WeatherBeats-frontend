import React from 'react';
import NavDropDown from '../menu/NavDropDown';
import styles from './Header.css';

const header = () => {
  return (
    <>
      <div className={styles.title}>
        <h1>WeatherBeats</h1>
      </div>
      
      <NavDropDown />
    </>
  );
};

export default header;

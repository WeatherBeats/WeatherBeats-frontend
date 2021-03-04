import React from 'react';
import PropTypes from 'prop-types';
import About from '../about/About';
import NavDropDown from '../menu/NavDropDown';
import styles from './Header.css';

const header = props => {
  return (
    <>
      <div className={styles.title}>
        <h1>WeatherBeats</h1>
      </div>
      
      <NavDropDown />
    </>
  );
};

header.propTypes = {

};

export default header;

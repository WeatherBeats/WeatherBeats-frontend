import React from 'react';
import PropTypes from 'prop-types';
import styles from './Player.css';
import { selectCountryData } from './selectData.js';

const ZipCodeSelectForm = ({ 
  onZipCodeSubmit,
  setZipCode,
  setCountry,
  country
}) => {

  const selectCountryElements = selectCountryData.map(item => (
    (item.value === country)
      ?
      <option
        key={item.country}
        value={item.value}
        selected
      >
        {item.country}
      </option>
      :
      <option
        key={item.country}
        value={item.value}
      >
        {item.country}
      </option>
  ));

  return (
    <>
      <form onSubmit={onZipCodeSubmit} className={styles.FormOne}>
        <label htmlFor="zip-code-input">
          <input
            placeholder="Zip Code"
            type="text"
            id="zip-code-input"
            onChange={({ target }) => setZipCode(target.value)}
          />
        </label>
        <label htmlFor="country-select">
          <select
            name="country"
            id="country-select"
            onChange={({ target }) => setCountry(target.value)}
          >
            {selectCountryElements}
          </select>
        </label>
        <button>Submit</button>
      </form>
      
    </>
  );
};

ZipCodeSelectForm.propTypes = {
  onZipCodeSubmit: PropTypes.func.isRequired,
  setZipCode: PropTypes.func.isRequired,
  setCountry: PropTypes.func.isRequired,
  country: PropTypes.string.isRequired
};

export default ZipCodeSelectForm;

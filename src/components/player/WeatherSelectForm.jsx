import React from 'react';
import PropTypes from 'prop-types';
import styles from './Player.css';
import { selectWeatherData } from './selectData.js';

const WeatherSelectForm = ({
  onChosenWeatherSubmit,
  setChosenWeather,
  chosenWeather
}) => {

  const selectWeatherElements = selectWeatherData.map(item => (
    (item.value === chosenWeather)
      ?
      <option
        key={item.weather}
        value={`+${item.value}`}
        selected
      >
        {item.weather}
      </option>
      :
      <option
        key={item.weather}
        value={`${item.value}`}
      >
        {item.weather}
      </option>
  ));
    

  return (
    <>
      <form onSubmit={onChosenWeatherSubmit} className={styles.FormTwo}>
        <label htmlFor="chosen-genre-input">
          <select
            name="chosen-genre"
            id="chosen-genre-input"
            onChange={({ target }) => setChosenWeather(target.value)}
          >
            {selectWeatherElements}
          </select>
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}

WeatherSelectForm.propTypes = {
  onChosenWeatherSubmit: PropTypes.func.isRequired,
  setChosenWeather: PropTypes.func.isRequired,
  chosenWeather: PropTypes.func.isRequired
};

export default WeatherSelectForm;

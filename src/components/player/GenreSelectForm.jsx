import React from 'react';
import PropTypes from 'prop-types';
import styles from './Player.css';
import { selectGenreData } from './selectData.js';

const GenreSelectForm = ({ onGenreSubmit, setChosenGenre, chosenGenre }) => {

  // Removes the plus sign from chosenGenre
  const savedGenre = chosenGenre.replace('+', '');

  // Creates the options for the Pick Genre dropdown menu
  const selectGenreElements = selectGenreData.map(item => (
    (item.value === savedGenre || item.value === chosenGenre)
      ?
      <option key={item.genre} value={`+${item.value}`} selected>
        {item.genre}
      </option>
      :
      <option key={item.genre} value={`+${item.value}`}>
        {item.genre}
      </option>
  ));
  
  return (
    <>
      <form onSubmit={onGenreSubmit} className={styles.FormTwo}>
        <label htmlFor="chosen-genre-input">
          <select
            name="chosen-genre"
            id="chosen-genre-input"
            onChange={({ target }) => setChosenGenre(target.value)}
          >
            {selectGenreElements}
          </select>
        </label>
        <button>Submit</button>
      </form>
    </>
  );
};

GenreSelectForm.propTypes = {
  onGenreSubmit: PropTypes.func.isRequired,
  setChosenGenre: PropTypes.func.isRequired,
  chosenGenre: PropTypes.string.isRequired
};

export default GenreSelectForm;

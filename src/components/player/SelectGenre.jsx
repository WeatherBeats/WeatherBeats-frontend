import React, { useState } from 'react';
import { selectGenreData } from './selectGenreData.js';
import SelectGenreDetails from './SelectGenreDetails.jsx';

const SelectGenre = () => {

  const [chosenGenre, setChosenGenre] = useState('');

  const selectElements = selectGenreData.map(item => (
    <option key={item.genre}>
      <SelectGenreDetails {...item} />
    </option>
  ));

  console.log(selectElements);
  return (
    <select
      name="chosen-genre"
      id="chosen-genre-input"
      onChange={({ target }) => setChosenGenre(target.value)}>
      {selectElements}
    </select>
  );
}

export default SelectGenre;

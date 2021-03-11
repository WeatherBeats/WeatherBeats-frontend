import React from 'react';
import PropTypes from 'prop-types';

function SelectGenreDetails({ genre }) {
  return (
    <div>
      {genre}
    </div>
  );
}

SelectGenreDetails.propTypes = {
  genre: PropTypes.string.isRequired
};

export default SelectGenreDetails;

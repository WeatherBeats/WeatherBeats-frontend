import React from 'react';
import PropTypes, { string } from 'prop-types';
import styles from './AboutSingle.css';

const AboutSingle = ({ name, image }) => {
  return (
    <div className={styles.AboutSingle}>
      <p>{name}</p>
      <p><img src={image} alt={name}/></p>
      <span>
        Bio words and words and words with words and perhaps more words as well.
      </span>
      <p>GH - LI</p>
    </div>
  );
};

AboutSingle.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default AboutSingle;

import React from 'react';
import PropTypes, { string } from 'prop-types';
import styles from './AboutSingle.css';
import github from '../../assets/GitHub_icon.png';

const AboutSingle = ({ name, image, githubUrl }) => {
  return (
    <div className={styles.AboutSingle}>
      <p>{name}</p>
      <p><img src={image} alt={name}/></p>
      <span>
        Bio words and words and words with words and perhaps more words as well.
      </span>
      <p>
        <a href={githubUrl} target="_blank" rel="noreferrer">
          <img
            src={github}
            alt="GitHub icon"
            style={{ width: '25%', height: '25%' }}
          />
        </a> - LI
      </p>
    </div>
  );
};

AboutSingle.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  githubUrl: PropTypes.string.isRequired
};

export default AboutSingle;

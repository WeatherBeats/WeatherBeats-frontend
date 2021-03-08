import React from 'react';
import PropTypes from 'prop-types';
import styles from './AboutSingle.css';
import githubIcon from '../../assets/GitHub_icon.png';

const AboutSingle = ({ name, photo, github, linkedIn }) => {

  const iconStyle = {
    width: '25%', 
    height: '25%'
  };

  return (
    <div className={styles.AboutSingle}>
      <p>{name}</p>
      <p><img src={photo} alt={name}/></p>
      <span>
        Bio words and words and words with words and perhaps more words as well.
      </span>
      <p>
        <a href={github} target="_blank" rel="noreferrer">
          <img
            src={githubIcon}
            alt="GitHub icon"
            style={iconStyle}
          />
        </a>
        <a href={linkedIn} target="_blank" rel="noreferrer">
          <img
            src={githubIcon}
            alt="LinkedIn icon"
            style={iconStyle}
          />
        </a>
      </p>
    </div>
  );
};

AboutSingle.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  linkedIn: PropTypes.string.isRequired
};

export default AboutSingle;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './AboutSingle.css';
import gitHubIcon from '../../assets/GitHub_icon.png';
import linkedInIcon from '../../assets/LinkedIn_icon.png';

const AboutSingle = ({ name, photo, gitHub, linkedIn, bio }) => {

  return (
    <div className={styles.AboutSingle}>

      <p className={styles.topContainer}>
        <h2>{name}</h2>
        <img 
          src={photo} 
          alt={name}
        />
        <section className={styles.bio}>
          {bio}
        </section>
      </p>

      <p className={styles.iconContainer}>
        <a href={gitHub} target="_blank" rel="noreferrer">
          <img
            src={gitHubIcon}
            alt="GitHub icon"
          />
        </a>
        <a href={linkedIn} target="_blank" rel="noreferrer">
          <img
            src={linkedInIcon}
            alt="LinkedIn icon"
          />
        </a>
      </p>
    </div>
  );
};

AboutSingle.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  gitHub: PropTypes.string.isRequired,
  linkedIn: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired
};

export default AboutSingle;

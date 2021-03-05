import React from 'react';
import PropTypes from 'prop-types';
import AboutSingle from './AboutSingle';
import styles from './About.css';

const About = props => {
  return (
    <div className={styles.About}>
      About
      <AboutSingle />
    </div>
  );
};

About.propTypes = {

};

export default About;

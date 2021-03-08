import React from 'react';
import PropTypes from 'prop-types';
import AboutSingle from './AboutSingle';
import styles from './About.css';
import { aboutData } from './aboutData.js';

const About = props => {

  const aboutElements = aboutData.map(person => (
    <li key={person.name}>
      <AboutSingle {...person} />
    </li>
  ));
  return (

    <ul className={styles.About}>
      {aboutElements}
    </ul>
  );
};

About.propTypes = {

};

export default About;

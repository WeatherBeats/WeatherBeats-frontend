import React from 'react';
import AboutSingle from './AboutSingle';
import styles from './About.css';
import { aboutData } from './aboutData.js';
import Header from '../header/Header';

const About = () => {

  const aboutElements = aboutData.map(person => (
    <li key={person.name}>
      <AboutSingle {...person} />
    </li>
  ));

  return (
    <div className={styles.Group}>
      <Header />
      <ul className={styles.About}>
        {aboutElements}
      </ul>
    </div>
  );
};

export default About;

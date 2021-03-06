import React from 'react';
import PropTypes from 'prop-types';
import AboutSingle from './AboutSingle';
import styles from './About.css';

const About = props => {
  return (
    <div className={styles.About}>
      <AboutSingle
        name="Bryana Kitchen"
        image="http://placekitten.com/g/1024/768"
      />
      <AboutSingle name="Donny Vu" 
        image="http://placekitten.com/g/1024/768"
      />
      <AboutSingle name="Franco Ortega" 
        image="http://placekitten.com/g/1024/768"
      />
      <AboutSingle name="Perry Sittser" 
        image="http://placekitten.com/g/1024/768"
      />
      <AboutSingle name="Shane Upchurch" 
        image="http://placekitten.com/g/1024/768"
      />
    </div>
  );
};

About.propTypes = {

};

export default About;

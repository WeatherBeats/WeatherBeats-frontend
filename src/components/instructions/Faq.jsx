import React from 'react';
import PropTypes from 'prop-types';
import styles from './Faq.css';

const Faq = ({ question, response }) => {
  return (
    <details className={ styles.Faq }>
      <summary>{question}</summary>
      <p>{response}</p>
    </details>
  );
};

Faq.propTypes = {
  question: PropTypes.string.isRequired,
  response: PropTypes.string.isRequired
};

export default Faq;

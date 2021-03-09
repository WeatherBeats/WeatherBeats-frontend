import React from 'react';
import PropTypes from 'prop-types';

const Faq = ({ question, response }) => {
  return (
    <details>
      <summary>{question}</summary>
      {response}
    </details>
  );
};

Faq.propTypes = {
  question: PropTypes.string.isRequired,
  response: PropTypes.string.isRequired
};

export default Faq;

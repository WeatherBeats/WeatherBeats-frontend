import React from 'react';
import { faqData } from './faqData.js';
import Faq from './faq';
import styles from './Faq.css';

const FaqList = () => {
  const faqElements = faqData.map((question, i) => (
    <li key={i}>
      <Faq {...question} />
    </li>
  ));

  return (

    <ul className={styles.Faq}>
      {faqElements}
    </ul>
  );
};

export default FaqList;

import React from 'react';
import { faqData } from './faqData.js';
import Faq from './Faq.jsx';
import styles from './Faq.css';

const FaqList = () => {
  const faqElements = faqData.map((item, i) => (
    <li key={i}>
      <Faq {...item} />
    </li>
  ));
  
  return (

    <ul className={styles.Faq}>
      {faqElements}
    </ul>
  );
};

export default FaqList;

import React from 'react';
import { faqData } from './faqData.js';
import Faq from './Faq.jsx';
import styles from './Faq.css';
import Header from '../header/Header.jsx';

const FaqList = () => {
  const faqElements = faqData.map((item, i) => (
    <li key={i}>
      <Faq {...item} />
    </li>
  ));
  
  return (
    <>
      <Header />
      <ul className={ styles.FaqList }>
        {faqElements}
      </ul>
    </>
  );
};

export default FaqList;

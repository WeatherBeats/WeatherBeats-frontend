import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeHeader.css';

const HomeHeader = () => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <div 
        className={ `${styles.DropDown} ${menu && styles.active}` }
        onClick={() => setMenu(menu => !menu)}
      >

        <img src="/images/menu-white.png" alt="menu" />

        <div className={styles.DropContent}>
          <span><Link to="/">Home</Link></span>
          <span><Link to="/player">Player</Link></span>
          <span><Link to="/about">About Us</Link></span>
          <span><Link to="/faq">FAQ</Link></span>
        </div>
      </div>
    </>
  );
};

export default HomeHeader;

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.css';

const Menu = () => {
  return (
    <>
      <div className={ styles.DropDown }>
        <a href="/">
          <img src="./src/assets/menu.png" alt="menu" />
        </a>
        <div className={ styles.DropContent }>
          <span><Link to="/">Home</Link></span>
          <span><Link to="/player">Player</Link></span>
          <span><Link to="/about">About Us</Link></span>
          <span><Link to="/faq">FAQ</Link></span>
        </div>
      </div>
    </>
  );
};

export default Menu;

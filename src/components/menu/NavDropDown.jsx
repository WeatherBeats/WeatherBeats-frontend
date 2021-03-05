import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavDropDown.css';

const NavDropDown = () => {
  const [showMenu, setShowMenu] = useState(false);

  const clickHandler = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={styles.menuButton}>
      <button onClick={clickHandler}>
        Nav
      </button>
      {
        showMenu
          ? (
            <div className={styles.dropdownMenu}>
              <Link to="/player">
                <button>Player</button>
              </Link>
              <Link to="/how-to">
                <button>Info</button>
              </Link>
              <Link to="/about">
                <button>About Us</button>
              </Link>
            </div>
          )
          : null
      } 
    </div>
  );
};

export default NavDropDown;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavDropDown = () => {
  const [showMenu, setShowMenu] = useState(false);

  const clickHandler = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <button onClick={clickHandler}>
        Nav
      </button>
      {
        showMenu
          ? (
            <div className="menu">
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

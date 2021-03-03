import React from 'react';
import PropTypes from 'prop-types';
import About from '../about/About';
import NavDropDown from '../menu/NavDropDown';

const header = props => {
  return (
    <>
    Header
      <NavDropDown />
    </>
  );
};

header.propTypes = {

};

export default header;

import React from 'react';
import PropTypes from 'prop-types';

const Player = props => {

  const onTrackingClick = () => {

  };
  
  return (
    <div>
      <p>
        Player
      </p>
      <button onClick={onTrackingClick}>Enable Tracking</button>
    </div>
  );
};

Player.propTypes = {

};

export default Player;

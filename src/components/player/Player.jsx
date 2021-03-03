import React from 'react';
import PropTypes from 'prop-types';

const Player = props => {

  const onTrackingClick = () => {
    console.log('Tracking button clicked');

    const success = (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
    };

    navigator.geolocation.getCurrentPosition(success);

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

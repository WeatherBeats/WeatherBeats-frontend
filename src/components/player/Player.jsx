import React from 'react';
import PropTypes from 'prop-types';

const Player = props => {

  const coordinates = {
    latitude: '',
    longitude: ''
  };

  console.group(['Starting coordinates']);
  console.log(coordinates);
  console.groupEnd();

  const onTrackingClick = () => {
    console.log('Tracking button clicked');

    //success method passed into getCurrentPosition
    const success = (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      coordinates.latitude = lat;
      coordinates.longitude = long;

      console.group(['User coordinates']);
      console.log(coordinates);
      console.groupEnd();
    };

    //error method passed into getCurrentPosition
    const error = (err) => {
      console.warn(`Error(${err.code}): ${err.message}`);
      
    };

    navigator.geolocation.getCurrentPosition(success, error);
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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../loading/Loading';

const Player = props => {

  const [loading, setLoading] = useState(false);

  const coordinates = {
    latitude: '',
    longitude: ''
  };

  const onTrackingClick = () => {
    console.log('Tracking button clicked');
    setLoading(true);

    //success method passed into getCurrentPosition
    const success = (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      coordinates.latitude = lat;
      coordinates.longitude = long;

      // console.group(['User coordinates']);
      console.log(coordinates);
      // console.groupEnd();
      setLoading(false);
    };

    //error method passed into getCurrentPosition
    const error = (err) => {
      console.warn(`Error(${err.code}): ${err.message}`);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  if(loading) return <Loading />;

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

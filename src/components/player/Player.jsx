import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../loading/Loading';
import { postLocation } from '../../services/weatherBeatsApi';

const Player = props => {
  const [loading, setLoading] = useState(false);

  const coordinates = {
    latitude: '',
    longitude: ''
  };

  const onTrackingClick = () => {
    console.log('Tracking button clicked');

    setLoading(true);

    // success method passed into getCurrentPosition
    // gets coordinates
    // sets coordinates
    const success = (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      coordinates.latitude = lat;
      coordinates.longitude = long;

      console.group(['User coordinates']);
      console.log(coordinates);
      console.groupEnd();

      // makes fetch call to WeatherBeats server
      // sends location data in request; receives weather data in response
      postLocation(coordinates);

      setLoading(false);
    };

    // error method passed into getCurrentPosition
    const error = (err) => {
      // error message displays in console if user denies access
      console.warn(`Error(${err.code}): ${err.message}`);
      setLoading(false);
    };

    // getCurrentPosition gets user location
    navigator.geolocation.getCurrentPosition(success, error);
  };

  if(loading) return <Loading />;

  return (
    <div>
      <p>
        <button onClick={onTrackingClick}>Enable Tracking</button>
      </p>
      <p>
        Player
      </p>
    </div>
  );
};

Player.propTypes = {

};

export default Player;

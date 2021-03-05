import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../loading/Loading';
import { postLocation } from '../../services/weatherBeatsApi';
import { getPlaylist } from '../../services/spotifyApi';

const Player = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(match.params.access_token);
  const [playlists, setPlaylists] = useState([]);

  const coordinates = {
    latitude: '',
    longitude: ''
  };

  const onTrackingClick = () => {

    setLoading(true);

    // success method passed into getCurrentPosition
    // gets and sets coordinates
    const success = (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      coordinates.latitude = lat;
      coordinates.longitude = long;

      postLocation(coordinates)
        .then(genre => {
          getPlaylist(genre, token)
            .then(res => setPlaylists(res));
          setLoading(false);
        });

    };

    const error = (err) => {
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






      
      <form action=""
      >
        <label htmlFor="zip-code-input">
          <input
            placeholder="Zip Code"
            type="text"
            id="zip-code-input"
          />
        </label>
        <label htmlFor="country-select">
          <select name="country" id="country-select">
            <option value="">Select Country</option>
            <option value="">Canada</option>
            <option value="">Mexico</option>
            <option value="">UK</option>
            <option value="">US</option>
          </select>
        </label>
        <button>Get Location by Zip Code</button>
      </form>






      <iframe
        src={`https://open.spotify.com/embed/playlist/${playlists[0]}`}
        width="300"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"></iframe>
    </div>
  );
};

Player.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      access_token: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired
};

export default Player;

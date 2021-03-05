import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../loading/Loading';
import { postLocation, postZipCode } from '../../services/weatherBeatsApi';
import { getPlaylist } from '../../services/spotifyApi';

const Player = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(match.params.access_token);
  const [playlists, setPlaylists] = useState([]);


  // START new code
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  // END new code





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






  // START new code
  const onZipCodeSubmit = (e) => {
    e.preventDefault();

    const zipAndCountry = {
      zipCode,
      country
    };

    postZipCode(zipAndCountry)
      .then(genre => {
        getPlaylist(genre, token)
          .then(res => setPlaylists(res));
        setLoading(false);
      });
    console.log(zipAndCountry);

  };
console.log(zipCode);
console.log(country);
  // START new code





  if(loading) return <Loading />;

  return (
    <div>
      <p>
        <button onClick={onTrackingClick}>Enable Tracking</button>
      </p>






      {/* // START new code */}
      <form action=""
        onSubmit={onZipCodeSubmit}
      >
        <label htmlFor="zip-code-input">
          <input
            placeholder="Zip Code"
            type="text"
            id="zip-code-input"
            onChange={({ target }) => setZipCode(target.value)}
          />
        </label>
        <label htmlFor="country-select">
          <select
            name="country"
            id="country-select"
            onChange={({ target }) => setCountry(target.value)}
          >
            <option value="">Select Country</option>
            <option value="CA">Canada</option>
            <option value="MX">Mexico</option>
            <option value="UK">UK</option>
            <option value="US">US</option>
          </select>
        </label>
        <button>Get Location by Zip Code</button>
      </form>

      {/* // end new code */}





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

/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../loading/Loading';
import { postLocation, postZipCode } from '../../services/weatherBeatsApi';
import { getPlaylist } from '../../services/spotifyApi';
import { getNewAccessToken } from '../../services/spotifyRefreshToken';

const Player = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(match.params.access_token);
  const [refreshToken, setRefreshToken] = useState(match.params.refresh_token);
  const [playlists, setPlaylists] = useState([]);
  const [userPlaylist, setUserPlaylist] = useState('');

  const newUserPlaylist = (playlistIds) => {
    const id = playlistIds[Math.floor(Math.random() * playlistIds.length)];
    return id;
  };


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

    const success = (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      coordinates.latitude = lat;
      coordinates.longitude = long;

      postLocation(coordinates)
        .then(genre => {
          getPlaylist(genre, token)
            .then(res => {
              setPlaylists(res);
              const id = newUserPlaylist(res);
              setUserPlaylist(id);
            });
          setLoading(false);
        });
    };

    getNewAccessToken(refreshToken)
      .then(token => setToken(token['access_token']));

    const error = (err) => {
      console.warn(`Error(${err.code}): ${err.message}`);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  const onNextClick = () => {
    const id = newUserPlaylist(playlists);
    setUserPlaylist(id);
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
          .then(res => {
            setPlaylists(res);
            const id = newUserPlaylist(res);
            setUserPlaylist(id);
          });
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
        <button onClick={onTrackingClick}>Generate Playlist</button>
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
            <option value="">Select Country (optional)</option>
            <option value="AU">Australia</option>
            <option value="BR">Brazil</option>
            <option value="CA">Canada</option>
            <option value="CN">China</option>
            <option value="IN">India</option>
            <option value="MX">Mexico</option>
            <option value="NG">Nigeria</option>
            <option value="UK">United Kingdom</option>
            <option value="US">United States</option>
          </select>
        </label>
        <button>Generate Playlist by Zip Code</button>
      </form>

      {/* // end new code */}





      { !userPlaylist 
        ? <p>Please click &apos;Generate Playlist&apos; to find a weather-appropriate playlist based on your current location!</p> 
        :
        <div>
          <iframe
            src={`https://open.spotify.com/embed/playlist/${userPlaylist}`}
            width="300"
            height="380"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"></iframe>

          <button onClick={onNextClick}>Next Playlist</button>
        </div>
      }
    </div>
  );
};

Player.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      access_token: PropTypes.string.isRequired,
      refresh_token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Player;

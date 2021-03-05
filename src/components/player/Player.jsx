/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../loading/Loading';
import { postLocation } from '../../services/weatherBeatsApi';
import { getPlaylist } from '../../services/spotifyApi';

const Player = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(match.params.access_token);
  const [playlists, setPlaylists] = useState([]);
  const [userPlaylist, setUserPlaylist] = useState('');

  const newUserPlaylist = (playlistIds) => {
    const id = playlistIds[Math.floor(Math.random() * playlistIds.length)];
    console.log('id', id);
    // setUserPlaylist(id);
    return id;
  };

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

    const error = (err) => {
      console.warn(`Error(${err.code}): ${err.message}`);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  const onNextClick = () => {
    newUserPlaylist(playlists);
  };

  if(loading) return <Loading />;

  return (
    <div>
      <p>
        <button onClick={onTrackingClick}>Generate Playlist</button>
      </p>

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
    }).isRequired
  }).isRequired
};

export default Player;

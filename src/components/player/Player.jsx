/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../loading/Loading';
import { postLocation, postZipCode, postChosenWeather } from '../../services/weatherBeatsApi';
import { getPlaylist } from '../../services/spotifyApi';
import { getNewAccessToken } from '../../services/spotifyRefreshToken';
import styles from './Player.css';
import { useHistory } from 'react-router-dom';
import backgroundTranslator from '../background/Background';

const Player = ({ match }) => {

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(match.params.access_token);
  const [refreshToken, setRefreshToken] = useState(match.params.refresh_token);
  const [playlists, setPlaylists] = useState([]);
  const [userPlaylist, setUserPlaylist] = useState(localStorage.getItem('currentPlaylist') || '');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [chosenWeather, setChosenWeather] = useState('');
  const [chosenGenre, setChosenGenre] = useState('');

  const history = useHistory();

  useEffect(() => {
    if(refreshToken === undefined || refreshToken === 'tunes') {
      setRefreshToken(localStorage.getItem('savedToken', refreshToken));
    } else {
      (localStorage.setItem('savedToken', refreshToken));
    }
  }, []);

  const newUserPlaylist = (playlistIds) => {
    const id = playlistIds[Math.floor(Math.random() * playlistIds.length)];
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
          const searchTerms = `${genre}${chosenGenre}`;
          document.body.style.background = `url(${backgroundTranslator(genre)})`;
          getPlaylist(searchTerms, token)
            .then(res => {
              setPlaylists(res);
              const id = newUserPlaylist(res);
              setUserPlaylist(id);
              localStorage.setItem('currentPlaylist', id);
            });
          setLoading(false);
        });
    };

    getNewAccessToken(refreshToken)
      .then(token => {
        setToken(token['access_token']);
        history.replace('/player/awesome/tunes', { from: 'Player' });
      });


    const error = (err) => {
      console.warn(`Error(${err.code}): ${err.message}`);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  const onNextClick = () => {
    const id = newUserPlaylist(playlists);
    localStorage.setItem('currentPlaylist', id);
    setUserPlaylist(id);
  };

  const onZipCodeSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const zipAndCountry = {
      zipCode,
      country
    };

    postZipCode(zipAndCountry)
      .then(genre => {
        document.body.style.background = `url(${backgroundTranslator(genre)})`;
        getPlaylist(genre, token)
          .then(res => {
            setPlaylists(res);
            const id = newUserPlaylist(res);
            setUserPlaylist(id);
          });
        setLoading(false);
      });
    history.replace('/player/awesome/tunes', { from: 'Player' });
  };

  const onChosenWeatherSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    postChosenWeather(chosenWeather)
      .then(genre => {
        document.body.style.background = `url(${backgroundTranslator(genre)})`;
        getPlaylist(genre, token)
          .then(res => {
            setPlaylists(res);
            const id = newUserPlaylist(res);
            setUserPlaylist(id);
          });
        setLoading(false);
      });
    history.replace('/player/awesome/tunes', { from: 'Player' });
  };

  const onGenreSubmit = (e) => {
    e.preventDefault();
    onTrackingClick();
  };

  if(loading) return <Loading />;
  return (
    <div className={styles.Player}>
      {/* COLUMN ONE ------------------------- */}
      <div className={styles.columnOne}>
        {
          !userPlaylist
            ? 
            <button onClick={onTrackingClick} className={styles.MainButton}>Generate Playlist</button>
            : 
            <button onClick={onTrackingClick} className={styles.MainButton}>Check Weather Again</button>
        }

        <form onSubmit={onZipCodeSubmit} className={styles.FormOne}>
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
              <option value="">Country</option>
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
          <button>Submit</button>
        </form>

        <form onSubmit={onGenreSubmit} className={styles.FormTwo}>
          <label htmlFor="chosen-genre-input">
            <select
              name="chosen-genre"
              id="chosen-genre-input"
              onChange={({ target }) => setChosenGenre(target.value)}
            >
              <option value="">Pick Genre</option>
              <option value="">Random</option>
              <option value="+country">Country</option>
              <option value="+rap">Rap</option>
              <option value="+rock">Rock</option>
              <option value="+hip-hop">Hip-Hop</option>
              <option value="+blues">Blues</option>
              <option value="+jazz">Jazz</option>
              <option value="+electronic">Electronic</option>
            </select>
          </label>
          <button>Submit</button>
        </form>
      </div>

      {/* COLUMN TWO ------------------------- */}


      {
        !userPlaylist
          ? <div>
            <p>Please click &apos;Generate Playlist&apos; to find a weather-appropriate playlist based on your current location!</p>
            <p>You may also enter a Zip Code to generate a playlist based off of the weather in another location.</p>
          </div>
          :
          <div className={styles.playlist}>
            <iframe
              src={`https://open.spotify.com/embed/playlist/${userPlaylist}`}
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media">
            </iframe>
            {playlists.length > 1
              ? <button onClick={onNextClick}>Next Playlist</button>
              : <div></div>
            }
          </div>
      }

      {/* COLUMN THREE ------------------------- */}

      <div className={styles.columnThree}>
        <p>Advanced Search</p>
        <form onSubmit={onChosenWeatherSubmit} className={styles.FormTwo}>
          <label htmlFor="chosen-weather-input">
            <select
              name="chosen-weather"
              id="chosen-weather-input"
              onChange={({ target }) => setChosenWeather(target.value)}
            >
              <option>Pick Weather</option>
              <option value="sunny">Sunny</option>
              <option value="cloudy">Cloudy</option>
              <option value="thunder">Thunder</option>
              <option value="rain">Rain</option>
              <option value="freezing-rain">Freezing Rain</option>
              <option value="snow">Snow</option>
              <option value="hazy">Hazy</option>
            </select>
          </label>
          <button>Submit</button>
        </form>

        <form onSubmit={onGenreSubmit} className={styles.FormTwo}>
          <label htmlFor="chosen-genre-input">
            <select
              name="chosen-genre"
              id="chosen-genre-input"
              onChange={({ target }) => setChosenGenre(target.value)}
            >
              <option>Pick Genre</option>
              <option value="country">Country</option>
              <option value="rap">Rap</option>
              <option value="rock">Rock</option>
              <option value="hip-hop">Hip-Hop</option>
              <option value="blues">Blues</option>
              <option value="jazz">Jazz</option>
              <option value="electronic">Electronic</option>
            </select>
          </label>
          <button>Submit</button>
        </form>
      </div>
    </div >
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

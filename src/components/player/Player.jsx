/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { postLocation, postZipCode, postChosenWeather } from '../../services/weatherBeatsApi';
import { getPlaylist } from '../../services/spotifyApi';
import { getNewAccessToken } from '../../services/spotifyRefreshToken';
import backgroundTranslator from '../../utils/background';
import Loading from '../loading/Loading';
import Header from '../header/Header';
import GenreSelectForm from './GenreSelectForm';
import WeatherSelectForm from './WeatherSelectForm';
import ZipCodeSelectForm from './ZipCodeSelectForm';
import styles from './Player.css';

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
  const [chosenWeatherResponse, setChosenWeatherResponse] = useState('');
  const [currentMood, setCurrentMood] = useState('');

  const history = useHistory();

  useEffect(() => {
    if(refreshToken === undefined || refreshToken === 'tunes') {
      setRefreshToken(localStorage.getItem('savedToken', refreshToken));
    } else {
      (localStorage.setItem('savedToken', refreshToken));
    }
  }, []);

  const generatePlaylist = (searchTerms, token) => {
    getPlaylist(searchTerms, token)
      .then(res => {
        setPlaylists(res);
        const id = newUserPlaylist(res);
        setUserPlaylist(id);
        localStorage.setItem('currentPlaylist', id);
      });
    setLoading(false);
  };

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

    // Resets chosenWeather to an emtpy string when 'Check Weather Again' is clicked
    setChosenWeather('');
    setChosenWeatherResponse('');

    const success = (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      coordinates.latitude = lat;
      coordinates.longitude = long;

      postLocation(coordinates)
        .then(mood => {
          setCurrentMood(mood);
          const searchTerms = `${mood}${chosenGenre}`;
          document.body.style.backgroundImage = `url(${backgroundTranslator(mood)})`;
          generatePlaylist(searchTerms, token);
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
      .then(mood => {
        setCurrentMood(mood);
        const searchTerms = `${mood}${chosenGenre}`;
        document.body.style.backgroundImage = `url(${backgroundTranslator(mood)})`;
        generatePlaylist(searchTerms, token);
        setChosenWeather('');
      });
  };

  const onChosenWeatherSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    postChosenWeather(chosenWeather)
      .then(mood => {
        setCurrentMood(mood);
        setChosenWeatherResponse(`+${mood}`);
        const searchTerms = `${mood}${chosenGenre}`;
        document.body.style.backgroundImage = `url(${backgroundTranslator(mood)})`;
        generatePlaylist(searchTerms, token);
      });
    history.replace('/player/awesome/tunes', { from: 'Player' });
  };

  const onGenreSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if(chosenWeather) {
      const searchTerms = `${chosenWeatherResponse.substring(1)}${chosenGenre}`;
      document.body.style.backgroundImage = `url(${backgroundTranslator(chosenWeatherResponse.substring(1))})`;
      generatePlaylist(searchTerms, token);
    } else {
      const searchTerms = `${currentMood}${chosenGenre}`;
      generatePlaylist(searchTerms, token);
    }
  };

  if(loading) return <Loading />;
  return (
    <>
      <Header />
      <div className={styles.Player}>
        <div className={styles.columnOne}>
          {
            !userPlaylist
              ? <button onClick={onTrackingClick} className={styles.MainButton}>Generate Playlist</button>
              : 
              <>
                <button onClick={onTrackingClick} className={styles.MainButton}>Check Weather Again</button>
                <button onClick={onTrackingClick} className={styles.MainShort}>Check Weather</button>
              </>
          }
          {
            playlists.length > 1
              ? <button onClick={onNextClick} className={styles.NextButton}>Next Playlist</button>
              : ''
          }
          <ZipCodeSelectForm
            onZipCodeSubmit={onZipCodeSubmit}
            setZipCode={setZipCode}
            setCountry={setCountry}
            country={country}
          />
        </div>

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
            </div>
        }

        <div className={styles.columnThree}>
          <p>Advanced Search</p>

          <WeatherSelectForm
            onChosenWeatherSubmit={onChosenWeatherSubmit}
            setChosenWeather={setChosenWeather}
            chosenWeather={chosenWeather}
          />

          <GenreSelectForm
            onGenreSubmit={onGenreSubmit}
            setChosenGenre={setChosenGenre}
            chosenGenre={chosenGenre}
          />
        </div>
      </div >
    </>
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

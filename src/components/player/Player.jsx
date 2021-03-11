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
import Header from '../header/Header';
import GenreSelectForm from './GenreSelectForm';
import WeatherSelectForm from './WeatherSelectForm';
import ZipCodeSelectForm from './ZipCodeSelectForm';

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

    // Resets chosenWeather to an emtpy string when 'Check Weather Again' is clicked
    setChosenWeather('');

    const success = (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      coordinates.latitude = lat;
      coordinates.longitude = long;

      postLocation(coordinates)
        .then(genre => {
          const searchTerms = `${genre}${chosenGenre}`;
          document.body.style.backgroundImage = `url(${backgroundTranslator(genre)})`;
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
        const searchTerms = `${genre}${chosenGenre}`;
        document.body.style.backgroundImage = `url(${backgroundTranslator(genre)})`;
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

  const onChosenWeatherSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    postChosenWeather(chosenWeather)
      .then(genre => {
        setChosenWeatherResponse(`+${genre}`);
        const searchTerms = `${genre}${chosenGenre}`;
        document.body.style.backgroundImage = `url(${backgroundTranslator(genre)})`;
        getPlaylist(searchTerms, token)
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

    if(zipCode) {
      setLoading(true);

      const zipAndCountry = {
        zipCode,
        country
      };

      postZipCode(zipAndCountry)
        .then(genre => {
          const searchTerms = `${genre}${chosenGenre}${chosenWeatherResponse}`;
          document.body.style.backgroundImage = `url(${backgroundTranslator(genre)})`;
          getPlaylist(searchTerms, token)
            .then(res => {
              setPlaylists(res);
              const id = newUserPlaylist(res);
              setUserPlaylist(id);
              localStorage.setItem('currentPlaylist', id);
            });
          setLoading(false);
        });
    }
    else {
      setLoading(true);

      const weatherSearch = chosenWeatherResponse.substring(1);
      const searchTerms = `${weatherSearch}${chosenGenre}`;
      getPlaylist(searchTerms, token)
        .then(res => {
          setPlaylists(res);
          const id = newUserPlaylist(res);
          setUserPlaylist(id);
          localStorage.setItem('currentPlaylist', id);
        });
      setLoading(false);
    }
  };

  if(loading) return <Loading />;
  return (
    <>
      <Header />
      <div className={styles.Player}>
        {/* COLUMN ONE ------------------------- */}
        <div className={styles.columnOne}>
          {
            !userPlaylist
              ? 
              <button onClick={onTrackingClick} className={styles.MainButton}>Generate Playlist</button>
              : 
              <>
                <button onClick={onTrackingClick} className={styles.MainButton}>Check Weather Again</button>
                <button onClick={onTrackingClick} className={styles.MainShort}>Check Weather</button>
              </>
          }

          {playlists.length > 1
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
              {/* {playlists.length > 1
                ? <button onClick={onNextClick}>Next Playlist</button>
                : <div></div>
              } */}
            </div>
        }

        {/* COLUMN THREE ------------------------- */}

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

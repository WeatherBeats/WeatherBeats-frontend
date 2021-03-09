/* eslint-disable max-len */
import thunderstorm from '../assets/backgroundImages/raychel-sanner-1cJXplTxrmI-unsplash.jpg';
import rain from '../assets/backgroundImages/rain-large.jpg';
import snow from '../assets/backgroundImages/snowing.jpg';
import sunny from '../assets/backgroundImages/cloudy-sunny-58b1b9.jpg';
import clouds from '../assets/backgroundImages/david-tovar-IU-0htNvVrk-unsplash.jpg';
import mist from '../assets/backgroundImages/augustine-wong-v7zqZiowVHA-unsplash.jpg';
import fog from '../assents/backgroundIamges/foggy-forest-353a3e.jpg';
import sand from '../assets/backgroundImages/wolfgang-hasselmann-L4VxDFJmaOM-unsplash.jpg';
import hazzy from '../assets/backgroundIamges/ralph-ravi-kayden-Y0k61ZYpByM-unsplash.jpg';

function backgroundTranslator(weather) {

  const dict = {
    'gloomy': thunderstorm,
    'angry': thunderstorm,
    'hard': thunderstorm,

    'meditation': rain,
    'relaxing': rain,
    'mellow': rain,
    'chill': rain,

    // Gloomy here is rain
    // 'r03d': 'gloomy',
    // 'r03n': 'gloomy',

    'peril': snow,

    'soothing': rain,
    // 'r06d': 'angry', this is rain but thunderstorm will appear
    // 'r06n': 'angry', this should be heavy shower rain

    'peaceful': snow,

    'dreamy': snow,
    'blizzard': snow,
    'freezing': snow,
    'alpine': snow,

    //  Find better pics for mist
    'misty': mist,
    // Find smoke
    'smoke': mist,

    'hazy': hazzy,

    'sandstorm': sand,

    'foggy': fog,

    'upbeat': sunny,

    'happy': clouds,
    'carefree': clouds,
    'overcast': clouds,

    'rainy tacos': rain,
  };

  const backgroundImage = Object.getOwnPropertyDescriptor(dict, weather);

  return backgroundImage.value;
}

export default backgroundTranslator;

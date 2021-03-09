/* eslint-disable max-len */
import thunderstorm from '../../../public/backgroundImages/raychel-sanner-1cJXplTxrmI-unsplash.jpg';
import rain from '../../../public/backgroundImages/rain-large.jpg';
import snow from '../../../public/backgroundImages/snowing.jpg';
import sunny from '../../../public/backgroundImages/cloudy-sunny-58b1b9.jpg';
import clouds from '../../../public/backgroundImages/david-tovar-IU-0htNvVrk-unsplash.jpg';
import mist from '../../../public/backgroundImages/augustine-wong-v7zqZiowVHA-unsplash.jpg';
import fog from '../../../public/backgroundImages/foggy-forest-353a3e.jpg';
import sand from '../../../public/backgroundImages/wolfgang-hasselmann-L4VxDFJmaOM-unsplash.jpg';
import hazy from '../../../public/backgroundImages/ralph-ravi-kayden-Y0k61ZYpByM-unsplash.jpg';

function backgroundTranslator(genre) {

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

    hazy,

    'sandstorm': sand,

    'foggy': fog,

    'upbeat': sunny,

    'happy': clouds,
    'carefree': clouds,
    'overcast': clouds,

    'rainy tacos': rain,
  };
  const backgroundImage = dict[genre];

  return backgroundImage;
}

export default backgroundTranslator;

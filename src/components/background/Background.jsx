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
    'gloomy+night': thunderstorm,
    'angry': thunderstorm,
    'angry+night': thunderstorm,
    'hard': thunderstorm,
    'hard+night': thunderstorm,

    'meditation': rain,
    'meditation+night': rain,
    'relaxing': rain,
    'relaxing+night': rain,
    'mellow': rain,
    'mellow+night': rain,
    'chill': rain,
    'chill+night': rain,

    // Gloomy here is rain
    // 'r03d': 'gloomy',
    // 'r03n': 'gloomy',

    'peril': snow,
    'peril+night': snow,

    'soothing': rain,
    'soothing+night': rain,
    // 'r06d': 'angry', this is rain but thunderstorm will appear
    // 'r06n': 'angry', this should be heavy shower rain

    'peaceful': snow,
    'peaceful+night': snow,

    'dreamy': snow,
    'dreamy+night': snow,
    'blizzard': snow,
    'blizzard+night': snow,
    'freezing': snow,
    'freezing+night': snow,
    'alpine': snow,
    'alpine+night': snow,

    //  Find better pics for mist
    'misty': mist,
    'misty+night': mist,
    // Find smoke
    'smoke': mist,
    'smoke+night': mist,

    hazy,
    'hazy+night': hazy,

    'sandstorm': sand,
    'sandstorm+night': sand,

    'foggy': fog,
    'foggy+night': fog,

    'upbeat': sunny,
    'upbeat+night': sunny,

    'happy': clouds,
    'happy+night': clouds,
    'carefree': clouds,
    'carefree+night': clouds,
    'overcast': clouds,
    'overcast+night': clouds,

    'rainy+tacos': rain,
    'rainy+tacos+night': rain,
  };
  const backgroundImage = dict[genre];

  return backgroundImage;
}

export default backgroundTranslator;

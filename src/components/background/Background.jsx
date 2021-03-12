/* eslint-disable max-len */
import thunderstorm from '../../../public/backgroundImages/thunderstorm.jpg';
import rain from '../../../public/backgroundImages/rain.jpg';
import snow from '../../../public/backgroundImages/snow.jpg';
import sunny from '../../../public/backgroundImages/sunny.jpg';
import clouds from '../../../public/backgroundImages/clouds.jpg';
import mist from '../../../public/backgroundImages/mist.jpg';
import fog from '../../../public/backgroundImages/fog.jpg';
import sand from '../../../public/backgroundImages/sandy.jpg';
import hazy from '../../../public/backgroundImages/hazy.jpg';

import heavyRain from '../../../public/backgroundImages/heavyRain.jpg';
import heavyShowerRain from '../../../public/backgroundImages/heavyShowerRain.jpg';
import smoke from '../../../public/backgroundImages/smoke.jpg';
import freezingRain from '../../../public/backgroundImages/freezingRain.jpg';

function backgroundTranslator(mood) {

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

    // heavy rain
    'intense': heavyRain,
    'intense+night': heavyRain,


    'quiet': freezingRain,
    'quiet+night': freezingRain,

    'soothing': rain,
    'soothing+night': rain,

    // Heavy shower rain
    'extreme': heavyShowerRain,
    'extreme+night': heavyShowerRain,

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
    smoke,
    'smoke+night': smoke,

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
  const backgroundImage = dict[mood];

  return backgroundImage;
}

export default backgroundTranslator;

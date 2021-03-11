
export const postLocation = (coordinates) => {
  return fetch(`${process.env.API_URL}/api/v1/weather`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(coordinates)
  })
    .then(res => res.json());
};

export const postZipCode = (zipAndCountry) => {
  return fetch(`${process.env.API_URL}/api/v1/weather/zip`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(zipAndCountry)
  })
    .then(res => res.json());
};

export const postChosenWeather = (weather) => {
  return fetch(`${process.env.API_URL}/api/v1/weather/chosen`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ weather })
  })
    .then(res => res.json());
};

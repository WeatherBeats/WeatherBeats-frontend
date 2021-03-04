// const API_URL = 'http://localhost:8888';

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

export const getLogin = () => {
  return fetch(`${process.env.API_URL}/login`)
    .then(res => res.json());
};

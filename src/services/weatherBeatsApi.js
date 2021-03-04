// This is in the .env file:
// API_URL=http://localhost:8888

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

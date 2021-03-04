export const postLocation = (coordinates) => {
  return fetch(`${process.env.API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(coordinates)
  })
    .then(res => res.json());
};

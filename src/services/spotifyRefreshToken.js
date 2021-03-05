
export const getNewAccessToken = (refreshToken) => {
  return fetch(
    `${process.env.API_URL}/refresh_token?refresh_token=${refreshToken}`)
    // {
    //   method: 'GET'
    //   // headers: {
    //   //   'Authorization': `Bearer ${authToken}`,
    //   //   'Content-Type': 'application/json'
    //   // }
    // })
    .then(res => res.json());
};


export const getNewAccessToken = (refreshToken) => {
  return fetch(
    `${process.env.API_URL}/refresh_token?refresh_token=${refreshToken}`)
    .then(res => res.json());
};

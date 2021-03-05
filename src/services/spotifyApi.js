
export const getPlaylist = (searchTerm, authToken) => {
  return fetch(
    `https://api.spotify.com/v1/search?q=${searchTerm}&type=playlist`, 
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => json.playlists.items)
    .then(items => items.map(item => (
      item.id
    )));
};

import { useEffect, useState } from 'react';
import { useSpotifyApi } from '../hooks/useSpotifyApi'


const ListArtists = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [artists, setArtists] = useState<any[]>([]);
  const { fetchTopArtists } =  useSpotifyApi();

  useEffect(() => {
    fetchTopArtists({setArtists});
  }, [fetchTopArtists]);

  console.log(artists)

  return (
    <div>
      <h2>Top Artists</h2>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            <img src={artist.images[0].url} alt={artist.name} width="50" height="50" />
            <span>{artist.name}</span>
          <div onClick={() => window.location.href = `/artist/${artist.id}`} style={{ cursor: 'pointer', color: 'white', textDecoration: 'underline' }}>
            View Artist
          </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListArtists;
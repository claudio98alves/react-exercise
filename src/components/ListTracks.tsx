import { useEffect, useState } from 'react';
import { useSpotifyApi } from '../hooks/useSpotifyApi'


const ListTracks = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tracks, setTracks] = useState<any[]>([]);
  const { fetchTopTracks } =  useSpotifyApi();

  useEffect(() => {
    fetchTopTracks({setTracks});
  }, [fetchTopTracks]);

  console.log(tracks)

  return (
    <div>
      <h2>Top Tracks</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            { track.images && <img src={track.images[0]?.url} alt={track.name} width="50" height="50" /> }
            <span>{track.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTracks;
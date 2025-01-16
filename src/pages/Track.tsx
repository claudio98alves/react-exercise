import { useEffect, useState } from 'react';
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom";
import { useSpotifyApi } from '../hooks/useSpotifyApi'

const Artist = () => {
  const navigate = useNavigate();
  const { trackId } = useParams()
  const [track, setTrack] = useState<any>();
  const { fetchTrack } =  useSpotifyApi();

  useEffect(() => {
    fetchTrack({trackId ,setTrack});
  }, [fetchTrack]);

  console.log(track)
  return (
    <>
      <div>
      <button onClick={() => navigate('/home')}>Back to Home</button>
      {track && (
        <div>
          <h2>{track.name}</h2>
          <p>Release Date: {track.album.release_date}</p>
            <p>Artists: {track.artists.map((artist: any, index: number) => (
              <span key={artist.id}>
                <a href={`/artist/${artist.id}`}>{artist.name}</a>
                {index < track.artists.length - 1 && ', '}
              </span>
            ))}</p>
          <img src={track.album.images[0].url} alt={track.name} />
          <button onClick={() => window.open(track.external_urls.spotify, '_blank')}>Listen on Spotify</button>
        </div>
      )}
      </div>
    </>
  )
}


export default Artist
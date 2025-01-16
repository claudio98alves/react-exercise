import { useEffect, useState } from 'react';
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom";
import { useSpotifyApi } from '../hooks/useSpotifyApi'

const Artist = () => {
  const navigate = useNavigate();
  const { artistId } = useParams()
  const [artist, setArtist] = useState<any>();
  const { fetchArtist } =  useSpotifyApi();

  useEffect(() => {
    fetchArtist({artistId ,setArtist});
  }, [fetchArtist]);

  console.log(artist)
  return (
    <>
      <div>
      <button onClick={() => navigate('/home')}>Back to Home</button>
      {artist && (
        <div>
          <h3>{artist.name}</h3>
          {artist.images && artist.images.length > 0 && (
            <img src={artist.images[0].url} alt={artist.name} />
          )}
          <p>Followers: {artist.followers.total.toLocaleString()}</p>
          <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
            Listen on Spotify
          </a>
          <ul>
        {artist.genres.map((genre: string, index: number) => (
          <li key={index}>{genre}</li>
        ))}
          </ul>
        </div>
      )}
      </div>
    </>
  )
}


export default Artist
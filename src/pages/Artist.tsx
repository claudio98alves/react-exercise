import { useEffect, useState } from 'react';
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom";
import { useSpotifyApi } from '../hooks/useSpotifyApi'
import ListTracks from '../components/ListTracks';
import ListAlbums from '../components/ListAlbums';
import { AlbumProps, ArtistProps, TrackProps } from '../types';

const Artist = () => {
  const navigate = useNavigate();
  const { artistId } = useParams()
  const { fetchArtist, fetchTracksByArtist, fetchAlbumsByArtist } =  useSpotifyApi();
  const [artist, setArtist] = useState<ArtistProps>();
  const [albums, setAlbums] = useState<AlbumProps[]>([]);
  const [tracks, setTracks] = useState<TrackProps[]>([]);

  
  useEffect(() => {
    fetchArtist({artistId ,setArtist});
  }, [fetchArtist, artistId]);

  useEffect(() => {
    fetchTracksByArtist({artistId, setTracks});
  }, [fetchTracksByArtist, artistId]);

  useEffect(() => {
    fetchAlbumsByArtist({artistId, setAlbums});
  }, [fetchAlbumsByArtist, artistId]);

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
          <button onClick={() => window.open(artist.external_urls.spotify, '_blank')}>Listen on Spotify</button>

          <ul>
        {artist.genres.map((genre: string, index: number) => (
          <li key={index}>{genre}</li>
        ))}
          </ul>
          <ListAlbums albums={albums}></ListAlbums>
          <ListTracks tracks={tracks} title={"Top Artist Tracks"}></ListTracks>
        </div>
      )}
      </div>
    </>
  )
}


export default Artist
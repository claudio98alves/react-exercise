import { useEffect, useState } from 'react';
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom";
import { useSpotifyApi } from '../hooks/useSpotifyApi'
import ListTracks from '../components/ListTracks';
import { TrackProps, AlbumProps } from '../types';

const Album = () => {
  const navigate = useNavigate();
  const { albumId } = useParams()
  const [album, setAlbum] = useState<AlbumProps>();
  const [albumTracks, setAlbumTracks] = useState<TrackProps[]>([]);
  const { fetchAlbum, fetchAlbumTracks } =  useSpotifyApi();

  useEffect(() => {
    fetchAlbum({albumId ,setAlbum});
  }, [fetchAlbum, albumId]);

  useEffect(() => {
    fetchAlbumTracks({albumId ,setAlbumTracks});
  }, [fetchAlbumTracks, albumId]);


  //TODO: should reuse the the listArtist Component, but this way looked better
  return (
    <>
      <div>
      <button onClick={() => navigate('/home')}>Back to Home</button>
      {album && (
        <div>
          <h2>{album.name}</h2>
          <p>Release Date: {album.release_date}</p>
            <p>Artists: {album.artists.map((artist, index: number) => (
              <span key={artist.id}>
                <a href={`/artist/${artist.id}`}>{artist.name}</a>
                {index < album.artists.length - 1 && ', '}
              </span>
            ))}</p>
          <img src={album.images[0].url} alt={album.name} />
          <button onClick={() => window.open(album.external_urls.spotify, '_blank')}>Listen on Spotify</button>
          <ListTracks tracks={albumTracks} title={"Album's Tracks"}></ListTracks>
        </div>
      )}
      </div>
    </>
  )
}


export default Album
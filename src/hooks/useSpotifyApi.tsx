// dont really know if this should be inside hooks, but it seemed ok for nowimport { createContext, useContext, useMemo, ReactNode } from "react";
import { useMemo } from 'react';
import { useAuth } from '../hooks/useAuth'

//TODO: Code should be dry, just build urls and have a unique fetch with error handling

export const useSpotifyApi = () => {
  const { token, logout } = useAuth();

  const fetchTopArtists = ({setArtists}: {setArtists: ((items: any[]) => void)}) => {
    fetchTop({type: "artists", setFunction: setArtists})
  };

  const fetchTopTracks = ({setTracks}: {setTracks: ((items: any[]) => void)}) => {
    fetchTop({type: "tracks", setFunction: setTracks})
  };

  const fetchTop = async ({type, limit=5, setFunction}: {type: string, limit?: number, setFunction: (items: any[]) => void}) => {

    const fetchUrl = `https://api.spotify.com/v1/me/top/${type}?limit=${limit}`;
    const data = await spotifyFecth({fetchUrl })

    setFunction(data.items)
    return;
  }

  const fetchArtist = async ({artistId, setArtist}: {artistId: string | undefined, setArtist: (artist: any) => void}) => {

    const fetchUrl = `https://api.spotify.com/v1/artists/${artistId}`;
    const data = await spotifyFecth({fetchUrl })

    setArtist(data)
    return;
  }

  const fetchTrack = async ({trackId, setTrack}: {trackId: string | undefined, setTrack: (track: any) => void}) => {

    const fetchUrl = `https://api.spotify.com/v1/tracks/${trackId}`;
    const data = await spotifyFecth({fetchUrl })

    setTrack(data)
    return;
  }

  const fetchAlbum = async ({albumId, setAlbum}: {albumId: string | undefined, setAlbum: (track: any) => void}) => {

    const fetchUrl = `https://api.spotify.com/v1/albums/${albumId}`;
    const data = await spotifyFecth({fetchUrl })

    setAlbum(data)
    return;
  }

  const fetchAlbumTracks = async ({albumId, setAlbumTracks}: {albumId: string | undefined, setAlbumTracks: (track: any) => void}) => {

    const fetchUrl = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
    const data = await spotifyFecth({fetchUrl })

    setAlbumTracks(data.items)
    return;
  }

  const fetchTracksByArtist = async ({artistId, setTracks}: {artistId: string | undefined, setTracks: (track: any) => void}) => {

    const fetchUrl =`https://api.spotify.com/v1/artists/${artistId}/top-tracks`;
    const data = await spotifyFecth({fetchUrl })

    setTracks(data.tracks.slice(0,5))
    return;
  }

  const fetchAlbumsByArtist = async ({artistId, setAlbums}: {artistId: string | undefined, setAlbums: (track: any) => void}) => {

    const fetchUrl = `https://api.spotify.com/v1/artists/${artistId}/albums?limit=5`;

    const data = await spotifyFecth({fetchUrl })
    setAlbums(data.items)
    return;
  }

  const spotifyFecth = async ({fetchUrl}: {fetchUrl: string}) => {
    if (!token) {
      console.error('No access token found');
      return;
    }

    const response = await fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to fecth ' + fetchUrl);
      console.log(response)
      if(response.status == 401) {
        logout()
      }
      return;
    }

    const data = await response.json();
    return data
  }

  return useMemo(
    () => ({
      fetchTopArtists,
      fetchTopTracks,
      fetchArtist,
      fetchTrack,
      fetchTracksByArtist,
      fetchAlbumsByArtist,
      fetchAlbum,
      fetchAlbumTracks
    }),
    [token]
  );
};

export default useSpotifyApi
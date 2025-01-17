// dont really know if this should be inside hooks, but it seemed ok for nowimport { createContext, useContext, useMemo, ReactNode } from "react";
import { useMemo } from 'react';
import { useAuth } from '../hooks/useAuth'
import { ArtistProps, TrackProps, AlbumProps } from '../types';

export const useSpotifyApi = () => {
  const { token, logout } = useAuth();

  const fetchTopArtists = async ({setArtists}: {setArtists: ((items: ArtistProps[]) => void)}) => {
    const fetchUrl = `https://api.spotify.com/v1/me/top/artists?limit=5`;
    const data = await spotifyFecth({fetchUrl })

    setArtists(data.items)
    return;
  };

  const fetchTopTracks = async ({setTracks}: {setTracks: ((items: TrackProps[]) => void)}) => {
    const fetchUrl = `https://api.spotify.com/v1/me/top/tracks?limit=5`;
    const data = await spotifyFecth({fetchUrl })

    setTracks(data.items)
    return;
  };

  const fetchArtist = async ({artistId, setArtist}: {artistId: string | undefined, setArtist: (artist: ArtistProps) => void}) => {

    const fetchUrl = `https://api.spotify.com/v1/artists/${artistId}`;
    const data = await spotifyFecth({fetchUrl })

    setArtist(data)
    return;
  }

  const fetchTrack = async ({trackId, setTrack}: {trackId: string | undefined, setTrack: (track: TrackProps) => void}) => {

    const fetchUrl = `https://api.spotify.com/v1/tracks/${trackId}`;
    const data = await spotifyFecth({fetchUrl })

    setTrack(data)
    return;
  }

  const fetchAlbum = async ({albumId, setAlbum}: {albumId: string | undefined, setAlbum: (album: AlbumProps) => void}) => {

    const fetchUrl = `https://api.spotify.com/v1/albums/${albumId}`;
    const data = await spotifyFecth({fetchUrl })

    setAlbum(data)
    return;
  }

  const fetchAlbumTracks = async ({albumId, setAlbumTracks}: {albumId: string | undefined, setAlbumTracks: (tracks: TrackProps[]) => void}) => {

    const fetchUrl = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
    const data = await spotifyFecth({fetchUrl })

    setAlbumTracks(data.items)
    return;
  }

  const fetchTracksByArtist = async ({artistId, setTracks}: {artistId: string | undefined, setTracks: (tracks: TrackProps[]) => void}) => {

    const fetchUrl =`https://api.spotify.com/v1/artists/${artistId}/top-tracks`;
    const data = await spotifyFecth({fetchUrl })

    setTracks(data.tracks.slice(0,5))
    return;
  }

  const fetchAlbumsByArtist = async ({artistId, setAlbums}: {artistId: string | undefined, setAlbums: (albums: AlbumProps[]) => void}) => {

    const fetchUrl = `https://api.spotify.com/v1/artists/${artistId}/albums?limit=5`;

    const data = await spotifyFecth({fetchUrl })
    setAlbums(data.items)
    return;
  }

  const searchOnSpotify = async ({query} : {query: string}) => {
    const fetchUrl = `https://api.spotify.com/v1/search/?q=${query}&type=album,artist,track&limit=3`;
    
    const data = await spotifyFecth({fetchUrl })
    const options = [...data.albums.items,...data.artists.items,...data.tracks.items]
    return options;
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
      fetchAlbumTracks,
      searchOnSpotify
    }),
    [token]
  );
};

export default useSpotifyApi
// dont really know if this should be inside hooks, but it seemed ok for nowimport { createContext, useContext, useMemo, ReactNode } from "react";
import { useMemo } from 'react';
import { useAuth } from '../hooks/useAuth'

export const useSpotifyApi = () => {
  const { token } = useAuth();

  const fetchTopArtists = ({setArtists}: {setArtists: ((items: any[]) => void)}) => {
    fetchTop({type: "artists", setFunction: setArtists})
  };

  const fetchTopTracks = ({setTracks}: {setTracks: ((items: any[]) => void)}) => {
    fetchTop({type: "tracks", setFunction: setTracks})
  };

  const fetchTop = async ({type, limit=5, setFunction}: {type: string, limit?: number, setFunction: (items: any[]) => void}) => {
    if (!token) {
      console.error('No access token found');
      return;
    }

    const response = await fetch(`https://api.spotify.com/v1/me/top/${type}?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch top ' + type);
      return;
    }

    const data = await response.json();
    setFunction(data.items)
    return;
  }

  const fetchArtist = async ({artistId, setArtist}: {artistId: string | undefined, setArtist: (artist: any) => void}) => {
    if (!token) {
      console.error('No access token found');
      return;
    }

    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to Artist');
      return;
    }

    const data = await response.json();
    setArtist(data)
    return;
  }



  return useMemo(
    () => ({
      fetchTopArtists,
      fetchTopTracks,
      fetchArtist
    }),
    [token]
  );
};

export default useSpotifyApi
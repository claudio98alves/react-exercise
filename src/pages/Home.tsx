import ListArtists from "../components/ListArtists"
import ListTracks from "../components/ListTracks"
import SearchBar from "../components/SearchBar"
import { useSpotifyApi } from '../hooks/useSpotifyApi'
import { useEffect, useState } from 'react';
import { ArtistProps, TrackProps } from "../types";

const Home = () => {

  const [tracks, setTracks] = useState<TrackProps[]>([]);
  const [artists, setArtists] = useState<ArtistProps[]>([]);
  const { fetchTopArtists, fetchTopTracks } =  useSpotifyApi();

  useEffect(() => {
    fetchTopArtists({setArtists});
  }, [fetchTopArtists]);
  

  useEffect(() => {
    fetchTopTracks({setTracks});
  }, [fetchTopTracks]);
  
  
  return (
    <>
      <div>
        <h2 className="title">Welcome to Home</h2>
        <div className="mb-16">
          <SearchBar></SearchBar>
        </div>
        <div className="flex flex-row">
          <ListArtists artists={artists}></ListArtists>
          <ListTracks tracks={tracks} title={"Top Tracks"}></ListTracks>
        </div>
      </div>
    </>
  )
}

export default Home

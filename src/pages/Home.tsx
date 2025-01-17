import ListArtists from "../components/ListArtists"
import ListTracks from "../components/ListTracks"
import { useSpotifyApi } from '../hooks/useSpotifyApi'
import { useEffect, useState } from 'react';



const Home = () => {

  const [tracks, setTracks] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
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
        <h2>Welcome to Home</h2>
        <ListArtists artists={artists}></ListArtists>
        <ListTracks tracks={tracks} title={"Top Tracks"}></ListTracks>
      </div>
    </>
  )
}

export default Home

//TODO: Fix Artist Track Album type (global file with types??)
import ListArtists from "../components/ListArtists"
import ListTracks from "../components/ListTracks"

const Home = () => {

  return (
    <>
      <div>
        <h2>Welcome to Home</h2>
        <ListArtists></ListArtists>
        <ListTracks></ListTracks>
      </div>
    </>
  )
}

export default Home

//TODO: Fix Artist Track Album type (global file with types??)
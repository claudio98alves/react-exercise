const clientId = 'f7f5ea5e2f56446fbc12726619aa5eb9';
const redirectUri = 'http://localhost:5173/callback'; // Replace with your redirect URI
const scopes = [
  'user-top-read',
  // Add other scopes as needed
];

const handleLogin = () => {
  // not the safest authentication but works for now
  const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scopes.join(' '))}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  window.location.href = authUrl;
}

const Login = () => {

  return (
    <>
      <div>
        <h2>Login to Spotify</h2>
        <button onClick={handleLogin}>Login with Spotify</button>
      </div>
    </>
  )
}

export default Login

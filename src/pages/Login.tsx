const clientId = 'f7f5ea5e2f56446fbc12726619aa5eb9';
const redirectUri = 'http://localhost:5173/callback';
const scopes = [
  'user-top-read',
];

const handleLogin = () => {
  //
  const queryParams = new URLSearchParams({
    response_type: 'token',
    client_id: clientId,
    scope: scopes.join(' '),
    redirect_uri: redirectUri,
  });

  const authUrl = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;
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

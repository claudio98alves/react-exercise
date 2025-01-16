
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

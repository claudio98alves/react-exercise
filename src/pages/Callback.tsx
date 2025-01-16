import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', ''));
    const accessToken = params.get('access_token');

    if (accessToken) {
      // Store the access token in local storage or state management
      localStorage.setItem('spotify_access_token', accessToken);
      navigate('/home');
    } else {
      // Handle error
      console.error('Access token not found');
    }
  }, [navigate]);

  return <div>Loading...</div>;
}

export default Callback;
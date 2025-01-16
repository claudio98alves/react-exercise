import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'

const Callback = () => {
  const navigate = useNavigate();
  const { login, token } = useAuth();


  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', ''));
    const accessToken = params.get('access_token');

    if (accessToken || token) {
      login(accessToken)
      navigate('/home');
    }
    else {
      console.error('Access token not found');
    }
  }, [login, navigate, token]);


  return <div>Loading...</div>;
}

export default Callback;
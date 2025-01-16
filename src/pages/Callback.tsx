import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'

const Callback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();


  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', ''));
    const accessToken = params.get('access_token');

    if (accessToken) {
      login(accessToken)
      navigate('/home');
    } else {
      console.error('Access token not found');
    }
  }, [login, navigate]);

  return <div>Loading...</div>;
}

export default Callback;
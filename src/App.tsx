import React, { useContext, useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';

import { instance as axios, getData } from './axios-instance';
import { UserContext } from './providers/UserProvider';
import { signInWithGoogle } from './firebase';
import Container from './containers/Container';
import './App.css';

const App = () => {

  const currentUser = useContext(UserContext);

  const [user, setUser] = useState(localStorage.getItem('user'));
  const [userId, setUserID] = useState(localStorage.getItem('userId'));
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    setUser(localStorage.getItem('user'));
    setToken(localStorage.getItem('token'));
    setUserID(localStorage.getItem('userId'));
  }, [currentUser]);

  // setting up data
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (token && userId) {
      getData(source, token, setData);
    }
    return () => {
      source.cancel('GET request cancelled');
    };
  }, [token, userId]);

  let content;

  if (user && data) {
    content = <Container user={user} recipes={data.recipes}/>;
  } else if (!user) {
    content = 
    <div id="login-page">
      <h2>Nincs bejelentkezett felhasználó</h2>
      <Button 
        variant="contained" 
        color="primary" 
        size="large" 
        onClick={event => signInWithGoogle(event)
      }>
        Belépés Google-val
      </Button>
    </div>;
  } else {
    content = <p>Töltés...</p>;
  }

  return (
    <div>
      {content}
    </div>
  );
}

export default App;

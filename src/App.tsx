import React, { useContext, useState, useEffect } from 'react';
import { instance as axios, getData } from './axios-instance';
import { UserContext, TokenContext } from './providers/UserProvider';
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

  console.log(token)

  let content;

  if (user && data) {
    content = <Container user={user} recipes={data.recipes}/>;
  } else if (!user) {
    content = 
    <div id="login-page">
      <h2>Nincs bejelentkezett felhasználó</h2>
      <button onClick={event => signInWithGoogle(event)}>Belépés Google-val</button>
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

import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import * as helpers from './helpers/helpers';

function App() {

  const [username, setUsername] = useState('')
  const [balance, setAccountBalance] = useState(0)

  useEffect(() => {
    (
      async () => {

        const jwt = helpers.getJwtFromCookie();

        const userResponse = await fetch('http://localhost:3333/user', {
          headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${jwt}` },
          credentials: 'include',
        })

        const accountResponse = await fetch('http://localhost:3333/account/', {
          headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${jwt}` },
          credentials: 'include',
        })


        const user = await userResponse.json()
        setUsername(user.username);

        const balance = await accountResponse.json()
        setAccountBalance(balance.balance);
      }
    )()
  })
  // allUsers={allUsers}
  return (
    <Router>
      <Header username={username} setUsername={setUsername} />
      <main>
        <Container>
          <Route path='/' exact component={() => <HomeScreen username={username} balance={balance} />} />
          <Route path='/signup' component={SignupScreen} />
          <Route path='/login' component={LoginScreen} />
        </Container>
      </main>
    </Router>
  );
}

export default App;

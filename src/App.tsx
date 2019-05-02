import React, { useState, FC} from 'react';
import { Router } from '@reach/router';
import './App.css';
import './variable.css';
import './custom.css'
import PageBase from './components/PageBase';
import { Home, Welcome, Login, Payment } from './pages';

const App: FC = () => {

  const [user, setUser] = useState({});

  return (
    <Router>
      <PageBase path='/'>
        <Welcome default />
        <Home path='home' user={user} />
        <Login path='login' setUser={setUser} user={user} />
        <Payment path='signup' />
      </PageBase>
    </Router>
  );
}

export default App;

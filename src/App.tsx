import React, { useState, FC } from 'react';
import { Router } from '@reach/router';
import { StripeProvider, Elements } from 'react-stripe-elements';
import './App.css';
import './variable.css';
import './custom.css'
import PageBase from './components/PageBase';
import { Home, Welcome, Login, PaymentPage } from './pages';

const App: FC = () => {

  const [user, setUser] = useState({});

  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_API_KEY as string}>
      <Elements>
        <Router>
          <PageBase path='/'>
            <Welcome default />
            <Home path='home' user={user} />
            <Login path='login' setUser={setUser} user={user} />
            <PaymentPage path='signup' />
          </PageBase>
        </Router>
      </Elements>
    </StripeProvider>
  );
}

export default App;

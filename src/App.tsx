import React, { useState, FC } from 'react';
import { Router } from '@reach/router';
import { StripeProvider, Elements } from 'react-stripe-elements';
import './App.css';
import './variable.css';
import './custom.css'
import PageBase from './components/PageBase';
import { useLocalStorage } from './services/auth';
import { Home, Welcome, Login, PaymentPage, Privacy, DappDetails } from './pages';


// user: {
//   signInUserSession: {
//     idToken: {
//       jwtToken: "eyJra...6iJnw"
//     }
//   }
// }
const App: FC = () => {
  let user: any;
  let setUser:any;
  [user, setUser] = useLocalStorage('user', {});
  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_API_KEY as string}>
      <Elements>
        <Router>
          <PageBase path='/'>
            <Welcome default user={user} />
            <Home path='home' user={user} setUser={setUser} />
            <DappDetails path="home/:id" />
            <Login path='login' setUser={setUser} user={user} />
            {/* <PaymentPage path='signup' /> */}
            <Privacy path='privacy' />
          </PageBase>
        </Router>
      </Elements>
    </StripeProvider>
  );
}

export default App;

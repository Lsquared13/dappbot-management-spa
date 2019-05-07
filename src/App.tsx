import React, { useState, FC } from 'react';
import { Router } from '@reach/router';
import { StripeProvider, Elements } from 'react-stripe-elements';
import './App.css';
import './variable.css';
import './custom.css'
import PageBase from './components/PageBase';
import { Home, Welcome, Login, PaymentPage, Privacy } from './pages';


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
  [user, setUser] = useState({});
  console.log(user && user.signInUserSession && user.signInUserSession.idToken && JSON.stringify(user.signInUserSession.idToken.jwtToken))
  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_API_KEY as string}>
      <Elements>
        <Router>
          <PageBase path='/'>
            <Welcome default />
            <Home path='home' user={user} />
            <Login path='login' setUser={setUser} user={user} />
            <PaymentPage path='signup' />
            <Privacy path='privacy' />
          </PageBase>
        </Router>
      </Elements>
    </StripeProvider>
  );
}

export default App;

import React, { FC, useEffect } from 'react';
import { Router } from '@reach/router';
import { StripeProvider, Elements } from 'react-stripe-elements';
import './App.css';
import './variable.css';
import './custom.css'
import PageBase from './components/PageBase';
import { useLocalStorage, currentUserInfo } from './services/auth';
import { Home, Welcome, Login, Privacy, DappDetails,PaymentPage } from './pages';


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
  console.log('currentUserInfo(): ',user);
  let userData = { user, setUser };
  useEffect(()=>{
    console.log('--- User object changed, fetching fresh info ---');
    currentUserInfo().then((user)=>console.log('Found user: ',user));
  }, [user]);
  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_API_KEY as string}>
      <Elements>
        <Router>
          <PageBase path='/' {...userData} >
            <Welcome default {...userData} />
            <Home path='home' {...userData} />
            <DappDetails path="home/:id" {...userData} />
            <Login path='login' {...userData} />
            <PaymentPage path='signup' {...userData}/>
            <Privacy path='privacy'  />
          </PageBase>
        </Router>
      </Elements>
    </StripeProvider>
  );
}

export default App;

import React, { FC, useEffect } from 'react';
import { Router } from '@reach/router';
import { StripeProvider, Elements } from 'react-stripe-elements';
import './App.css';
import './variable.css';
import './custom.css'
import "./fonts.css";
import PageBase from './layout/PageBase';
import { HomeBase } from "./layout/HomeBase";
import { useLocalStorage, currentUserInfo } from './services/auth';
import { Home, Welcome, Login, Privacy, DappDetails } from './pages';
import { DashboardBase } from './apps/DashboardBase';
import { NewDappFormBase } from './apps';


// user: {
//   signInUserSession: {
//     idToken: {
//       jwtToken: "eyJra...6iJnw"
//     }
//   }
// }
const App: FC = () => {
  let user,setUser;
  [user, setUser] = useLocalStorage('user', {});
  let userData = { user, setUser };
  
  useEffect(() => {
    let didCancel = false;
    async function fetchMyAPI() {
      if (!didCancel) { // Ignore if we started fetching something else
        const user = await currentUserInfo();
        console.log('Found user: ',user)     
      }
    }  
    fetchMyAPI();
    console.log('--- 0 User object changed, fetching fresh info ---');
    return () => { didCancel = true; }; // Remember if we start fetching something else
  }, []);
  
  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_API_KEY as string}>
      <Elements>
        <Router>
          <PageBase path='/' {...userData} >
            <Welcome default {...userData} />
            <Home path='other' {...userData} />
            <DappDetails path="home/:id" {...userData} />
            <Login path='login' {...userData} />
            {/* <PaymentPage path='signup' /> */}
            <Privacy path='privacy' />
          </PageBase>
          <HomeBase path="/home" {...userData}>
            {/* SUB-APPLICATION: Dapp Dashboard */}
            <DashboardBase path="/*"  {...userData}/>
            <NewDappFormBase path="new/*" {...userData} />
          </HomeBase>
        </Router>
      </Elements>
    </StripeProvider>
  );
}

export default App;

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

import { SettingsContainerBase } from "./apps/SettingsContainerBase";

import { Home, Welcome, Login, Privacy, DappDetails, PaymentPage } from './pages';
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
  console.log("USER: ",user)
  
  useEffect(() => {
    async function fetchMyAPI() {
         user = await currentUserInfo();
    }  
    fetchMyAPI();
   
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
            <PaymentPage path='signup' {...userData}/>
            <Privacy path='privacy'  />
          </PageBase>
          <HomeBase path="/home" {...userData}>
            {/* SUB-APPLICATION: Dapp Dashboard */}
            <DashboardBase path="/*"  {...userData}/>
            <NewDappFormBase path="new/*" {...userData} />
            <SettingsContainerBase path="user-settings/*" />
          </HomeBase>
        </Router>
      </Elements>
    </StripeProvider>
  );
}

export default App;

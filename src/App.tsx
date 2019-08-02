import React, { FC, useEffect } from 'react';
import { Router } from '@reach/router';
import { StripeProvider, Elements } from 'react-stripe-elements';
import './App.css';
import './variable.css';
import './custom.css'
import "./fonts.css";
import PageBase from './layout/PageBase';
import { HomeBase } from "./layout/HomeBase";
import { useLocalStorage } from './services/localStorage';
import APIFactory from './services/api';
import { SettingsContainerBase } from "./apps/SettingsContainerBase";

import {  Welcome, Login, Privacy, DappDetails, PaymentPage } from './pages';
import { DashboardBase } from './apps/DashboardBase';
import { NewDappFormBase } from './apps';
import { UserResponseData, defaultUserResponse } from './types';

const App: FC = () => {
  let [user, setUser] = useLocalStorage('user', {} as UserResponseData);
  const API = new APIFactory({user, setUser});
  let userData = { user, setUser, API };
  
  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_API_KEY as string}>
      <Elements>
        <Router>
          <PageBase path='/' {...userData} >
            <Welcome default {...userData} />
            <Login path='login' {...userData} />
            <PaymentPage path='signup' {...userData}/>
            <Privacy path='privacy'  />
          </PageBase>
          <HomeBase path="/home" {...userData}>
            {/* SUB-APPLICATION: Dapp Dashboard */}
            <DappDetails path="dapp/:id" {...userData} />
            <DashboardBase path="/*"  {...userData}/>
            <NewDappFormBase path="new/*" {...userData} />
            <SettingsContainerBase path="user-settings/*" {...userData}/>
          </HomeBase>
        </Router>
      </Elements>
    </StripeProvider>
  );
}

export default App;

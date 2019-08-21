import React, { FC } from 'react';
import { Router } from '@reach/router';
import { StripeProvider, Elements } from 'react-stripe-elements';
import Alert from 'react-s-alert';
import './App.css';
import './variable.css';
import './custom.css'
import "./fonts.css";
import PageBase from './layout/PageBase';
import { HomeBase } from "./layout/HomeBase";
import AppBase from './layout/AppBase';
import { useLocalStorage } from './services/localStorage';
import APIFactory from './services/api';
import { SettingsContainerBase } from "./apps/SettingsContainerBase";
import {  Welcome, Login, Privacy, PaymentPage } from './pages';
import { DashboardBase } from './apps/DashboardBase';
import { NewDappFormBase } from './apps';
import { emptyUserResponse, UserResponseData } from './types';

function bodyHas(object:Object, propNames:string[]) {
  return propNames.every(propName => object.hasOwnProperty(propName))
}

const App: FC = () => {
  let [user, setUser] = useLocalStorage('user', emptyUserResponse());

  // We're seeing errors where the user document gets broken because
  // it's set to null, or something with an invalid shape.  This fxn
  // validates that the newUser always has the correct shape.  The
  // update doesn't happen if it's missing required keys, and we also
  // get a notification, helping us determine root cause.
  const safeSetUser:React.Dispatch<UserResponseData> = (newUser) => {
    let sampleResponse = emptyUserResponse();
    if (
      bodyHas(newUser, Object.keys(sampleResponse)) &&
      bodyHas(newUser.User, Object.keys(sampleResponse.User))
    ) {
      setUser(newUser)
    } else {
      console.error("Attempted to setUser to the following broken value: ",newUser);
      Alert.error("Just attempted to set an invalid user value, check console for more information.");
    }
  }
  const API = new APIFactory({user, setUser});

  let userData = { 
    user, API,
    setUser : safeSetUser
  };
  
  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_API_KEY as string}>
      <Elements>
        <AppBase>
          <Router>
            <PageBase path='/' {...userData} >
              <Welcome default {...userData} />
              <Login path='login' {...userData} />
              <PaymentPage path='signup' {...userData}/>
              <Privacy path='privacy'  />
            </PageBase>
            <HomeBase path="/home" {...userData}>
              <DashboardBase path="/*"  {...userData}/>
              <NewDappFormBase path="new/*" {...userData} />
              <SettingsContainerBase path="user-settings/*" {...userData}/>
            </HomeBase>
          </Router>
        </AppBase>
      </Elements>
    </StripeProvider>
  );
}

export default App;

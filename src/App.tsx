import React, { FC, useState, useEffect } from 'react';
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
import { bodyHas } from './services/util';
import { SettingsContainerBase } from "./apps/SettingsContainerBase";
import {  Welcome, Login, Privacy, PaymentPage, Terms } from './pages';
import { DashboardBase } from './apps/DashboardBase';
import { NewDappFormBase } from './apps';
import { emptyUserResponse, UserResponseData } from './types';


const App: FC = () => {
  const [user, setUser] = useState(emptyUserResponse());
  const [rememberUser, setRememberUser] = useLocalStorage('saveUser', true);
  const [savedUser, setSavedUser] = useLocalStorage('user', emptyUserResponse());

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
      if (rememberUser) setSavedUser(newUser);
    } else {
      console.error("Attempted to setUser to the following broken value: ",newUser);
      Alert.error("Just attempted to set an invalid user value, check console for more information.");
    }
  }
  const API = new APIFactory({user, setUser});

  // Runs at startup, refreshing user in memory with the
  // value available from local storage.
  useEffect(function refreshUserFromStorage(){
    setUser(savedUser);
  }, []);

  function logOut(){
    safeSetUser(emptyUserResponse());
  }

  let appData = { 
    user, API
  };
  
  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_API_KEY as string}>
      <Elements>
        <AppBase>
          <Router>
            <PageBase path='/' {...appData} >
              <Welcome default {...appData} />
              <Login path='login' {...appData} 
                rememberUser={rememberUser}
                setRememberUser={setRememberUser}
                setUser={safeSetUser} />
              <PaymentPage path='signup' {...appData}/>
              <Privacy path='privacy'  />
              <Terms path='terms'  />
            </PageBase>
            <HomeBase path="/home" logOut={logOut} {...appData}>
              <DashboardBase path="/*"  {...appData}/>
              <NewDappFormBase path="new/*" {...appData} />
              <SettingsContainerBase path="user-settings/*" {...appData}/>
            </HomeBase>
          </Router>
        </AppBase>
      </Elements>
    </StripeProvider>
  );
}

export default App;

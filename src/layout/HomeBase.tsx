import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import Alert from "react-s-alert";
import Navigation from "../components/froala/Navigation";
import Footer from "../components/froala/Footer";
import {PaymentStatusBanner} from "../components/PaymentStatusBanner"
import Header, { HeaderState }  from "./Header";
import { UserResponseData, emptyUserResponse } from "../types";

export interface HomeBaseProps extends RouteComponentProps {
  user: UserResponseData
  setUser: (newUser:UserResponseData)=>void
}

export const HomeBase: FC<HomeBaseProps> = ({user, setUser, location, uri, path, navigate, ...props}) => {

  useEffect(function puntLoggedOutUsers(){
    if (user.Authorization === '' && navigate) {
      navigate('/login')
    }
  }, [user])

  function logOut(){
    setUser(emptyUserResponse());
  }

  function goToSettings(){ navigate && navigate('/home/user-settings')}

  function goToHome(){ navigate && navigate('/home')}

  // AppBase is responsible for providing outermost
  // div & the Alert component, so this HomeBase
  // component is only responsible for the Header,
  // Footer, and PaymentStatusBanner.
  return (
    <>
      <Header logOut={logOut} goToSettings={goToSettings} goToHome={goToHome} user={user} location={location}/>
      <PaymentStatusBanner paymentState={user.User.UserAttributes["custom:payment_status"]}/>
      {props.children}
      <Footer />
    </>
  );
};

export default HomeBase;

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
  logOut: () => void
}

export const HomeBase: FC<HomeBaseProps> = ({user, logOut, location, uri, path, navigate, ...props}) => {

  useEffect(function puntLoggedOutUsers(){
    if (user.Authorization === '' && navigate) {
      navigate('/login')
    }
  }, [user])

  function goToSettings(){ navigate && navigate('/home/user-settings')}

  function goToHome(){ navigate && navigate('/home')}

  // AppBase is responsible for providing outermost
  // div & the Alert component, so this HomeBase
  // component is only responsible for the Header,
  // Footer, and PaymentStatusBanner.
  let paymentState = user && user.User && user.User.UserAttributes && user.User.UserAttributes["custom:payment_status"] || 'ACTIVE';
  return (
    <>
      <Header {...{ logOut, goToSettings, goToHome, user, location }} />
      <PaymentStatusBanner paymentState={paymentState}/>
      {props.children}
      <Footer />
    </>
  );
};

export default HomeBase;
